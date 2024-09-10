import express from 'express'
import path from 'path'
import multer from 'multer'
import fs from 'fs'

import { __dirname } from '../dirname.js'
import { processVideo } from '../libs/videoprocessor.js'
import { generateNarrative } from '../services/openAIService.js'

const router = express.Router()

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

const fileFilter = (req, file, cb) => {
	const allowedMimeTypes = ['video/mp4']
	if (!allowedMimeTypes.includes(file.mimetype)) {
		return cb(new Error('Invalid file type. Only MP4 files are allowed.'), false)
	}
	cb(null, true)
}

const upload = multer({
	storage,
	limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
	fileFilter
})

router.post('/upload', upload.single('file'), async (req, res) => {
	if (!req.file) {
		return res.status(400).send('No file uploaded or invalid file type.')
	}
	try {
		const videoPath = path.join(__dirname, 'uploads', req.file.filename)
		const { base64Frames } = await processVideo(videoPath)

		// send frames to OpenAI
		const { narrative, title, voice } = await generateNarrative(base64Frames)

	    // simple debugging
		console.log(`video: ${videoPath}`)
		console.log(`narrative: ${narrative}`)
		console.log(`title: ${title}`)
		console.log(`voice: ${voice}`)

		// TODO: save metadata to GridDB

		res.json({
			message: `File uploaded and processed: ${req.file.filename}`,
			filename: videoPath,
			narrative,
			title,
			voice
		})
	} catch (error) {
		console.error('Error processing video:', error)
		res.status(500).send('Error processing video')
	}
})

export default router