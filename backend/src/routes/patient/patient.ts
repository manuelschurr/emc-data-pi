import express from "express";
import _ from "lodash";
import { BadRequestError } from "../../core/ApiError";
import { SuccessResponse } from "../../core/ApiResponse";
import PatientRepo from "../../database/repository/PatientRepo";
import asyncHandler from "../../helpers/asyncHandler";
import validator from "../../helpers/validator";
import { Patient } from "../../models/Patient";
import schema from "./schema";

const router = express.Router()

router.get(
   "/find",
   validator(schema.findPatient),
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   asyncHandler(async (req, res, next) => {
      PatientRepo.queryPatient(req.body.patientId, req.body.ambulanceId, function (row: Patient) {
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
      
      PatientRepo.checkIfPatientDataExists(patient.patientId, patient.ambulanceId, function (result: number) {
         if (result > 0) {
            PatientRepo.updatePatient(patient);
         }
         else {
            PatientRepo.insertPatient(patient);
         }
      })
      return new SuccessResponse("Successful", {
         pulsoxy: _.pick(patient, ['patientId', 'ambulanceId'])
      }).send(res);
   }),
)

export default router
