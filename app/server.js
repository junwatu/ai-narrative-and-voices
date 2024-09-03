import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import generateRoutes from './routes/generateRoutes.js'
import metadataRoutes from './routes/metadataRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import { __dirname } from './dirname.js'

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

// Routes
app.use('/api', uploadRoutes)  // Add the upload routes
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