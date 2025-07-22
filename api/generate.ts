
// Vercel Edge/Serverless function
// This file should be placed in the `api` directory.
// It creates a secure backend endpoint to call the Gemini API.

import { GoogleGenAI } from "@google/genai";
import { type GeneratedIdeas } from '../types';

// This tells Vercel to run this function as an edge function for speed
export const config = {
  runtime: 'edge',
};

export default async function handler(request: Request) {
  // 1. Check for the correct method
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // 2. Get the API Key from environment variables (secure)
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'API key not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    // 3. Parse the request body from the frontend
    const { businessType, location, brandPersonality, targetAudience } = await request.json();

    if (!businessType || !location) {
        return new Response(JSON.stringify({ error: 'Business type and location are required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    // 4. Construct the prompt (same logic as before)
    let prompt = `
You are a world-class digital marketing and business consultant specializing in hyper-local strategies for small businesses. Your advice is creative, modern, actionable, and tailored.

A business owner is looking for ideas to boost their digital presence.

Business Type: "${businessType}"
Location: "${location}"
`;
    if (brandPersonality) {
        prompt += `\nBrand Personality: "${brandPersonality}"`;
    }
    if (targetAudience) {
        prompt += `\nTarget Audience: "${targetAudience}"`;
    }
    
    prompt += `
\nPlease provide a JSON object with the following structure. Do not include any text, introductory phrases, or markdown formatting outside of the JSON object itself. The entire response should be a single, valid JSON object.

{
  "marketingStrategies": ["A creative, actionable digital marketing strategy idea tailored to the business type, location, and personality.", "Another distinct and creative digital marketing strategy idea.", "A third unique and actionable digital marketing strategy idea."],
  "websiteFeatures": ["A specific, valuable feature to add to their website that enhances user experience or drives sales, fitting the brand.", "Another specific, valuable website feature idea.", "A third specific and valuable website feature idea that sets them apart."],
  "socialMediaPosts": [
    { "platform": "Instagram", "content": "A detailed post idea for Instagram reflecting the brand personality. Include a compelling caption, call-to-action, and a suggestion for the visual (e.g., photo, reel, story)." },
    { "platform": "Facebook", "content": "A post idea for Facebook focused on engaging the target audience. Suggest a question or a poll to encourage interaction." },
    { "platform": "TikTok", "content": "A short video concept for TikTok that would appeal to the target audience. Describe the scene, audio/trending sound suggestion, and the overall vibe." }
  ]
}
`;

    // 5. Call the Gemini API
    const response = await ai.models.generateContent({
        model: "gemini-1.5-flash", // or "gemini-pro"
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            temperature: 0.7,
            topP: 1,
            topK: 32,
        }
    });

    // The Gemini API with `application/json` responseMimeType should return valid JSON text.
    // We will parse it and send it back to the client.
    let jsonStr = response.text.trim();
    // In case the model still wraps it in markdown fences
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
        jsonStr = match[2].trim();
    }
    
    const parsedData: GeneratedIdeas = JSON.parse(jsonStr);

    // 6. Send the successful response back to the frontend
    return new Response(JSON.stringify(parsedData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Error in serverless function:", error);
    return new Response(JSON.stringify({ error: 'Failed to generate ideas from AI.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
