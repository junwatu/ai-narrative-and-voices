import OpenAI from 'openai'

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
})

async function generateTitle(narrative) {
	const titleResponse = await openai.chat.completions.create({
		model: 'gpt-4o-mini',
		messages: [
			{
				role: 'system',
				content: 'You are a professional title generator.'
			},
			{
				role: 'user',
				content: `Direct answer only. Generate a title for the following narrative text: \n${narrative}`
			}
		],
		temperature: 1,
		max_tokens: 1000,
		top_p: 1,
		frequency_penalty: 0,
		presence_penalty: 0,
		response_format: {
			"type": "text"
		},
	})

	const title = titleResponse.choices[0].message.content
	return title
}

async function generateNarrative(frames) {
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
		temperature: 1,
		max_tokens: 4095,
		top_p: 1,
		frequency_penalty: 0,
		presence_penalty: 0,
		response_format: {
			"type": "text"
		},
	});

	const narrativeResponse = response.choices[0].message.content
	return narrativeResponse;
}

async function generateVoice(narrative) {
	return narrative
}

export { generateNarrative, generateTitle, generateVoice }
