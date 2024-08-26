import OpenAI from 'openai'

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
})

async function generateNarrative(prompt) {
	//code here
	return prompt
}

async function generateTitle(prompt) {
	// code here
	return prompt
}

export { generateNarrative, generateTitle }
