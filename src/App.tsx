
import React, { useState } from 'react';
import { DeviceBrand } from './types';
import { DEVICE_INSTRUCTIONS } from './constants';
import Button from './components/Button';

import AppChecker from './components/AppChecker';
import AdBlockerInfo from './components/AdBlockerInfo';
import PerformanceTips from './components/PerformanceTips';
import AboutModal from './components/AboutModal';
import PhoneSearch from './components/PhoneSearch';
import HSIGuide from './components/HSIGuide';
import FBSafety from './components/FBSafety';
import LinkCheck from './components/LinkCheck';
import { hapticFeedback } from './utils/haptics';

const App: React.FC = () => {
  const [selectedDevice, setSelectedDevice] = useState<DeviceBrand | null>(null);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLargeText, setIsLargeText] = useState(false);
  const [activeTool, setActiveTool] = useState<'checker' | 'search' | 'tips' | 'adblock' | 'hsi' | 'fbsafety' | 'linkcheck'>('checker');

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  React.useEffect(() => {
    if (isLargeText) {
      document.documentElement.classList.add('large-text');
    } else {
      document.documentElement.classList.remove('large-text');
    }
  }, [isLargeText]);

  const handleDeviceSelect = (brand: DeviceBrand) => {
    hapticFeedback.medium();
    setSelectedDevice(brand);
    setTimeout(() => {
      document.getElementById('guide')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const toggleLargeText = () => {
    hapticFeedback.light();
    setIsLargeText(!isLargeText);
  };

  const toggleDarkMode = () => {
    hapticFeedback.light();
    setIsDarkMode(!isDarkMode);
  };

  const handleToolChange = (tool: 'checker' | 'search' | 'tips' | 'adblock' | 'hsi' | 'fbsafety' | 'linkcheck') => {
    hapticFeedback.light();
    setActiveTool(tool);
  };

  return (
    <div className="min-h-screen bg-bg-main text-text-main flex flex-col font-sans transition-colors duration-300">
      {/* Soft Top Bar */}
      <div className="bg-surface/90 backdrop-blur-md border-b border-border-main py-4 px-4 md:px-6 sticky top-0 z-50 shadow-sm">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-primary rounded-lg md:rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="text-white font-black text-lg md:text-xl">R</span>
            </div>
            <span className="text-lg md:text-xl font-bold tracking-tight text-text-main">RescueKit</span>
          </div>
          
          <div className="flex items-center gap-2 md:gap-3">
            {/* Accessibility Controls */}
            <div className="flex bg-bg-main p-1 rounded-full gap-1 border border-border-main">
              <button 
                onClick={toggleLargeText}
                className={`px-3 py-1.5 rounded-full text-[10px] md:text-xs font-black transition-all ${
                  isLargeText ? 'bg-primary shadow-md text-white' : 'text-text-main hover:text-primary'
                }`}
                title="Toggle Large Text"
              >
                AA
              </button>
              <button 
                onClick={toggleDarkMode}
                className={`px-3 py-1.5 rounded-full text-[10px] md:text-xs font-black transition-all ${
                  isDarkMode ? 'bg-primary shadow-md text-white' : 'text-text-main hover:text-primary'
                }`}
                title="Toggle Dark Mode"
              >
                {isDarkMode ? '🌙' : '☀️'}
              </button>
            </div>

            <div className="hidden sm:flex gap-4 md:gap-6 font-bold text-[10px] md:text-sm uppercase tracking-widest text-text-muted ml-2 md:ml-4">
              <a href="#" className="hover:text-primary transition-colors">Guide</a>
              <a href="#" className="hover:text-primary transition-colors">Security</a>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 md:px-6 py-6 md:py-8 flex-grow w-full">
        {/* Hero Section - More Compact */}
        <header className="text-center mb-6 md:mb-10">
          <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-2 md:mb-3">
            Trusted by 50,000+ Seniors
          </div>
          <h1 className="text-3xl md:text-5xl font-black mb-2 md:mb-3 leading-tight tracking-tight text-text-main">
            Your Phone, <span className="text-primary">Simplified.</span>
          </h1>
          <p className="text-sm md:text-lg text-text-muted mb-5 md:mb-6 max-w-lg mx-auto font-bold leading-relaxed px-2">
            Stop annoying ads and speed up your device in minutes. 
            Choose your brand to begin.
          </p>

          {/* Mini Dashboard - Slimmer & Horizontal Scroll on Mobile */}
          <div className="flex overflow-x-auto pb-4 md:pb-0 md:flex-wrap justify-start md:justify-center gap-2 mb-6 md:mb-8 no-scrollbar">
            <div className="flex-shrink-0 bg-white py-1.5 px-4 rounded-full border border-border-main flex items-center gap-2 shadow-sm">
              <span className="text-emerald-600 font-black text-xs md:text-sm">98%</span>
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-tight text-text-main">Safety Secure</span>
            </div>
            <div className="flex-shrink-0 bg-white py-1.5 px-4 rounded-full border border-border-main flex items-center gap-2 shadow-sm">
              <span className="text-primary font-black text-xs md:text-sm">0</span>
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-tight text-text-main">Threats Clean</span>
            </div>
            <div className="flex-shrink-0 bg-white py-1.5 px-4 rounded-full border border-border-main flex items-center gap-2 shadow-sm">
              <span className="text-amber-600 font-black text-xs md:text-sm">2m</span>
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-tight text-text-main">Fix Time Fast</span>
            </div>
          </div>
        </header>

        {/* Device Selector - Slimmer Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-12">
          {(Object.values(DeviceBrand)).map((brand) => (
            <button
              key={brand}
              onClick={() => handleDeviceSelect(brand)}
              className={`py-3 px-4 md:py-4 md:px-6 rounded-xl transition-all flex items-center justify-center group ${
                selectedDevice === brand 
                ? 'bg-primary text-white shadow-md scale-[1.02]' 
                : 'bg-surface text-text-main hover:bg-bg-main shadow-sm border border-border-main'
              }`}
            >
              <span className={`font-black text-xs md:text-sm uppercase tracking-widest ${
                selectedDevice === brand ? 'text-white' : 'text-text-main'
              }`}>{brand}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Rescue Content - Tightened spacing */}
        <div className="space-y-6 md:space-y-8">
          {selectedDevice && (
            <RescueGuide instruction={DEVICE_INSTRUCTIONS[selectedDevice]} />
          )}

          {/* Tool Tabs for Mobile Optimization */}
          <div className="bg-surface rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.06)] border border-border-main overflow-hidden">
            <div className="flex border-b border-border-main bg-bg-main overflow-x-auto no-scrollbar p-1">
              <button 
                onClick={() => handleToolChange('checker')}
                className={`flex-1 py-3 px-4 text-[10px] font-black uppercase tracking-widest transition-all rounded-xl whitespace-nowrap ${
                  activeTool === 'checker' ? 'bg-primary text-white shadow-md' : 'text-text-main hover:text-primary'
                }`}
              >
                App Checker
              </button>
              <button 
                onClick={() => handleToolChange('search')}
                className={`flex-1 py-3 px-4 text-[10px] font-black uppercase tracking-widest transition-all rounded-xl whitespace-nowrap ${
                  activeTool === 'search' ? 'bg-primary text-white shadow-md' : 'text-text-main hover:text-primary'
                }`}
              >
                Phone Search
              </button>
              <button 
                onClick={() => handleToolChange('adblock')}
                className={`flex-1 py-3 px-4 text-[10px] font-black uppercase tracking-widest transition-all rounded-xl whitespace-nowrap ${
                  activeTool === 'adblock' ? 'bg-primary text-white shadow-md' : 'text-text-main hover:text-primary'
                }`}
              >
                Ad Blocker
              </button>
              <button 
                onClick={() => handleToolChange('tips')}
                className={`flex-1 py-3 px-4 text-[10px] font-black uppercase tracking-widest transition-all rounded-xl whitespace-nowrap ${
                  activeTool === 'tips' ? 'bg-primary text-white shadow-md' : 'text-text-main hover:text-primary'
                }`}
              >
                Performance
              </button>
              <button 
                onClick={() => handleToolChange('hsi')}
                className={`flex-1 py-3 px-4 text-[10px] font-black uppercase tracking-widest transition-all rounded-xl whitespace-nowrap ${
                  activeTool === 'hsi' ? 'bg-primary text-white shadow-md' : 'text-text-main hover:text-primary'
                }`}
              >
                Home Internet
              </button>
              <button 
                onClick={() => handleToolChange('fbsafety')}
                className={`flex-1 py-3 px-4 text-[10px] font-black uppercase tracking-widest transition-all rounded-xl whitespace-nowrap ${
                  activeTool === 'fbsafety' ? 'bg-primary text-white shadow-md' : 'text-text-main hover:text-primary'
                }`}
              >
                FB Safety
              </button>
              <button 
                onClick={() => handleToolChange('linkcheck')}
                className={`flex-1 py-3 px-4 text-[10px] font-black uppercase tracking-widest transition-all rounded-xl whitespace-nowrap ${
                  activeTool === 'linkcheck' ? 'bg-primary text-white shadow-md' : 'text-text-main hover:text-primary'
                }`}
              >
                Link Check
              </button>
            </div>
            <div className="p-0">
              {activeTool === 'checker' && <AppChecker selectedDevice={selectedDevice} />}
              {activeTool === 'search' && <PhoneSearch />}
              {activeTool === 'adblock' && <AdBlockerInfo />}
              {activeTool === 'tips' && <PerformanceTips />}
              {activeTool === 'hsi' && <HSIGuide />}
              {activeTool === 'fbsafety' && <FBSafety />}
              {activeTool === 'linkcheck' && <LinkCheck />}
            </div>
          </div>
        </div>

        {/* Modern CTA Section - More Compact on Mobile */}
        <section className="mt-12 md:mt-20 relative overflow-hidden bg-primary text-white p-8 md:p-16 rounded-[2rem] md:rounded-[3rem] shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white blur-[120px] opacity-20 -mr-32 -mt-32"></div>
          <div className="relative z-10 text-center">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 text-white">Need more help?</h2>
            <p className="text-white/80 text-sm md:text-base mb-8 md:mb-10 max-w-xl mx-auto font-medium">
              Our printable guides are designed specifically for seniors who want a worry-free experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <Button variant="primary" className="!bg-white !text-primary !border-none !rounded-full px-8 md:px-10 py-4 md:py-5 text-sm md:text-base shadow-xl">
                Printable Guide
              </Button>
              <Button variant="secondary" className="!bg-white/10 !text-white !border-white/20 !rounded-full px-8 md:px-10 py-4 md:py-5 backdrop-blur-md text-sm md:text-base">
                Safe Games
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Modern Footer - Compact */}
      <footer className="bg-surface py-12 md:py-16 px-4 md:px-6 border-t border-border-main">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 md:mb-6">
              <div className="w-7 h-7 md:w-8 md:h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-xs md:text-sm">R</span>
              </div>
              <span className="text-base md:text-lg font-bold tracking-tight text-text-main">RescueKit</span>
            </div>
            <p className="text-text-muted max-w-xs text-sm font-medium">
              Dedicated to making technology accessible and safe for everyone, regardless of age.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 md:gap-8 text-[10px] md:text-sm font-bold uppercase tracking-widest text-text-muted">
            <button 
              onClick={() => setIsAboutOpen(true)}
              className="hover:text-primary transition-colors uppercase tracking-widest"
            >
              About
            </button>
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
            <a href="#" className="hover:text-primary transition-colors">Families</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
          </div>
        </div>
        <div className="max-w-5xl mx-auto mt-8 md:mt-12 pt-6 md:pt-8 border-t border-border-main text-center text-[8px] md:text-xs text-text-muted/40 font-bold uppercase tracking-[0.2em]">
          © 2024 Senior Android Rescue Kit • Handcrafted for you
        </div>
      </footer>

      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </div>
  );
};

export default App;
