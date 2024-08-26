import express from 'express'
import { generateNarrative, generateTitle } from '../services/openAIService'

const router = express.Router()

// Generate narrative based on documentary metadata
router.post('/narrative', async (req, res) => {
	try {
		const { prompt } = req.body
		const narrative = await generateNarrative(prompt)
		res.json({ narrative })
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: 'Error generating narrative' })
	}
})

// Generate title based on documentary metadata
router.post('/title', async (req, res) => {
	try {
		const { prompt } = req.body
		const title = await generateTitle(prompt)
		res.json({ title })
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: 'Error generating title' })
	}
})

export default router
