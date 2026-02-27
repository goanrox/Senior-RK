import { GoogleGenAI } from "@google/genai";

// This tells Vercel to give the AI up to 60 seconds to answer so it doesn't time out
export const maxDuration = 60; 

export default async function handler(req, res) {
  // Only allow POST requests from your website
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Grab the hidden key from Vercel's settings
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "API key missing" });
  }

  const { appName } = req.body;
  const ai = new GoogleGenAI({ apiKey: apiKey });

  try {
    const prompt = `Analyze the safety of the Android app: "${appName}". 
      Determine if it's safe, a warning (potentially unwanted, excessive ads), or danger (malware, scam).
      Provide a safety score from 0 to 100 (100 being perfectly safe).
      Suggest a safe alternative if the app is not safe. Return as JSON.`;

    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: prompt,
    });

    const text = response.text;
    
    // Send the secure answer back to your frontend
    return res.status(200).json({ text: text });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch from Google" });
  }
}
