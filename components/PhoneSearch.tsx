
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import Markdown from 'react-markdown';
import { hapticFeedback } from '../src/utils/haptics';

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
    
    // Validation
    if (!trimmedQuery) {
      setError("Please enter a phone model.");
      hapticFeedback.warning();
      return;
    }

    if (trimmedQuery.length < 3) {
      setError("Please enter at least 3 characters for the phone model.");
      hapticFeedback.warning();
      return;
    }

    if (trimmedQuery.length > 50) {
      setError("Phone model name is too long. Please keep it under 50 characters.");
      hapticFeedback.warning();
      return;
    }

    // Basic sanitization check for suspicious characters
    if (/[<>{}[]]/.test(trimmedQuery)) {
      setError("Please avoid using special characters like < > { } [ ].");
      hapticFeedback.warning();
      return;
    }

    hapticFeedback.light();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Provide a guide for a senior using a ${trimmedQuery} Android phone. 
        Include:
        1. A step-by-step guide on how to activate "Senior Mode", "Easy Mode", or a "Senior Launcher" if available for this specific model.
        2. 5 simple, helpful tips and tricks focusing on accessibility, battery life, and ease of use. 
        Use clear, simple language and formatting.`,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      setResult(response.text || "Sorry, I couldn't find any specific tips for that model.");
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
    <div className="p-6 md:p-10">
      <h2 className="text-2xl md:text-[28px] font-bold mb-2 text-text-main">Phone Setup & Tips</h2>
      <p className="mb-6 md:mb-8 text-text-muted text-sm md:text-base font-medium">Search for your phone model to find "Senior Mode" and custom tips.</p>
      
      <form onSubmit={handleSearch} className="relative mb-8 md:mb-10">
        <div className="absolute inset-y-0 left-4 md:left-6 flex items-center pointer-events-none">
          <span className="text-lg md:text-xl opacity-30">📱</span>
        </div>
        <input 
          type="text" 
          placeholder="Enter phone model"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-12 md:pl-16 pr-28 md:pr-36 py-4 md:py-5 text-base md:text-lg bg-white border border-border-main rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary/20 transition-all outline-none shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
        />
        <button 
          type="submit"
          disabled={loading}
          className="absolute right-2 md:right-2.5 top-2 md:top-2.5 bottom-2 md:bottom-2.5 px-5 md:px-8 bg-primary text-white font-bold rounded-full shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all active:scale-95 disabled:opacity-50 text-xs md:text-sm"
        >
          {loading ? '...' : 'Search'}
        </button>
      </form>

      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-2xl mb-6 text-sm font-medium">
          {error}
        </div>
      )}

      {loading && (
        <div className="flex flex-col items-center justify-center py-10 md:py-16 space-y-4 md:space-y-5">
          <div className="w-12 h-12 md:w-14 md:h-14 border-4 border-primary/10 border-t-primary rounded-full animate-spin"></div>
          <p className="text-text-muted font-bold animate-pulse text-xs md:text-sm">Consulting the experts...</p>
        </div>
      )}

      {result && !loading && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="p-6 md:p-8 rounded-2xl border bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06)] border-border-main text-text-main">
            <div className="flex justify-between items-start mb-4 md:mb-6">
              <h3 className="text-xl md:text-2xl font-bold flex items-center gap-2">
                <span>✨</span> Senior Guide for {query}
              </h3>
              <button 
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary font-black rounded-full text-xs md:text-sm hover:bg-primary hover:text-white transition-all active:scale-95"
              >
                <span>{shareStatus === 'copied' ? '✅' : '📤'}</span>
                {shareStatus === 'copied' ? 'Copied' : 'Share'}
              </button>
            </div>
            <div className="markdown-body max-w-none text-sm md:text-base font-medium">
              <Markdown>{result}</Markdown>
            </div>
          </div>
          <p className="mt-6 text-[10px] md:text-[11px] text-text-muted font-bold uppercase tracking-widest text-center">
            Powered by Google Search & Gemini
          </p>
        </div>
      )}
    </div>
  );
};

export default PhoneSearch;
