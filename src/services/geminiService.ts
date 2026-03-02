
import Groq from "groq-sdk";
import { getGroqApiKey } from "../utils/apiKey";
import { searchCache } from "../utils/cache";

export const checkAppSafety = async (appName: string) => {
  const cacheKey = `app-safety-${appName.toLowerCase().trim()}`;
  const cachedResult = searchCache.get(cacheKey);
  if (cachedResult) return cachedResult;

  const apiKey = getGroqApiKey();
  if (!apiKey) return null;
  
  const groq = new Groq({ apiKey, dangerouslyAllowBrowser: true });

  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `You are an AI that analyzes Android app safety. You must respond in valid JSON matching this schema:
{
  "name": "string",
  "status": "safe" | "warning" | "danger",
  "reason": "string",
  "alternative": "string",
  "score": number
}`
        },
        {
          role: "user",
          content: `Quickly analyze Android app safety: "${appName}". 
          Status: safe, warning (ads/bloat), or danger (malware/scam).
          Score: 0-100.
          Suggest 1 safe alternative if not safe.`
        }
      ],
      response_format: { type: "json_object" }
    });

    const text = response.choices[0]?.message?.content;
    if (text) {
      const result = JSON.parse(text.trim());
      searchCache.set(cacheKey, result);
      return result;
    }
    return null;
  } catch (error) {
    console.error("Error checking app safety:", error);
    return null;
  }
};
