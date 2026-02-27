import React, { useState } from 'react';
import Markdown from 'react-markdown';

import { hapticFeedback } from '../utils/haptics';

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
      url: window.location.href
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
    hapticFeedback.light();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const prompt = `Provide a simple guide for a senior using a ${trimmedQuery} Android phone. Include Senior Mode instructions and 5 accessibility tips. Use very simple language.`;
      const response = await model.generateContent(prompt);
      setResult(response.response.text());
      hapticFeedback.success();
    } catch (err) {
      setError("Something went wrong. Please try again.");
      hapticFeedback.warning();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSearch} className="relative mb-4">
        <input
          type="text"
          placeholder="Enter phone model (e.g. Samsung A15)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-4 pr-36 py-4 bg-white border rounded-2xl outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="absolute right-2 top-2 bottom-2 px-4 bg-blue-500 text-white rounded-xl"
        >
          {loading ? '...' : 'Search'}
        </button>
      </form>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {loading && <p className="text-gray-500">Consulting the experts...</p>}

      {result && !loading && (
        <div>
          <button
            onClick={handleShare}
            className="mb-4 px-4 py-2 bg-gray-100 rounded-xl text-sm"
          >
            {shareStatus === 'copied' ? '✅ Copied' : '📤 Share'}
          </button>
          <div className="prose prose-sm max-w-none">
            <Markdown>{result}</Markdown>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhoneSearch;
