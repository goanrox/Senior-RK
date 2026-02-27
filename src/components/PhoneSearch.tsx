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

};

const handleSearch = async (e: React.FormEvent) => {
e.preventDefault();
const trimmedQuery = query.trim();

};

return (

Phone Setup & Tips
Search for your phone model to find "Senior Mode" and custom tips.

);
};

export default PhoneSearch;
