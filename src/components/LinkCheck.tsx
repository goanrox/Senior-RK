import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { hapticFeedback } from '../utils/haptics';

type ResultType = 'safe' | 'dangerous' | 'unknown' | null;

const LinkCheck: React.FC = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResultType>(null);
  const [threatType, setThreatType] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateUrl = (input: string) => {
    if (!input.trim()) {
      return "Please paste a link first.";
    }
    // Basic check for URL-like structure (contains a dot, no spaces, or starts with http)
    const urlPattern = /^(https?:\/\/)?[\w.-]+\.[a-z]{2,}/i;
    if (!urlPattern.test(input.trim())) {
      return "That doesn't look like a link. Try copying it again.";
    }
    return null;
  };

  const handleCheck = async () => {
    const validationError = validateUrl(url);
    if (validationError) {
      setError(validationError);
      setResult(null);
      hapticFeedback.warning();
      return;
    }

    setError(null);
    setLoading(true);
    setResult(null);
    setThreatType(null);
    hapticFeedback.light();

    try {
      // Ensure URL has protocol for the API
      let urlToCheck = url.trim();
      if (!/^https?:\/\//i.test(urlToCheck)) {
        urlToCheck = 'http://' + urlToCheck;
      }

      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Analyze this URL for safety: ${urlToCheck}. 
        Use Google Search to check if this domain is known for scams, malware, phishing, or is a legitimate website.
        Determine if it is 'safe', 'dangerous', or 'unknown'.
        If it is dangerous, provide a short threat type like 'Phishing', 'Malware', 'Scam', etc.`,
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              status: {
                type: Type.STRING,
                description: "The safety status of the URL: 'safe', 'dangerous', or 'unknown'."
              },
              threatType: {
                type: Type.STRING,
                description: "If dangerous, a short description of the threat (e.g., 'Phishing', 'Malware'). Otherwise, leave empty or null."
              }
            },
            required: ["status"]
          }
        },
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("Empty response from Gemini");
      }

      const data = JSON.parse(responseText);

      if (data.status === 'dangerous') {
        setResult('dangerous');
        setThreatType(data.threatType || 'Suspicious Website');
        hapticFeedback.warning();
      } else if (data.status === 'safe') {
        setResult('safe');
        hapticFeedback.success();
      } else {
        setResult('unknown');
        hapticFeedback.warning();
      }
    } catch (err) {
      console.error('Error checking link:', err);
      setResult('unknown');
      hapticFeedback.warning();
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setUrl('');
    setError(null);
    setResult(null);
    setThreatType(null);
    hapticFeedback.light();
  };

  return (
    <div className="p-6 md:p-10">
      <h2 className="text-2xl md:text-[28px] font-bold mb-2 text-text-main">Is This Link Safe?</h2>
      <p className="mb-8 md:mb-10 text-text-muted text-sm md:text-base font-medium">
        Copy and paste any link or web address below to check if it's a scam, virus, or unsafe website.
      </p>

      <div className="mb-8 md:mb-10">
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Paste your link here..."
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setError(null);
            }}
            className={`w-full pl-6 pr-14 py-4 md:py-5 min-h-[56px] text-base md:text-lg bg-white border rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary/20 transition-all outline-none shadow-[0_4px_12px_rgba(0,0,0,0.06)] ${
              error ? 'border-destructive' : 'border-border-main'
            }`}
          />
          {url && (
            <button
              onClick={handleClear}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-text-muted hover:text-text-main bg-surface-muted rounded-full transition-colors font-bold text-sm"
              aria-label="Clear input"
            >
              ✕
            </button>
          )}
          {error && (
            <p className="absolute -bottom-6 left-2 text-[10px] font-bold text-destructive uppercase tracking-widest animate-in fade-in slide-in-from-top-1">
              {error}
            </p>
          )}
        </div>

        <button
          onClick={handleCheck}
          disabled={loading}
          className="w-full py-4 md:py-5 px-6 bg-primary text-white font-bold rounded-full shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all active:scale-95 disabled:opacity-50 text-base md:text-lg"
        >
          {loading ? 'Checking...' : 'Check This Link'}
        </button>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-8 space-y-4">
          <div className="w-12 h-12 border-4 border-primary/10 border-t-primary rounded-full animate-spin"></div>
          <p className="text-text-muted font-bold animate-pulse text-sm">Checking your link...</p>
        </div>
      )}

      {result && !loading && (
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {result === 'safe' && (
            <div className="p-6 md:p-8 rounded-2xl border bg-emerald-600/10 border-emerald-600/20 shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 bg-emerald-600 text-white rounded-2xl flex items-center justify-center text-xl md:text-2xl shadow-md">
                  ✅
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-emerald-700 mb-2">This Link Looks Safe</h3>
                  <p className="text-sm md:text-base font-medium text-emerald-800/80 leading-relaxed">
                    No threats were detected. However, always be cautious about what personal information you share.
                  </p>
                </div>
              </div>
            </div>
          )}

          {result === 'dangerous' && (
            <div className="p-6 md:p-8 rounded-2xl border bg-destructive/10 border-destructive/20 shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 bg-destructive text-white rounded-2xl flex items-center justify-center text-xl md:text-2xl shadow-md">
                  🚨
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-destructive mb-2">WARNING: Do Not Open This Link!</h3>
                  <p className="text-sm md:text-base font-medium text-destructive/80 leading-relaxed">
                    This link has been flagged as dangerous, a scam, or contains malware. Delete it immediately.
                  </p>
                  {threatType && (
                    <p className="mt-3 text-xs font-bold uppercase tracking-widest text-destructive/60">
                      Threat detected: {threatType}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {result === 'unknown' && (
            <div className="p-6 md:p-8 rounded-2xl border bg-amber-500/10 border-amber-500/20 shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 bg-amber-500 text-white rounded-2xl flex items-center justify-center text-xl md:text-2xl shadow-md">
                  ⚠️
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-amber-600 mb-2">Proceed With Caution</h3>
                  <p className="text-sm md:text-base font-medium text-amber-700/80 leading-relaxed">
                    We couldn't fully verify this link. Do not enter any personal information if you open it.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="p-6 md:p-8 bg-[#D6D0F5]/30 rounded-2xl border border-border-main shadow-sm flex items-start gap-4">
        <div className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 bg-primary/10 text-primary rounded-2xl flex items-center justify-center text-xl md:text-2xl">
          💡
        </div>
        <div>
          <h4 className="font-bold text-primary text-lg md:text-xl mb-2">Quick Tip</h4>
          <p className="text-sm md:text-base text-text-muted leading-relaxed font-medium">
            Scam links often look like real websites but have small spelling differences. Example: 'Faceb00k.com' instead of 'Facebook.com'. When in doubt — don't tap it!
          </p>
        </div>
      </div>
    </div>
  );
};

export default LinkCheck;
