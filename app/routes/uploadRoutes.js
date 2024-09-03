import express from 'express'
import path from 'path'
import multer from 'multer'
import fs from 'fs'
import { processVideo } from '../libs/videoprocessor.js'
import { __dirname } from '../dirname.js'

const router = express.Router()

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, 'uploads')
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir)
        }
        cb(null, uploadDir)
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({ storage })

// Upload route
router.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded')
    }
    try {
        const videoPath = path.join(__dirname, 'uploads', req.file.filename)
        const { base64Frames, audioFilename } = await processVideo(videoPath)

        // Assuming the transcribeAudio and createVideoSummarization functions are available
        // const audioToTextResponse = await transcribeAudio(path.join(outputAudioFolder, audioFilename))
        // const videoSummary = await createVideoSummarization(base64Frames, audioToTextResponse)

        res.json({
            message: `File uploaded and processed: ${req.file.filename}`,
            frames: base64Frames,
            audio: audioFilename,
            filename: videoPath
        })
    } catch (error) {
        console.error('Error processing video:', error)
        res.status(500).send('Error processing video')
    }
})

export default router