import { GoogleGenAI } from "@google/genai";

// 1. Grab the key from Cloudflare
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// 2. Initialize with CURLY BRACES! This fixes the browser error.
const ai = new GoogleGenAI({ apiKey: apiKey });

export const checkAppSafety = async (appName: string) => {
  try {
    const prompt = `Analyze the safety of the Android app: "${appName}". 
      Determine if it's safe, a warning (potentially unwanted, excessive ads), or danger (malware, scam).
      Provide a safety score from 0 to 100 (100 being perfectly safe).
      Suggest a safe alternative if the app is not safe. Return as JSON.`;

    // 3. The new SDK syntax to generate content
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: prompt,
    });

    // 4. The new SDK uses .text as a property, not a function
    const text = response.text;

    if (text) {
      const cleanText = text.replace(/```json|```/g, "").trim();
      return JSON.parse(cleanText);
    }
    return null;
  } catch (error) {
    console.error("Error checking app safety:", error);
    return null;
  }
};
