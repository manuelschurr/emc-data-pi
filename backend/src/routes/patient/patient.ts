import axios from "axios";
import express from "express";
import { centralServerAddress } from "../../config";
import { BadRequestError } from "../../core/ApiError";
import { SuccessResponse } from "../../core/ApiResponse";
import Logger from "../../core/Logger";
import Patient from "../../database/model/Patient";
import PatientRepo from "../../database/repository/PatientRepo";
import asyncHandler from "../../helpers/asyncHandler";
import validator, { ValidationSource } from "../../helpers/validator";
import schema from "./schema";

const router = express.Router()

router.get(
   "/findByPatientId/:patientId",
   validator(schema.findPatient, ValidationSource.PARAM),
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   asyncHandler(async (req, res, next) => {
      const { patientId } = req.params;
      PatientRepo.queryPatient(parseInt(patientId), function (row: Patient) {
         if (!row) {
            throw new BadRequestError('Patient could not be found.');
         }
         return new SuccessResponse("Successful", row).send(res);
      });
   }),
)

router.post(
   "/create",
   validator(schema.createPatient),
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   asyncHandler(async (req, res, next) => {
      let patient = Object.assign(new Patient(), req.body);

      var config = {
         headers: {
            'Content-Type': 'application/json'
         }
      };

      PatientRepo.checkIfPatientDataExists(patient.patientId, patient.ambulanceId, async function (result: number) {
         if (result > 0) {
            PatientRepo.updatePatient(patient);
            await axios
               .put(`${centralServerAddress}/patient/update/${patient.patientId}`, patient, config)
               .catch(error => {
                  Logger.error(error);
               });
         }
         else {
            await axios
               .get(`${centralServerAddress}/patient/findNextPatientId`)
               .then(response => {
                  patient.patientId = response.data.data;
               })
               .catch(error => {
                  Logger.error(error);
               });
            PatientRepo.insertPatient(patient);
            await axios
               .post(`${centralServerAddress}/patient/create`, patient, config)
               .catch(error => {
                  Logger.error(error);
               });;
         }

         return new SuccessResponse("Successful", {
            patient: patient
         }).send(res);
      });
   }),
)

export default router
