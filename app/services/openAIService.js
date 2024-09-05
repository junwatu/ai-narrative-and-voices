import OpenAI from 'openai'

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
})

async function generateTitle(prompt) {
	// code here
	return prompt
}

async function generateNarrative(frames, audioTranscription) {
	const videoDuration = 2
	
	const frameObjects = frames.map(x => ({
		type: 'image_url',
		image_url: {
			url: `data:image/png;base64,${x}`,
			detail: "low"
		}
	}));

	const videoContent = {
		role: "user",
		content: [
			{ type: 'text', text: `The original video, in which frames are generated  is ${videoDuration} seconds. Create a story based on these frames. BE CREATIVE. DIRECT ANSWER ONLY.` },
			...frameObjects
		],
	}

	const response = await openai.chat.completions.create({
		model: "gpt-4o",
		messages: [
			{
				role: "system",
				content: "You are a professional storyteller."
			},
			videoContent
		],
		temperature: 0,
	});

	console.log(response)
	const narrativeResponse = response.choices[0].message.content
	return narrativeResponse;
}

async function generateVoice(narrative) {
 return narrative
}

export { generateNarrative, generateTitle, generateVoice }
