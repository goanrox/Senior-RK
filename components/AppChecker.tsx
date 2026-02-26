
import React, { useState, useEffect } from 'react';
import { DEVICE_INSTRUCTIONS, GENERAL_SAFE_MODE } from '../constants';
import { AppInfo, DeviceBrand } from '../types';
import { hapticFeedback } from '../src/utils/haptics';
import { checkAppSafety } from '../src/services/geminiService';

interface AppCheckerProps {
  selectedDevice: DeviceBrand | null;
}

const AppChecker: React.FC<AppCheckerProps> = ({ selectedDevice }) => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<AppInfo | null>(null);
  const [showSafeMode, setShowSafeMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(async () => {
      const trimmedQuery = query.trim();
      
      if (trimmedQuery.length === 0) {
        setResult(null);
        setValidationError(null);
        return;
      }

      if (trimmedQuery.length > 0 && trimmedQuery.length <= 2) {
        setValidationError("Please type at least 3 characters.");
        setResult(null);
        return;
      }

      if (trimmedQuery.length > 30) {
        setValidationError("App name is too long.");
        setResult(null);
        return;
      }

      if (/[<>{}[]]/.test(trimmedQuery)) {
        setValidationError("Invalid characters detected.");
        setResult(null);
        return;
      }

      setValidationError(null);
      setIsLoading(true);
      const safetyResult = await checkAppSafety(trimmedQuery);
      if (safetyResult) {
        if (safetyResult.status === 'safe') {
          hapticFeedback.medium();
        } else {
          hapticFeedback.warning();
        }
        setResult(safetyResult);
      } else {
        setResult(null);
      }
      setIsLoading(false);
    }, 800); // Increased debounce for API call

    return () => clearTimeout(timer);
  }, [query]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    setShowSafeMode(false);
  };

  const toggleSafeMode = () => {
    hapticFeedback.light();
    setShowSafeMode(!showSafeMode);
  };

  const safeModeSteps = selectedDevice && DEVICE_INSTRUCTIONS[selectedDevice]?.safeModeSteps 
    ? DEVICE_INSTRUCTIONS[selectedDevice].safeModeSteps 
    : GENERAL_SAFE_MODE;

  return (
    <div className="p-6 md:p-10">
      <h2 className="text-2xl md:text-[28px] font-bold mb-2 text-text-main">Is My App Safe?</h2>
      <p className="mb-6 md:mb-8 text-text-muted text-sm md:text-base font-medium">Type the name of an app you see on your phone.</p>
      
      <div className="relative mb-8 md:mb-10">
        <div className="absolute inset-y-0 left-4 md:left-6 flex items-center pointer-events-none">
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          ) : (
            <span className="text-lg md:text-xl opacity-30">🔍</span>
          )}
        </div>
        <input 
          type="text" 
          placeholder="Type app name (e.g. Cleaner)"
          value={query}
          onChange={handleSearch}
          maxLength={31}
          className={`w-full pl-12 md:pl-16 pr-6 py-4 md:py-5 text-base md:text-lg bg-white border rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary/20 transition-all outline-none shadow-[0_4px_12px_rgba(0,0,0,0.06)] ${
            validationError ? 'border-destructive' : 'border-border-main'
          }`}
        />
        {validationError && (
          <p className="absolute -bottom-6 left-2 text-[10px] font-bold text-destructive uppercase tracking-widest animate-in fade-in slide-in-from-top-1">
            {validationError}
          </p>
        )}
      </div>

      {(query.length > 2 || isLoading) && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
          {isLoading ? (
            <div className="p-10 text-center">
              <div className="inline-block w-10 h-10 border-4 border-primary/10 border-t-primary rounded-full animate-spin mb-4"></div>
              <p className="text-text-muted font-bold uppercase tracking-widest text-[10px]">Analyzing Safety...</p>
            </div>
          ) : result ? (
            <div className={`p-6 md:p-8 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.06)] border border-border-main ${
              result.status === 'safe' ? 'bg-[#D6D0F5]/30' : 
              result.status === 'warning' ? 'bg-[#F4A5AE]/30' : 
              'bg-[#EF5350]/20'
            }`}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4 md:gap-5">
                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center text-xl md:text-2xl shadow-md ${
                    result.status === 'safe' ? 'bg-primary text-white' : 
                    result.status === 'warning' ? 'bg-secondary text-white' : 
                    'bg-destructive text-white'
                  }`}>
                    {result.status === 'safe' ? '✓' : result.status === 'warning' ? '!' : '✕'}
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold capitalize text-text-main">{result.name}</h3>
                    <p className="font-bold opacity-60 uppercase tracking-widest text-[10px] md:text-[11px]">Status: {result.status}</p>
                  </div>
                </div>
                
                {result.score !== undefined && (
                  <div className="text-right">
                    <div className="text-[10px] font-bold uppercase tracking-tighter opacity-40">Safety Score</div>
                    <div className={`text-2xl md:text-4xl font-bold ${
                      result.score > 80 ? 'text-primary' : 
                      result.score > 50 ? 'text-secondary' : 'text-destructive'
                    }`}>
                      {result.score}<span className="text-xs opacity-40">/100</span>
                    </div>
                  </div>
                )}
              </div>
              <p className="text-sm md:text-base mb-4 md:mb-6 leading-relaxed font-medium text-text-main">{result.reason}</p>
              
              {result.status !== 'safe' && (
                <button 
                  onClick={toggleSafeMode}
                  className={`mb-4 md:mb-6 text-xs md:text-sm font-bold underline decoration-2 underline-offset-4 transition-colors ${
                    result.status === 'warning' ? 'text-secondary-dark hover:text-secondary' : 'text-destructive hover:text-destructive/80'
                  }`}
                >
                  {showSafeMode ? 'Hide Safe Mode Steps' : 'How to remove this app safely?'}
                </button>
              )}

              {showSafeMode && (
                <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-border-main mb-4 md:mb-6 animate-in zoom-in-95 duration-200">
                  <h4 className="font-bold text-[11px] md:text-sm uppercase tracking-widest mb-4 md:mb-5 opacity-70 text-text-main">Safe Mode Instructions {selectedDevice ? `for ${selectedDevice}` : '(General)'}</h4>
                  <div className="space-y-4 md:space-y-5 text-text-main">
                    <div>
                      <p className="text-[10px] md:text-xs font-bold uppercase tracking-tighter mb-1 opacity-40">1. Enter</p>
                      {safeModeSteps.enter.map((s, i) => <p key={i} className="text-xs md:text-sm mb-1 font-medium">• {s}</p>)}
                    </div>
                    <div>
                      <p className="text-[10px] md:text-xs font-bold uppercase tracking-tighter mb-1 opacity-40">2. Uninstall</p>
                      {safeModeSteps.uninstall.map((s, i) => <p key={i} className="text-xs md:text-sm mb-1 font-medium">• {s}</p>)}
                    </div>
                    <div>
                      <p className="text-[10px] md:text-xs font-bold uppercase tracking-tighter mb-1 opacity-40">3. Exit</p>
                      {safeModeSteps.exit.map((s, i) => <p key={i} className="text-xs md:text-sm mb-1 font-medium">• {s}</p>)}
                    </div>
                  </div>
                </div>
              )}

              {result.alternative && (
                <div className="bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-border-main">
                  <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest opacity-40 mb-1 text-text-main">Better Choice</p>
                  <p className="text-sm md:text-base font-bold text-text-main">{result.alternative}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="p-6 md:p-8 rounded-2xl border border-border-main bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06)] text-text-muted">
              <p className="text-sm md:text-base leading-relaxed font-medium">We don't recognize "{query}" yet, but if it says <strong className="text-text-main">"Cleaner"</strong>, <strong className="text-text-main">"Booster"</strong>, or <strong className="text-text-main">"Battery Saver"</strong>, it is probably <strong className="text-destructive">bad</strong>.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AppChecker;
