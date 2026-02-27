import { GoogleGenAI } from "@google/genai";

// 1. Setup the Key
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// 2. Initialize the AI (using the name 'ai')
const ai = new GoogleGenAI(apiKey);

export const checkAppSafety = async (appName: string) => {
  try {
    // 3. Use the 'ai' variable we created in step 2
    const model = ai.getGenerativeModel({ 
      model: "gemini-1.5-flash", 
    });

    const prompt = `Analyze the safety of the Android app: "${appName}". 
      Determine if it's safe, a warning (potentially unwanted, excessive ads), or danger (malware, scam).
      Provide a safety score from 0 to 100 (100 being perfectly safe).
      Suggest a safe alternative if the app is not safe. Return as JSON.`;

    const result = await model.generateContent(prompt);
    // With @google/genai, you can get text directly from the result
    const text = result.response.text();

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
