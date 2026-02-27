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
const shareData = { title: Senior Guide for ${query}, text: result, url: window.location.href };
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
} catch (err) { console.error('Error sharing:', err); }
};

const handleSearch = async (e: React.FormEvent) => {
e.preventDefault();
const trimmedQuery = query.trim();
if (!trimmedQuery) { setError("Please enter a phone model."); hapticFeedback.warning(); return; }
if (trimmedQuery.length < 3) { setError("Please enter at least 3 characters."); hapticFeedback.warning(); return; }
hapticFeedback.light();
setLoading(true);
setError(null);
setResult(null);
try {
const prompt = Provide a guide for a senior using a ${trimmedQuery} Android phone. Include step-by-step instructions for Senior Mode and 5 accessibility tips.;
const response = await fetch('/api/gemini', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ prompt })
});
if (!response.ok) throw new Error(Server returned ${response.status});
const data = await response.json();
setResult(data.text || "No tips found.");
hapticFeedback.success();
} catch (err) {
console.error(err);
setError("Something went wrong. Please try again.");
hapticFeedback.warning();
} finally { setLoading(false); }
};

return (

Phone Setup & Tips
Search for your phone model.

<input type="text" placeholder="Enter phone model" value={query} onChange={(e) => setQuery(e.target.value)} className="w-full pl-12 pr-36 py-4 bg-white border border-border-main rounded-2xl outline-none" />

{loading ? '...' : 'Search'}


{error && {error}}
{loading && Consulting the experts...}
{result && !loading && (


Guide for {query}

{shareStatus === 'copied' ? 'Copied' : 'Share'}


{result}

)}

);
};

export default PhoneSearch;
