import express from "express"
import audio from "./audio/audio"
import img from "./img/img"
import patient from "./patient/patient"

const router = express.Router()

router.use("/patient", patient)
router.use("/audio", audio)
router.use("/img", img)

export default router
