require('dotenv').config();
const fs = require('fs');
const OpenAI = require("openai");
const openai = new OpenAI({
    organization: process.env.AI_ORG_KEY,
    project: process.env.AI_PROJ_KEY,
    apiKey: process.env.AI_API_KEY
});

async function createArtifact(messages) {
    const completion = await openai.chat.completions.create({
        messages,
        model: "gpt-3.5-turbo-0125",
        response_format: { type: "json_object" },
    });
    const data = JSON.parse(completion.choices[0].message.content);
    return JSON.stringify(data, null, 2);
}

module.exports = createArtifact;