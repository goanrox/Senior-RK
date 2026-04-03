
import React, { useState, useEffect } from 'react';
import { DEVICE_INSTRUCTIONS, GENERAL_SAFE_MODE } from '../constants';
import { AppInfo, DeviceBrand } from '../types';
import { hapticFeedback } from '../utils/haptics';
import { checkAppSafety } from '../services/geminiService';
import { 
  Search, 
  ShieldCheck, 
  ShieldAlert, 
  ShieldX, 
  Info, 
  Loader2,
  ChevronRight,
  ArrowRight,
  AlertTriangle
} from 'lucide-react';

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
    }, 400);

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
    <div className="p-6 md:p-10 space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl md:text-[28px] font-bold text-text-main">Is My App Safe?</h2>
        <p className="text-text-muted text-base font-medium">Type the name of an app you see on your phone.</p>
      </div>
      
      <div className="relative">
        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
          {isLoading ? (
            <Loader2 className="w-5 h-5 text-primary animate-spin" />
          ) : (
            <Search className="w-5 h-5 text-text-muted opacity-40" />
          )}
        </div>
        <input 
          type="text" 
          placeholder="Type app name (e.g. Cleaner)"
          value={query}
          onChange={handleSearch}
          maxLength={31}
          className={`w-full pl-14 pr-6 py-5 text-lg bg-white border rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary/20 transition-all outline-none shadow-sm ${
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
            <div className="p-12 text-center card-premium bg-white/50">
              <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto mb-4" />
              <p className="text-text-muted font-bold uppercase tracking-widest text-[10px]">Analyzing Safety...</p>
            </div>
          ) : result ? (
            <div className={`p-6 md:p-8 rounded-3xl shadow-lg border relative overflow-hidden ${
              result.status === 'safe' ? 'bg-emerald-50 border-emerald-100' : 
              result.status === 'warning' ? 'bg-amber-50 border-amber-100' : 
              'bg-red-50 border-red-100'
            }`}>
              <div className="absolute top-0 right-0 p-4 opacity-5">
                {result.status === 'safe' ? <ShieldCheck size={120} /> : 
                 result.status === 'warning' ? <ShieldAlert size={120} /> : 
                 <ShieldX size={120} />}
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-5">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg ${
                      result.status === 'safe' ? 'bg-emerald-500 shadow-emerald-500/20' : 
                      result.status === 'warning' ? 'bg-amber-500 shadow-amber-500/20' : 
                      'bg-red-500 shadow-red-500/20'
                    }`}>
                      {result.status === 'safe' ? <ShieldCheck size={28} /> : 
                       result.status === 'warning' ? <ShieldAlert size={28} /> : 
                       <ShieldX size={28} />}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold capitalize text-text-main">{result.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                          result.status === 'safe' ? 'bg-emerald-100 text-emerald-700' : 
                          result.status === 'warning' ? 'bg-amber-100 text-text-main' : 
                          'bg-red-100 text-red-700'
                        }`}>
                          {result.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {result.score !== undefined && (
                    <div className="text-right">
                      <div className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-1">Safety Score</div>
                      <div className={`text-4xl font-bold ${
                        result.score > 80 ? 'text-emerald-600' : 
                        result.score > 50 ? 'text-text-main' : 'text-red-600'
                      }`}>
                        {result.score}<span className="text-xs opacity-40 ml-0.5">/100</span>
                      </div>
                    </div>
                  )}
                </div>

                <p className="text-lg mb-8 leading-relaxed font-medium text-text-main">{result.reason}</p>
                
                {result.status !== 'safe' && (
                  <button 
                    onClick={toggleSafeMode}
                    className={`flex items-center gap-2 mb-8 text-sm font-bold transition-all active:scale-95 ${
                      result.status === 'warning' ? 'text-text-main hover:opacity-80' : 'text-red-700 hover:text-red-800'
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg ${result.status === 'warning' ? 'bg-amber-100' : 'bg-red-100'}`}>
                      <AlertTriangle size={16} />
                    </div>
                    {showSafeMode ? 'Hide instructions' : 'How to remove this app safely?'}
                  </button>
                )}

                {showSafeMode && (
                  <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white shadow-sm mb-8 animate-in zoom-in-95 duration-200 space-y-6">
                    <h4 className="font-bold text-sm uppercase tracking-widest opacity-70 text-text-main flex items-center gap-2">
                      <Info size={16} />
                      Safe Mode Instructions
                    </h4>
                    <div className="grid grid-cols-1 gap-6">
                      <SafeModeMiniStep number="1" title="Enter" steps={safeModeSteps.enter} />
                      <SafeModeMiniStep number="2" title="Uninstall" steps={safeModeSteps.uninstall} />
                      <SafeModeMiniStep number="3" title="Exit" steps={safeModeSteps.exit} />
                    </div>
                  </div>
                )}

                {result.alternative && (
                  <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white shadow-sm flex items-center justify-between group">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-1">Better Choice</p>
                      <p className="text-lg font-bold text-text-main">{result.alternative}</p>
                    </div>
                    <div className="p-2 bg-primary/10 rounded-full text-primary group-hover:translate-x-1 transition-transform">
                      <ArrowRight size={20} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-3xl border border-border-main bg-white shadow-sm text-text-muted flex items-start gap-4">
              <div className="p-3 bg-bg-main rounded-2xl text-text-muted">
                <Info size={24} />
              </div>
              <p className="text-lg leading-relaxed font-medium">
                We don't recognize "{query}" yet, but if it says <strong className="text-text-main">"Cleaner"</strong>, <strong className="text-text-main">"Booster"</strong>, or <strong className="text-text-main">"Battery Saver"</strong>, it is probably <strong className="text-red-500">bad</strong>.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const SafeModeMiniStep: React.FC<{ number: string; title: string; steps: string[] }> = ({ number, title, steps }) => (
  <div className="space-y-2">
    <div className="flex items-center gap-2">
      <span className="w-5 h-5 bg-primary/10 text-primary rounded-md flex items-center justify-center text-[10px] font-black">{number}</span>
      <p className="text-xs font-bold uppercase tracking-widest opacity-60">{title}</p>
    </div>
    <div className="space-y-1.5 ml-7">
      {steps.map((s, i) => (
        <div key={i} className="flex gap-2 items-start">
          <div className="w-1 h-1 bg-primary/30 rounded-full mt-2 flex-shrink-0" />
          <p className="text-sm font-medium text-text-main leading-snug">{s}</p>
        </div>
      ))}
    </div>
  </div>
);

export default AppChecker;

