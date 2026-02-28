
import { GoogleGenAI, Type, ThinkingLevel } from "@google/genai";
import { getGeminiApiKey } from "../utils/apiKey";
import { searchCache } from "../utils/cache";

export const checkAppSafety = async (appName: string) => {
  const cacheKey = `app-safety-${appName.toLowerCase().trim()}`;
  const cachedResult = searchCache.get(cacheKey);
  if (cachedResult) return cachedResult;

  const apiKey = getGeminiApiKey();
  if (!apiKey) return null;
  
  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Quickly analyze Android app safety: "${appName}". 
      Status: safe, warning (ads/bloat), or danger (malware/scam).
      Score: 0-100.
      Suggest 1 safe alternative if not safe.`,
      config: {
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
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
      const result = JSON.parse(response.text.trim());
      searchCache.set(cacheKey, result);
      return result;
    }
    return null;
  } catch (error) {
    console.error("Error checking app safety:", error);
    return null;
  }
};
