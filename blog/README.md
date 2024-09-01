# Leveraging AI to Generate Narrative Voices and Titles for Documentary Videos

![image cover](images/ai-narrative-cover.jpg)

## **Introduction**

This blog focuses on leveraging AI to generate narrative voices and titles for documentary videos. We’ll explore how to implement this using a tech stack that includes Node.js for backend operations, GridDB for managing video metadata, OpenAI for AI-driven text and voice generation, and React for building an interactive frontend.

## Run The Application

Clone the repository from this [link](https://github.com/junwatu/ai-narrative-and-voices) or run the following commands:

```bash
git clone https://github.com/junwatu/ai-narrative-and-voices.git
cd ai-narrative-and-voices
cd app
npm install
```

Copy the `.env.example` file to `.env` and set the `VITE_APP_URL` environment variable or leave it by default and set the `OPENAI_API_KEY` environment variable (please look at this section for more details on how to [get the OpenAI API key](#)).

To run the application, execute the following command:

```bash
npm run start:build
```
Open the browser and navigate to `http://localhost:3000/`. 

> You can also customize the app address and port by setting the `VITE_SITE_URL` environment variable in the `.env` file.

## **Problem Statement**

Creating compelling narratives and attention-grabbing titles for documentary videos presents significant challenges due to:

- **Time-Consuming Process**: Manually crafting narratives and titles is lengthy and often leads to delays, particularly under tight production schedules.
- **Creative Blocks**: Writers frequently face creative blocks, hindering the consistent generation of fresh, engaging content.
- **Scalability Issues**: As content volume grows, maintaining consistent quality across multiple projects becomes increasingly difficult.

### **Why AI is the Best Solution**

AI effectively addresses these challenges by:

- **Enhancing Efficiency**: AI, with the right prompt, rapidly generates high-quality narratives and titles, significantly reducing production time.
- **Ensuring Consistent Creativity**: AI models, such as those from OpenAI, produce a continuous flow of creative content, overcoming human limitations like writer’s block.
- **Scaling Seamlessly**: AI easily scales to manage large volumes of content while maintaining consistent quality across all outputs.

## **Tech Stack Overview**

### OpenAI Key

To access any OpenAI services, we need a valid key. Go to this [link](https://platform.openai.com/api-keys) and create a new OpenAI key.

![setup key](images/openai-key.png)

The OpenAI key is on a project basis, so we need to create a project first in the OpenAI platform and you need also to enable any models that you use on a project. For this project, we will need `gpt-4o` and `whisper` models.

![enabled models](images/openai-enabled-models.png)

The OpenAI key will be saved on the `.env` file and make sure not to include it in version control by adding it to the `.gitignore`.

### Node.js

This project will run on the Node.js platform. You need to install it from [here](https://nodejs.org/en/download). For this project, we will use the `nvm` package manager and Node.js v16.20.2
LTS version.

```shell
# installs nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# download and install Node.js
nvm install 16

# verifies the right Node.js version is in the environment
node -v # should print `v16.20.2`

# verifies the right NPM version is in the environment
npm -v # should print `8.19.4``
```

To connect Node.js and GridDB database, you need the [gridb-node-api](https://github.com/nodejs/node-addon-api) npm package which is a Node.js binding developed using GridDB C Client and Node addon API.

### FFmpeg

This project utilizes the [`fluent-ffmpeg`](https://www.npmjs.com/package/fluent-ffmpeg) npm package, which requires FFmpeg to be installed on the system. For Ubuntu, you can use the following command to install it:

```shell
sudo apt update
sudo apt install ffmpeg
```

For more installation information, please go to the [FFmpeg official website](https://ffmpeg.org/).

### GridDB

To save the video summary and video data, we will use the GridDB database. Please look at the [guide](https://docs.griddb.net/latest/gettingstarted/using-apt/#install-with-apt-get) for detailed installation. We will use Ubuntu 20.04 LTS here.

Run GridDB and check if the service is running. Use this command:

```shell
sudo systemctl status gridstore
```

If not running try to run the database with this command:

```shell
sudo systemctl start gridstore
```
 
### React

We will use [React](https://react.dev/) to build the frontend of the application. React lets you build user interfaces out of individual pieces called components. So if you want to expand or modify the application, you can easily do so by adding or modifying components.

## **System Architecture**

![system architecture](images/system-arch.png)

1. **Video Upload:** The browser uploads the video to the Node.js backend for processing.
2. **Video Processing:** Node.js sends the video to FFmpeg for processing tasks like encoding, decoding, or frame extraction.
3. **Processed Video Retrieval:** FFmpeg processes the video and returns the processed data to Node.js.
4. **AI Content Generation:** Node.js sends the processed video data to OpenAI for generating narrative voices and titles.
5. **Metadata Storage:** Node.js stores the video metadata and AI-generated content in GridDB.
6. **Frontend Interaction:** Node.js sends the necessary data to the React frontend for user interaction and display.

## **Implementation**

- **Setting Up Node.js with GridDB**: Step-by-step guide on connecting Node.js to GridDB for storing and retrieving relevant data.
- **Integrating OpenAI for Text Generation**: API integration for generating narrative text and titles.
- **Building the React Frontend**: Creating a UI for users to input prompts, view AI suggestions, and manage generated content.

## **AI Content Generation Workflow**

### **Storing Video Metadata in GridDB**

How metadata like themes, topics, and timestamps help refine AI output.

### **Generating Narrative Voices**

Fine-tuning OpenAI’s models to produce engaging and relevant narrative content.

### **Creating Titles**

Using AI to generate impactful and attention-grabbing titles based on the video’s content.

## **Repository Link**

- Provide sample code snippets for critical parts (API integration, GridDB setup).
- Link to the full repository (if applicable) for readers to explore and try it out themselves.
