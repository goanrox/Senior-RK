
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import Markdown from 'react-markdown';
import { hapticFeedback } from '../src/utils/haptics';

const PhoneSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    hapticFeedback.light();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Provide a guide for a senior using a ${query} Android phone. 
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
    <div className="p-5 md:p-8">
      <h2 className="text-xl md:text-2xl font-extrabold mb-2 text-text-main">Phone Setup & Tips</h2>
      <p className="mb-5 md:mb-6 text-text-muted text-sm md:text-base">Search for your phone model to find "Senior Mode" and custom tips.</p>
      
      <form onSubmit={handleSearch} className="relative mb-6 md:mb-8">
        <div className="absolute inset-y-0 left-4 md:left-5 flex items-center pointer-events-none">
          <span className="text-lg md:text-xl opacity-30">📱</span>
        </div>
        <input 
          type="text" 
          placeholder="Enter phone model"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-12 md:pl-14 pr-24 md:pr-32 py-3 md:py-4 text-base md:text-lg bg-surface-muted border border-border-main rounded-xl md:rounded-2xl focus:bg-surface focus:ring-4 focus:ring-primary/10 focus:border-primary/20 transition-all outline-none shadow-inner"
        />
        <button 
          type="submit"
          disabled={loading}
          className="absolute right-1.5 md:right-2 top-1.5 md:top-2 bottom-1.5 md:bottom-2 px-4 md:px-6 bg-primary text-white font-bold rounded-lg md:rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all active:scale-95 disabled:opacity-50 text-xs md:text-base"
        >
          {loading ? '...' : 'Search'}
        </button>
      </form>

      {error && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-xl md:rounded-2xl mb-4 text-sm">
          {error}
        </div>
      )}

      {loading && (
        <div className="flex flex-col items-center justify-center py-8 md:py-12 space-y-3 md:space-y-4">
          <div className="w-10 h-10 md:w-12 md:h-12 border-4 border-primary/10 border-t-primary rounded-full animate-spin"></div>
          <p className="text-text-muted font-bold animate-pulse text-xs md:text-sm">Consulting the experts...</p>
        </div>
      )}

      {result && !loading && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="p-4 md:p-6 rounded-xl md:rounded-2xl border bg-primary/5 border-primary/10 text-text-main">
            <h3 className="text-lg md:text-xl font-extrabold mb-3 md:mb-4 flex items-center gap-2">
              <span>✨</span> Senior Guide for {query}
            </h3>
            <div className="markdown-body max-w-none text-sm md:text-base">
              <Markdown>{result}</Markdown>
            </div>
          </div>
          <p className="mt-4 text-[9px] md:text-[10px] text-text-muted font-bold uppercase tracking-widest text-center">
            Powered by Google Search & Gemini
          </p>
        </div>
      )}
    </div>
  );
};

export default PhoneSearch;
