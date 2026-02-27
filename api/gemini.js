import { GoogleGenAI } from "@google/genai";

export const maxDuration = 60; 

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    // If this triggers, it means Vercel's Environment Variables are still empty!
    return res.status(500).json({ error: "API key missing in Vercel settings" });
  }

  const { prompt } = req.body;
  const ai = new GoogleGenAI({ apiKey: apiKey });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: prompt,
    });

    return res.status(200).json({ text: response.text });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch from Google" });
  }
}
