import path from 'path'
import express from 'express'
import multer from 'multer'
import fs from 'fs'
import bodyParser from 'body-parser'
import generateRoutes from './routes/generateRoutes.js'
import metadataRoutes from './routes/metadataRoutes.js'
import { __dirname } from './dirname.js'
import { processVideo } from './libs/videoprocessor.js'


const app = express()

// Environment variables check
if (!process.env.VITE_APP_URL) {
	throw new Error('VITE_APP_URL environment variable is not set')
}
const apiURL = new URL(process.env.VITE_APP_URL)
const HOSTNAME = apiURL.hostname || 'localhost'
const PORT = apiURL.port || 3000

// Middleware
app.use(bodyParser.json({ limit: '10mb' }))
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'frames')))

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

// Routes
app.post('/api/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
		return res.status(400).send('No file uploaded')
	}
	try {
		const videoPath = path.join(__dirname, 'uploads', req.file.filename)
		const { base64Frames, audioFilename } = await processVideo(videoPath)
		//const audioToTextResponse = await transcribeAudio(path.join(outputAudioFolder, audioFilename))
		//const videoSummary = await createVideoSummarization(base64Frames, audioToTextResponse)

		const summaryData = {
			filename: videoPath,
			audioTranscription: audioToTextResponse,
			summary: videoSummary
		}

		//const saveResponse = await saveData(summaryData)
		//console.log(saveResponse)

		res.json({
			message: `File uploaded and processed: ${req.file.filename}`,
			frames: base64Frames,
			audio: audioFilename,
			audioTranscription: audioToTextResponse,
			videoSummary: videoSummary
		})
	} catch (error) {
		console.error('Error processing video:', error)
		res.status(500).send('Error processing video')
	}
})

app.use('/api/generate', generateRoutes)
app.use('/api/metadata', metadataRoutes)

// Catch-all route (should be last)
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

// Start server
app.listen(PORT, HOSTNAME, () => {
	console.log(`Server is running on http://${HOSTNAME}:${PORT}`)
})
