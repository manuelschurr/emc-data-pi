import axios from "axios";
import express from "express";
import _ from "lodash";
import { Options, PythonShell } from 'python-shell';
import { centralServerAddress } from "../../config";
import { BadRequestError } from "../../core/ApiError";
import { SuccessResponse } from "../../core/ApiResponse";
import AxiosBaseConfig from "../../core/AxiosConfig";
import Logger from "../../core/Logger";
import Patient from "../../database/model/Patient";
import PatientRepo from "../../database/repository/PatientRepo";
import asyncHandler from "../../helpers/asyncHandler";
import PatientHelper from "../../helpers/patient.helper";
import validator, { ValidationSource } from "../../helpers/validator";
import schema from "./schema";

const router = express.Router()
var child:any = 0;
var flag = true;

router.get(
   "/findByPatientId/:patientId",
   validator(schema.findPatient, ValidationSource.PARAM),
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   asyncHandler(async (req, res, next) => {
      const { patientId } = req.params;
      const patient = PatientRepo.querySpecificPatient(parseInt(patientId));

      if (!patient) {
         throw new BadRequestError('Patient could not be found.');
      }

      return new SuccessResponse("Successful", patient).send(res);
   }),
)

router.get(
   "/findNextPatientId",
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   asyncHandler(async (req, res, next) => {
      var patientId = 0;
      
      // get next available patientId
      await axios
      .get(`${centralServerAddress}/patient/findNextPatientId`, await AxiosBaseConfig.getInstance())
      .then(response => {
         patientId = response.data.data;
      })
      .catch(error => {
         Logger.error(error);
      });

      return new SuccessResponse("Successful", patientId).send(res);
   }),
)

router.post(
   "/create",
   validator(schema.patient),
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   asyncHandler(async (req, res, next) => {
      let patient = Object.assign(new Patient(), req.body);

      await PatientHelper.createOrUpdatePatientInformation(patient);

      // start python script for pulsoximeter when new patient is created
      if (flag) {
         let options = {
            mode: "text",
            pythonPath: "/usr/bin/python3",
            pythonOptions: ["-u"],
            scriptPath: "/home/pi/emc-data-pi/backend/src",
            args: [patient.patientId, (await AxiosBaseConfig.getInstance()).getToken(), centralServerAddress]
         } as Options;

         child = new PythonShell('pulox.py', options).childProcess;
         flag = false;
      }
      
      return new SuccessResponse("Successful", {
         patient: _.pick(patient, ['patientId', 'ambulanceId'])
      }).send(res);

   }),
)

router.post(
   "/finish",
   validator(schema.patient),
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   asyncHandler(async (req, res, next) => {
      let patient = Object.assign(new Patient(), req.body);

      await PatientHelper.finishPatient(patient);

      // kill python script for pulsoximeter when a patient is finished
      child.kill('SIGINT');
      flag = true;

      return new SuccessResponse("Successful", {
         patient: _.pick(patient, ['patientId', 'ambulanceId'])
      }).send(res);
   }),
)

export default router
