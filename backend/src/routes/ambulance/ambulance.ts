import express from "express";
import { SuccessResponse } from "../../core/ApiResponse";
import { setIsGnssEnabled } from "../../gnss";
import asyncHandler from "../../helpers/asyncHandler";

const router = express.Router()

router.put(
   "/changeGnss",
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   asyncHandler(async (req, res, next) => {
      var isEnableGnss = false;
      if (req.body.hasOwnProperty("isVideoRunning")) isEnableGnss = req.body.isVideoRunning;

      setIsGnssEnabled(!isEnableGnss);

      return new SuccessResponse("Successful", isEnableGnss).send(res);
   }),
)

export default router