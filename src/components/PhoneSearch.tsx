
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { getGeminiApiKey } from "../utils/apiKey";
import { searchCache } from "../utils/cache";
import Markdown from 'react-markdown';
import { hapticFeedback } from '../utils/haptics';
import { 
  Smartphone, 
  Search, 
  Share2, 
  Check, 
  Loader2, 
  Sparkles, 
  AlertCircle,
  ArrowRight,
  Info,
  SmartphoneIcon
} from 'lucide-react';

const PhoneSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [shareStatus, setShareStatus] = useState<'idle' | 'shared' | 'copied'>('idle');

  const handleShare = async () => {
    if (!result) return;
    
    const shareData = {
      title: `Senior Guide for ${query}`,
      text: result,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setShareStatus('shared');
        hapticFeedback.success();
      } else {
        await navigator.clipboard.writeText(result);
        setShareStatus('copied');
        hapticFeedback.success();
        setTimeout(() => setShareStatus('idle'), 3000);
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    
    if (!trimmedQuery) {
      setError("Please enter a phone model.");
      hapticFeedback.warning();
      return;
    }

    if (trimmedQuery.length < 3) {
      setError("Please enter at least 3 characters.");
      hapticFeedback.warning();
      return;
    }

    if (trimmedQuery.length > 50) {
      setError("Phone model name is too long.");
      hapticFeedback.warning();
      return;
    }

    if (/[<>{}[]]/.test(trimmedQuery)) {
      setError("Please avoid using special characters.");
      hapticFeedback.warning();
      return;
    }

    hapticFeedback.light();
    
    const cacheKey = `phone-search-${trimmedQuery.toLowerCase()}`;
    const cachedResult = searchCache.get<string>(cacheKey);
    if (cachedResult) {
      setResult(cachedResult);
      hapticFeedback.success();
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const apiKey = getGeminiApiKey();
      if (!apiKey) {
        setError("API key is missing. Please configure the application.");
        return;
      }
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Quick guide for a senior using a ${trimmedQuery} Android phone. 
        Focus on: Senior/Easy Mode activation and 3-5 simple accessibility tips. 
        Keep it very concise and easy to read.`,
        config: {
          systemInstruction: "You are a helpful assistant providing concise guides for seniors using Android phones."
        }
      });

      const textResult = response.text || "Sorry, I couldn't find any specific tips for that model.";
      setResult(textResult);
      searchCache.set(cacheKey, textResult);
      hapticFeedback.success();
    } catch (err) {
      console.error(err);
      setError("Something went wrong while searching. Please try again.");
      hapticFeedback.warning();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-10 space-y-12">
      <div className="space-y-2">
        <h2 className="text-2xl md:text-[32px] font-bold text-text-main flex items-center gap-4">
          <div className="p-3 bg-white rounded-2xl shadow-sm border border-border-main">
            <Smartphone className="text-primary" size={28} />
          </div>
          Phone Setup & Tips
        </h2>
        <p className="text-text-muted text-lg font-medium">Search for your phone model to find "Senior Mode" and custom tips.</p>
      </div>
      
      <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto">
        <div className="relative flex items-center h-[52px] bg-white border border-border-main rounded-2xl pl-[16px] pr-0 shadow-sm focus-within:ring-2 focus-within:ring-primary/20 transition-all overflow-hidden">
          <SmartphoneIcon size={20} className="text-text-muted mr-[12px] flex-none" />
          <input 
            type="text" 
            placeholder="Enter phone model"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setError(null);
            }}
            className="flex-1 min-w-0 bg-transparent border-none outline-none text-text-main h-full placeholder:text-text-subtle text-[16px]"
          />
          <button 
            type="submit"
            disabled={loading}
            className="flex-none inline-flex items-center justify-center h-10 px-4 bg-primary-light text-primary-dark font-bold rounded-xl shadow-sm hover:bg-primary/10 transition-all active:scale-95 disabled:opacity-50 whitespace-nowrap ml-2 mr-2"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              "Search"
            )}
          </button>
        </div>
      </form>

      {error && (
        <div className="card-premium p-6 bg-rose-50 border-rose-100 text-rose-600 flex items-center gap-4 animate-in fade-in slide-in-from-top-2">
          <AlertCircle size={24} />
          <p className="font-bold">{error}</p>
        </div>
      )}

      {loading && (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <div className="p-6 bg-white rounded-full shadow-sm border border-border-main">
            <Loader2 className="animate-spin text-primary" size={48} />
          </div>
          <p className="text-text-muted font-bold animate-pulse text-lg">Consulting the experts...</p>
        </div>
      )}

      {result && !loading && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
          <div className="card-premium p-8 bg-white border border-border-main shadow-sm text-text-main relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
              <Sparkles size={120} />
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8 relative z-10">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
                  <Sparkles size={12} />
                  Custom Guide
                </div>
                <h3 className="text-2xl font-bold flex items-center gap-3">
                  Senior Guide for {query}
                </h3>
              </div>
              
              <button 
                onClick={handleShare}
                className="btn-secondary px-6 py-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
              >
                {shareStatus === 'copied' ? (
                  <>
                    <Check size={16} />
                    Copied
                  </>
                ) : (
                  <>
                    <Share2 size={16} />
                    Share Guide
                  </>
                )}
              </button>
            </div>

            <div className="markdown-body max-w-none text-lg font-medium leading-relaxed relative z-10">
              <Markdown>{result}</Markdown>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-text-muted/40">
            <Info size={12} />
            Powered by Gemini
          </div>
        </div>
      )}

      {!result && !loading && (
        <div className="card-premium p-8 bg-primary/5 border-primary/10 flex items-start gap-6">
          <div className="p-4 bg-primary/10 rounded-2xl text-primary">
            <Info size={32} />
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-text-main text-xl">Why search for your model?</h4>
            <p className="text-base text-text-muted leading-relaxed font-medium">
              Every Android phone is slightly different. By searching for your specific model, we can give you exact instructions on how to turn on "Senior Mode" or "Easy Mode" to make your phone simpler to use.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhoneSearch;

