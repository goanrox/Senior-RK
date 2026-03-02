
export const getGroqApiKey = (): string => {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY || (typeof process !== 'undefined' ? process.env.VITE_GROQ_API_KEY : "");
    
  if (!apiKey) {
    console.error('Groq API key is missing. Please set VITE_GROQ_API_KEY in your environment.');
  }
  
  return apiKey || "";
};
