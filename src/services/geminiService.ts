import { GoogleGenerativeAI } from "@google/generative-ai";

// 1. Setup the Key
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// 2. Initialize the AI with the correct name
const genAI = new GoogleGenerativeAI(apiKey);

export const checkAppSafety = async (appName: string) => {
  try {
    // 3. Use the 'genAI' variable we created above
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash", // Use a stable model name
    });

    const prompt = `Analyze the safety of the Android app: "${appName}". 
      Determine if it's safe, a warning (potentially unwanted, excessive ads), or danger (malware, scam).
      Provide a safety score from 0 to 100 (100 being perfectly safe).
      Suggest a safe alternative if the app is not safe. Return as JSON.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    if (text) {
      // Clean the text in case it includes markdown backticks
      const cleanText = text.replace(/```json|```/g, "").trim();
      return JSON.parse(cleanText);
    }
    return null;
  } catch (error) {
    console.error("Error checking app safety:", error);
    return null;
  }
};
