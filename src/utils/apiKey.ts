
export const getGeminiApiKey = (): string => {
  // Check all possible locations for the API key
  const apiKey = 
    import.meta.env.VITE_GEMINI_API_KEY || 
    import.meta.env.GEMINI_API_KEY || 
    import.meta.env.VITE_API_KEY ||
    (typeof process !== 'undefined' ? process.env.GEMINI_API_KEY : "") ||
    (typeof process !== 'undefined' ? process.env.VITE_GEMINI_API_KEY : "");
    
  if (!apiKey) {
    console.error('Gemini API key is missing. Please set VITE_GEMINI_API_KEY in your environment.');
  }
  
  return apiKey || "";
};
