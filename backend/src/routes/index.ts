import express from "express"
import audio from "./audio/audio"
import patient from "./patient/patient"

const router = express.Router()

router.use("/patient", patient)
router.use("/audio", audio)

export default router
