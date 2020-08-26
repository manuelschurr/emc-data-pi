import express from "express";
import _ from "lodash";
import { BadRequestError } from "../../core/ApiError";
import { SuccessResponse } from "../../core/ApiResponse";
import Patient from "../../database/model/Patient";
import PatientRepo from "../../database/repository/PatientRepo";
import asyncHandler from "../../helpers/asyncHandler";
import PatientHelper from "../../helpers/patient.helper";
import validator, { ValidationSource } from "../../helpers/validator";
import schema from "./schema";

const router = express.Router()

router.get(
   "/findByPatientId/:patientId",
   validator(schema.findPatient, ValidationSource.PARAM),
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   asyncHandler(async (req, res, next) => {
      const { patientId } = req.params;
      const patient = PatientRepo.queryPatient(parseInt(patientId));

      if (!patient) {
         throw new BadRequestError('Patient could not be found.');
      }

      return new SuccessResponse("Successful", patient).send(res);
   }),
)

router.post(
   "/create",
   validator(schema.createPatient),
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   asyncHandler(async (req, res, next) => {
      let patient = Object.assign(new Patient(), req.body);

      /*
      // /start child process that runs python script when patient is approached first
      let pID = req.body.patientId;
      let spawn = require('child_process');
      let child = spawn('python3', ['../pulox.py', 'pID']);
      */

      await PatientHelper.createOrUpdatePatientInformation(patient);
      
      return new SuccessResponse("Successful", {
         patient: _.pick(patient, ['patientId', 'ambulanceId'])
      }).send(res);

   }),
)

router.post(
   "/finish",
   validator(schema.createPatient),
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   asyncHandler(async (req, res, next) => {
      let patient = Object.assign(new Patient(), req.body);

      await PatientHelper.finishPatient(patient);

      /*
      // kill process that runs pulox.py script
      child.kill('SIGTERM');
      */

      return new SuccessResponse("Successful", {
         patient: _.pick(patient, ['patientId', 'ambulanceId'])
      }).send(res);
   }),
)

export default router
