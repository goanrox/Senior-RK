
export const getGeminiApiKey = (): string => {
  // The instructions specify process.env.GEMINI_API_KEY
  const apiKey = typeof process !== 'undefined' ? process.env.GEMINI_API_KEY : "";
  return apiKey || "";
};
