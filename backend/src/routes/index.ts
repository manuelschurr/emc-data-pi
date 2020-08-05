import express from "express"
import patient from "./patient/patient"
import test from "./test/test"

const router = express.Router()

router.use("/test", test)
router.use("/patient", patient)

export default router
