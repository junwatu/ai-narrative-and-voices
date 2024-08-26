import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import generateRoutes from './routes/generateRoutes'
import metadataRoutes from './routes/metadataRoutes'
import { __dirname } from './dirname.js'

const app = express()

// eslint-disable-next-line no-undef
if (!process.env.VITE_APP_URL) {
	throw new Error('VITE_APP_URL environment variable is not set')
}
// eslint-disable-next-line no-undef
const apiURL = new URL(process.env.VITE_APP_URL)
const HOSTNAME = apiURL.hostname || 'localhost'
const PORT = apiURL.port || 3000

app.use(bodyParser.json())
app.use(bodyParser.json({ limit: '10mb' }))
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/api/generate', generateRoutes)
app.use('/api/metadata', metadataRoutes)

app.listen(PORT, HOSTNAME, () => {
	console.log(`Server is running on http://${HOSTNAME}:${PORT}`)
})
