import express from "express";
import { SuccessResponse } from "../../core/ApiResponse";
import Database from "../../core/Database";
import asyncHandler from "../../helpers/asyncHandler";
import { Patient } from "../../models/Patient";

const router = express.Router()

router.get(
   "/",
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   asyncHandler(async (req, res, next) => {
      try {
         return new SuccessResponse("Successful", null).send(res);
      } catch (e) {
         next(e);
      }
   }),
)

router.post(
   "/",
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   asyncHandler(async (req, res, next) => {
      let patient = Object.assign(new Patient(), req.body);
      Database.checkIfPatientDataExists(patient.patientId, function (result: number) {
         if (result > 0) {
            Database.updatePatientData(patient);
         }
         else {
            Database.insertPatientData(patient);
         }
      })
      return new SuccessResponse("Successful", null).send(res);
   }),
)

export default router
