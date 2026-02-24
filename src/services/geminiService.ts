
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const checkAppSafety = async (appName: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze the safety of the Android app: "${appName}". 
      Determine if it's safe, a warning (potentially unwanted, excessive ads), or danger (malware, scam).
      Provide a safety score from 0 to 100 (100 being perfectly safe).
      Suggest a safe alternative if the app is not safe.`,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            status: { 
              type: Type.STRING, 
              enum: ["safe", "warning", "danger"] 
            },
            reason: { type: Type.STRING },
            alternative: { type: Type.STRING },
            score: { type: Type.NUMBER }
          },
          required: ["name", "status", "reason", "score"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text.trim());
    }
    return null;
  } catch (error) {
    console.error("Error checking app safety:", error);
    return null;
  }
};
