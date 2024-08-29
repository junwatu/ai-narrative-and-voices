# Leveraging AI to Generate Narrative Voices and Titles for Documentary Videos

![image cover](images/ai-narrative-cover.jpg)

## **Introduction**

This blog focuses on leveraging AI to generate narrative voices and titles for documentary videos. We’ll explore how to implement this using a tech stack that includes Node.js for backend operations, GridDB for managing video metadata, OpenAI for AI-driven text and voice generation, and React for building an interactive frontend.

## Run The Application


### Clone the repository
Clone the repository from this [link](https://github.com/junwatu/ai-narrative-and-voices) or run the following commands:

```bash
git clone https://github.com/junwatu/ai-narrative-and-voices.git
cd ai-narrative-and-voices
cd app
npm install
```

### Run the application

To run the application, execute the following command:

```bash
npm run start:build
```
Open the browser and navigate to `http://localhost:3000/`. 

> You can also customize the app address and port by setting the `VITE_SITE_URL` environment variable in the `.env` file.

## **Problem Statement**

- Challenges faced in manually generating compelling narratives and titles.
- Time constraints and creative block issues in traditional methods.

## **Tech Stack Overview**

- **Node.js**: Backend framework for handling API requests and server-side operations.
- **GridDB**: A NoSQL time-series database to manage video metadata and context data.
- **OpenAI**: The core AI for generating narrative text and title ideas.
- **React**: Frontend UI for interacting with the AI and managing the output.

## **System Architecture**

- **Data Flow Diagram**: Outline the interaction between each component (OpenAI API, GridDB, Node.js backend, and React frontend).
- **Component Breakdown**: Explain how each technology contributes to the solution.

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
