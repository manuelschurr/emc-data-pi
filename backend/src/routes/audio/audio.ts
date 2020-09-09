import axios from "axios";
import express from "express";
import FormData from "form-data";
import fs from "fs";
import multer from "multer";
import path from "path";
import { centralServerAddress } from '../../config';
import { BadRequestError } from "../../core/ApiError";
import { SuccessResponse } from "../../core/ApiResponse";
import { HttpsAgent } from "../../core/HttpsAgent";
import asyncHandler from "../../helpers/asyncHandler";


const router = express.Router()

// Defines the multer storage parameters
// Saves files in backend/audio with the originalname from the request
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./audio/")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

// Multer object
const upload = multer({ storage: storage })

const CUR_DIR = path.join(process.cwd())

// POST endpoint to upload audio files
router.post("/", upload.single("audio"), asyncHandler(async (req, res, next) => {
    const file = req.file

    if (!file) throw new BadRequestError("No file provided")

    // Forwards file to central uni server via POST request
    try {
        const data = new FormData()
        data.append("audio", fs.createReadStream(path.join(CUR_DIR + "/" + file.path)))

        // Header configuration to ensure correct formatting (multipart/form-data)
        const config = {
            headers: {
                ...data.getHeaders()
            },
            httpsAgent: HttpsAgent
        };
        await axios.post(`${centralServerAddress}/audio`, data, config)
    } catch (error) {
        console.log(error);
    }
    return new SuccessResponse("Success", file).send(res)
}),
)

export default router