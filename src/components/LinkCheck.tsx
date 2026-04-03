
import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { getGeminiApiKey } from "../utils/apiKey";
import { searchCache } from "../utils/cache";
import { hapticFeedback } from '../utils/haptics';
import { 
  Link2, 
  ShieldCheck, 
  ShieldAlert, 
  ShieldQuestion, 
  X, 
  Loader2, 
  Search, 
  Lightbulb,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  AlertCircle
} from 'lucide-react';

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

    const cacheKey = `link-check-${url.toLowerCase().trim()}`;
    const cachedResult = searchCache.get<any>(cacheKey);
    if (cachedResult) {
      if (cachedResult.status === 'dangerous') {
        setResult('dangerous');
        setThreatType(cachedResult.threatType || 'Suspicious Website');
        hapticFeedback.warning();
      } else if (cachedResult.status === 'safe') {
        setResult('safe');
        hapticFeedback.success();
      } else {
        setResult('unknown');
        hapticFeedback.warning();
      }
      setLoading(false);
      return;
    }

    try {
      let urlToCheck = url.trim();
      if (!/^https?:\/\//i.test(urlToCheck)) {
        urlToCheck = 'http://' + urlToCheck;
      }

      const apiKey = getGeminiApiKey();
      if (!apiKey) {
        setError("API key is missing. Please configure the application.");
        setLoading(false);
        return;
      }
      const ai = new GoogleGenAI({ apiKey });
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Quickly check URL safety: ${urlToCheck}. 
        Status: safe, dangerous, or unknown.
        Threat: If dangerous, name the threat (e.g., Phishing).`,
        config: {
          systemInstruction: "You are an AI that analyzes URL safety. You must respond in valid JSON.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              status: { type: Type.STRING, enum: ["safe", "dangerous", "unknown"] },
              threatType: { type: Type.STRING, description: "If dangerous, a short description of the threat (e.g., 'Phishing', 'Malware'). Otherwise, leave empty or null." }
            },
            required: ["status", "threatType"]
          }
        }
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("Empty response from Gemini");
      }

      const data = JSON.parse(responseText.trim());
      searchCache.set(cacheKey, data);

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
    <div className="p-6 md:p-10 space-y-12">
      <div className="space-y-2">
        <h2 className="text-2xl md:text-[32px] font-bold text-text-main flex items-center gap-4">
          <div className="p-3 bg-white rounded-2xl shadow-sm border border-border-main">
            <Link2 className="text-primary" size={28} />
          </div>
          Is This Link Safe?
        </h2>
        <p className="text-text-muted text-lg font-medium">
          Copy and paste any link or web address below to check if it's a scam, virus, or unsafe website.
        </p>
      </div>

      <div className="space-y-6">
        <div className="relative group">
          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors">
            <Link2 size={24} />
          </div>
          <input
            type="text"
            placeholder="Paste your link here..."
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setError(null);
            }}
            className={`w-full pl-16 pr-14 py-6 text-lg bg-white border rounded-3xl focus:ring-8 focus:ring-primary/5 focus:border-primary/20 transition-all outline-none shadow-sm ${
              error ? 'border-rose-300' : 'border-border-main'
            }`}
          />
          {url && (
            <button
              onClick={handleClear}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-text-muted hover:text-rose-500 bg-bg-main rounded-2xl transition-all"
              aria-label="Clear input"
            >
              <X size={20} />
            </button>
          )}
          {error && (
            <p className="absolute -bottom-7 left-6 text-xs font-black text-rose-500 uppercase tracking-widest animate-in fade-in slide-in-from-top-1">
              {error}
            </p>
          )}
        </div>

        <button
          onClick={handleCheck}
          disabled={loading}
          className="w-full py-6 px-8 btn-primary text-lg flex items-center justify-center gap-3 group"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={24} />
          ) : (
            <>
              <ShieldCheck size={24} />
              <span>Verify the link</span>
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </>
          )}
        </button>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <div className="p-6 bg-white rounded-full shadow-sm border border-border-main">
            <Loader2 className="animate-spin text-primary" size={48} />
          </div>
          <p className="text-text-muted font-bold animate-pulse text-lg">Checking your link...</p>
        </div>
      )}

      {result && !loading && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {result === 'safe' && (
            <div className="card-premium p-8 bg-emerald-50 border-emerald-100 shadow-sm">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 flex-shrink-0 bg-emerald-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-600/20">
                  <CheckCircle2 size={32} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-emerald-900">This Link Looks Safe</h3>
                  <p className="text-lg font-medium text-emerald-800/70 leading-relaxed">
                    No threats were detected. However, always be cautious about what personal information you share.
                  </p>
                </div>
              </div>
            </div>
          )}

          {result === 'dangerous' && (
            <div className="card-premium p-8 bg-rose-50 border-rose-100 shadow-sm">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 flex-shrink-0 bg-rose-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-rose-600/20">
                  <ShieldAlert size={32} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-rose-900">WARNING: Do Not Open!</h3>
                  <p className="text-lg font-medium text-rose-800/70 leading-relaxed">
                    This link has been flagged as dangerous, a scam, or contains malware. Delete it immediately.
                  </p>
                  {threatType && (
                    <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-rose-600/10 text-rose-600 rounded-lg text-xs font-black uppercase tracking-widest">
                      <AlertCircle size={14} />
                      Threat: {threatType}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {result === 'unknown' && (
            <div className="card-premium p-8 bg-amber-50 border-amber-100 shadow-sm">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 flex-shrink-0 bg-amber-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/20">
                  <ShieldQuestion size={32} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-amber-900">Proceed With Caution</h3>
                  <p className="text-lg font-medium text-amber-800/70 leading-relaxed">
                    We couldn't fully verify this link. Do not enter any personal information if you open it.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="card-premium p-8 bg-white border border-border-main shadow-sm flex items-start gap-6 group">
        <div className="p-4 bg-primary/5 rounded-2xl text-primary group-hover:scale-110 transition-transform">
          <Lightbulb size={32} />
        </div>
        <div className="space-y-2">
          <h4 className="font-bold text-text-main text-xl">Quick Tip</h4>
          <p className="text-base text-text-muted leading-relaxed font-medium">
            Scam links often look like real websites but have small spelling differences. Example: <span className="text-rose-500 font-bold">'Faceb00k.com'</span> instead of <span className="text-emerald-600 font-bold">'Facebook.com'</span>. When in doubt — don't tap it!
          </p>
        </div>
      </div>
    </div>
  );
};

export default LinkCheck;

