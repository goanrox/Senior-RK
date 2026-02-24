
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

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim().length > 2) {
        setIsLoading(true);
        const safetyResult = await checkAppSafety(query);
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
      } else {
        setResult(null);
      }
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
    <div className="p-5 md:p-8">
      <h2 className="text-xl md:text-2xl font-extrabold mb-2 text-text-main">Is My App Safe?</h2>
      <p className="mb-5 md:mb-6 text-text-muted text-sm md:text-base">Type the name of an app you see on your phone.</p>
      
      <div className="relative mb-6 md:mb-8">
        <div className="absolute inset-y-0 left-4 md:left-5 flex items-center pointer-events-none">
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
          className="w-full pl-12 md:pl-14 pr-5 md:pr-6 py-3 md:py-4 text-base md:text-lg bg-surface-muted border border-border-main rounded-xl md:rounded-2xl focus:bg-surface focus:ring-4 focus:ring-primary/10 focus:border-primary/20 transition-all outline-none shadow-inner"
        />
      </div>

      {(query.length > 2 || isLoading) && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="inline-block w-8 h-8 border-4 border-primary/10 border-t-primary rounded-full animate-spin mb-4"></div>
              <p className="text-text-muted font-bold uppercase tracking-widest text-[10px]">Analyzing Safety...</p>
            </div>
          ) : result ? (
            <div className={`p-4 md:p-6 rounded-xl md:rounded-2xl border ${
              result.status === 'safe' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 
              result.status === 'warning' ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' : 
              'bg-rose-500/10 border-rose-500/20 text-rose-500'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center text-xl md:text-2xl shadow-lg ${
                    result.status === 'safe' ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 
                    result.status === 'warning' ? 'bg-amber-500 text-white shadow-amber-500/20' : 
                    'bg-rose-500 text-white shadow-rose-500/20'
                  }`}>
                    {result.status === 'safe' ? '✓' : result.status === 'warning' ? '!' : '✕'}
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-extrabold capitalize text-text-main">{result.name}</h3>
                    <p className="font-bold opacity-60 uppercase tracking-widest text-[9px] md:text-[10px]">Status: {result.status}</p>
                  </div>
                </div>
                
                {result.score !== undefined && (
                  <div className="text-right">
                    <div className="text-[10px] font-black uppercase tracking-tighter opacity-40">Safety Score</div>
                    <div className={`text-2xl md:text-3xl font-black ${
                      result.score > 80 ? 'text-emerald-500' : 
                      result.score > 50 ? 'text-amber-500' : 'text-rose-500'
                    }`}>
                      {result.score}<span className="text-xs opacity-40">/100</span>
                    </div>
                  </div>
                )}
              </div>
              <p className="text-sm md:text-base mb-3 md:mb-4 leading-relaxed opacity-80 text-text-main">{result.reason}</p>
              
              {result.status !== 'safe' && (
                <button 
                  onClick={toggleSafeMode}
                  className={`mb-3 md:mb-4 text-xs md:text-sm font-bold underline decoration-2 underline-offset-4 transition-colors ${
                    result.status === 'warning' ? 'text-amber-600 hover:text-amber-700' : 'text-rose-600 hover:text-rose-700'
                  }`}
                >
                  {showSafeMode ? 'Hide Safe Mode Steps' : 'How to remove this app safely?'}
                </button>
              )}

              {showSafeMode && (
                <div className="bg-surface/40 backdrop-blur-sm p-4 md:p-5 rounded-lg md:rounded-xl border border-border-main mb-3 md:mb-4 animate-in zoom-in-95 duration-200">
                  <h4 className="font-bold text-[10px] md:text-sm uppercase tracking-widest mb-3 md:mb-4 opacity-70 text-text-main">Safe Mode Instructions {selectedDevice ? `for ${selectedDevice}` : '(General)'}</h4>
                  <div className="space-y-3 md:space-y-4 text-text-main">
                    <div>
                      <p className="text-[9px] md:text-xs font-black uppercase tracking-tighter mb-1 opacity-40">1. Enter</p>
                      {safeModeSteps.enter.map((s, i) => <p key={i} className="text-xs md:text-sm mb-1">• {s}</p>)}
                    </div>
                    <div>
                      <p className="text-[9px] md:text-xs font-black uppercase tracking-tighter mb-1 opacity-40">2. Uninstall</p>
                      {safeModeSteps.uninstall.map((s, i) => <p key={i} className="text-xs md:text-sm mb-1">• {s}</p>)}
                    </div>
                    <div>
                      <p className="text-[9px] md:text-xs font-black uppercase tracking-tighter mb-1 opacity-40">3. Exit</p>
                      {safeModeSteps.exit.map((s, i) => <p key={i} className="text-xs md:text-sm mb-1">• {s}</p>)}
                    </div>
                  </div>
                </div>
              )}

              {result.alternative && (
                <div className="bg-surface/50 backdrop-blur-sm p-3 md:p-4 rounded-lg md:rounded-xl border border-border-main">
                  <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest opacity-40 mb-1 text-text-main">Better Choice</p>
                  <p className="text-sm md:text-base font-bold text-text-main">{result.alternative}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 md:p-6 rounded-xl md:rounded-2xl border border-border-main bg-surface-muted text-text-muted">
              <p className="text-sm md:text-base leading-relaxed">We don't recognize "{query}" yet, but if it says <strong className="text-text-main">"Cleaner"</strong>, <strong className="text-text-main">"Booster"</strong>, or <strong className="text-text-main">"Battery Saver"</strong>, it is probably <strong className="text-rose-500">bad</strong>.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AppChecker;
