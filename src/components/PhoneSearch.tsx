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

const shareData = { title: `Senior Guide for ${query}`, text: result, url: window.location.href };

try {

if (navigator.share) { await navigator.share(shareData); setShareStatus('shared'); hapticFeedback.success(); }

else { await navigator.clipboard.writeText(result); setShareStatus('copied'); hapticFeedback.success(); setTimeout(() => setShareStatus('idle'), 3000); }

} catch (err) { console.error('Error sharing:', err); } };

const handleSearch = async (e: React.FormEvent) => {

e.preventDefault();

const trimmedQuery = query.trim();

if (!trimmedQuery) { setError("Please enter a phone model."); hapticFeedback.warning(); return; }

hapticFeedback.light();

setLoading(true);

setError(null);

setResult(null);

try {

const prompt = `Provide a guide for a senior using a ${trimmedQuery} Android phone. Include instructions for Senior Mode and 5 accessibility tips.`;

const response = await fetch('/api/gemini', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt }) });

if (!response.ok) throw new Error(`Server error: ${response.status}`);

const data = await response.json();

setResult(data.text || "No results.");

hapticFeedback.success();

} catch (err) { setError("Something went wrong. Please try again."); hapticFeedback.warning(); }

finally { setLoading(false); } };

return (

<input type="text" placeholder="Enter phone model" value={query} onChange={(e) => setQuery(e.target.value)} className="w-full pl-4 pr-36 py-4 bg-white border rounded-2xl outline-none" />

 {loading ? '...' : 'Search'} 

{error && {error}}

{loading && Consulting the experts...}

{result && !loading && (

 {shareStatus === 'copied' ? '✅ Copied' : '📤 Share'} 

export default PhoneSearch;
