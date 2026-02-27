export const checkAppSafety = async (appName: string) => {
  try {
    // We now ask our own secure Vercel backend instead of Google directly
    const response = await fetch('/api/checkApp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ appName })
    });

    const data = await response.json();
    const text = data.text;

    if (text) {
      // Clean and return the JSON just like before
      const cleanText = text.replace(/```json|```/g, "").trim();
      return JSON.parse(cleanText);
    }
    return null;
  } catch (error) {
    console.error("Error checking app safety:", error);
    return null;
  }
};
