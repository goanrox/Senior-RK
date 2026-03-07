
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { DeviceBrand } from './types';
import { DEVICE_INSTRUCTIONS } from './constants';
import Button from './components/Button';
import RescueGuide from './components/RescueGuideComponent';
import AppChecker from './components/AppChecker';
import AdBlockerInfo from './components/AdBlockerInfo';
import PerformanceTips from './components/PerformanceTips';
import AboutModal from './components/AboutModal';
import PhoneSearch from './components/PhoneSearch';
import HSIGuide from './components/HSIGuide';
import FBSafety from './components/FBSafety';
import LinkCheck from './components/LinkCheck';
import ScamAlerts from './components/ScamAlerts';
import SafeGames from './components/SafeGames';
import Deals from './components/Deals';
import Admin from './components/Admin';
import { hapticFeedback } from './utils/haptics';

const FeaturePage: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen text-text-main flex flex-col font-sans transition-colors duration-300 max-w-[430px] mx-auto w-full relative shadow-2xl" style={{ backgroundColor: '#F5EDD8' }}>
      <div className="py-4 px-4 flex items-center gap-4">
        <button onClick={() => navigate('/')} className="p-2 bg-[#C8D4A8] rounded-full shadow-sm text-[#3A4A2A] border border-[#7A8C5A]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
        </button>
      </div>
      <div className="px-6 pb-6 flex-grow">
        <h1 className="text-3xl font-black mb-6 text-[#4A4F3E]">{title}</h1>
        <div className="bg-surface rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.06)] border border-border-main overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};

const AppCheckerWrapper = () => {
  const location = useLocation();
  return <AppChecker selectedDevice={location.state?.selectedDevice || null} />;
};

const Home: React.FC = () => {
  const [selectedDevice, setSelectedDevice] = useState<DeviceBrand | null>(null);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isLargeText, setIsLargeText] = useState(false);
  const navigate = useNavigate();

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

  const handleToolChange = (tool: string) => {
    hapticFeedback.light();
    navigate(`/tool/${tool}`, { state: { selectedDevice } });
  };

  return (
    <div className="min-h-screen text-text-main flex flex-col font-sans transition-colors duration-300 max-w-[430px] mx-auto w-full relative shadow-2xl" style={{ backgroundColor: '#F5EDD8' }}>
      {/* Soft Top Bar */}
      <div className="bg-secondary border-b border-border-main py-4 px-4 sticky top-0 z-50 shadow-sm">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-primary rounded-lg md:rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="text-white font-black text-lg md:text-xl">R</span>
            </div>
            <span className="text-lg md:text-xl font-bold tracking-tight text-text-main">RescueKit</span>
          </div>
          
          <div className="flex items-center gap-2 md:gap-3">
            {/* Accessibility Controls */}
            <div className="flex bg-surface p-1 rounded-full gap-1 border border-border-main">
              <button 
                onClick={toggleLargeText}
                className={`px-3 py-1.5 rounded-full text-[10px] md:text-xs font-black transition-all ${
                  isLargeText ? 'bg-primary shadow-md text-white' : 'text-text-main hover:text-primary'
                }`}
                title="Toggle Large Text"
              >
                AA
              </button>
            </div>

            <div className="hidden sm:flex gap-4 md:gap-6 font-bold text-[10px] md:text-sm uppercase tracking-widest text-text-muted ml-2 md:ml-4">
              <a href="#" className="hover:text-primary transition-colors">Guide</a>
              <a href="#" className="hover:text-primary transition-colors">Security</a>
              <button 
                onClick={() => {
                  handleToolChange('deals');
                  document.getElementById('tool-tabs')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-primary transition-colors uppercase"
              >
                Deals
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 py-6 flex-grow w-full">
        {/* Hero Section - More Compact */}
        <header className="text-center mb-6 md:mb-10">
          <div className="inline-block px-4 py-1.5 bg-[#4A4F3E] text-white rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest mb-4 md:mb-6">
            Trusted by 50,000+ Seniors
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-4 md:mb-6 leading-tight tracking-tight text-[#4A4F3E]">
            Your Phone, <span className="text-[#8B6914]">Simplified.</span>
          </h1>
          <p className="text-base md:text-xl text-[#4A4F3E] mb-6 md:mb-8 max-w-2xl mx-auto font-medium leading-relaxed px-2">
            Stop annoying ads and speed up your device in minutes. 
            Choose your brand to begin.
          </p>

          {/* Mini Dashboard - Slimmer & Horizontal Scroll on Mobile */}
          <div className="flex overflow-x-auto pb-4 md:pb-0 md:flex-wrap justify-center gap-4 mb-8 md:mb-12 no-scrollbar">
            <div className="flex-shrink-0 flex items-center gap-2">
              <span className="text-text-main font-black text-2xl md:text-3xl">98%</span>
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-tight text-text-muted leading-tight text-left">Safety<br/>Secure</span>
            </div>
            <div className="w-px h-8 bg-[#4A4F3E]/20"></div>
            <div className="flex-shrink-0 flex items-center gap-2">
              <span className="text-text-main font-black text-2xl md:text-3xl">0</span>
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-tight text-text-muted leading-tight text-left">Threats<br/>Clean</span>
            </div>
            <div className="w-px h-8 bg-[#4A4F3E]/20"></div>
            <div className="flex-shrink-0 flex items-center gap-2">
              <span className="text-text-main font-black text-2xl md:text-3xl">2m</span>
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-tight text-text-muted leading-tight text-left">Fix Time<br/>Fast</span>
            </div>
          </div>
        </header>

        {/* Device Selector - Slimmer Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }} className="mb-8 md:mb-12 max-w-2xl mx-auto">
          {(Object.values(DeviceBrand)).map((brand) => (
            <button
              key={brand}
              onClick={() => handleDeviceSelect(brand)}
              className={`transition-all group ${
                selectedDevice === brand 
                ? 'opacity-80 scale-[1.02]' 
                : 'hover:opacity-90'
              }`}
              style={{
                height: '52px',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '15px',
                fontWeight: 700,
                letterSpacing: '0.05em',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                borderRadius: '50px',
                backgroundColor: '#C8D4A8',
                border: '2px solid #7A8C5A',
                color: '#3A4A2A'
              }}
            >
              {brand}
            </button>
          ))}
        </div>

        {/* Dynamic Rescue Content - Tightened spacing */}
        <div className="space-y-6 md:space-y-8">
          {selectedDevice && (
            <RescueGuide instruction={DEVICE_INSTRUCTIONS[selectedDevice]} />
          )}

          {/* Tool Tabs for Mobile Optimization */}
          <div id="tool-tabs" className="mb-8">
            <div className="grid grid-cols-2 gap-[12px] mb-8">
              <button 
                onClick={() => handleToolChange('checker')}
                className="transition-all shadow-md hover:opacity-90"
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  height: '80px',
                  width: '100%',
                  fontSize: '18px',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  textAlign: 'center',
                  backgroundColor: '#8B6914',
                  borderRadius: '16px',
                  whiteSpace: 'nowrap'
                }}
              >
                <span className="text-2xl">🔍</span>
                APP CHECKER
              </button>
              <button 
                onClick={() => handleToolChange('search')}
                className="transition-all shadow-md hover:opacity-90"
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  height: '80px',
                  width: '100%',
                  fontSize: '18px',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  textAlign: 'center',
                  backgroundColor: '#8B6914',
                  borderRadius: '16px',
                  whiteSpace: 'nowrap'
                }}
              >
                <span className="text-2xl">📱</span>
                PHONE SEARCH
              </button>
              <button 
                onClick={() => handleToolChange('deals')}
                className="transition-all shadow-md hover:opacity-90"
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  height: '80px',
                  width: '100%',
                  fontSize: '18px',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  textAlign: 'center',
                  backgroundColor: '#8B6914',
                  borderRadius: '16px',
                  whiteSpace: 'nowrap'
                }}
              >
                <span className="text-2xl">🏷️</span>
                DEALS
              </button>
              <button 
                onClick={() => handleToolChange('adblock')}
                className="transition-all shadow-md hover:opacity-90"
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  height: '80px',
                  width: '100%',
                  fontSize: '18px',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  textAlign: 'center',
                  backgroundColor: '#8B6914',
                  borderRadius: '16px',
                  whiteSpace: 'nowrap'
                }}
              >
                <span className="text-2xl">🚫</span>
                AD BLOCKER
              </button>
              <button 
                onClick={() => handleToolChange('tips')}
                className="transition-all shadow-md hover:opacity-90"
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  height: '80px',
                  width: '100%',
                  fontSize: '18px',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  textAlign: 'center',
                  backgroundColor: '#8B6914',
                  borderRadius: '16px',
                  whiteSpace: 'nowrap'
                }}
              >
                <span className="text-2xl">⚡</span>
                PERFORMANCE
              </button>
              <button 
                onClick={() => handleToolChange('fbsafety')}
                className="transition-all shadow-md hover:opacity-90"
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  height: '80px',
                  width: '100%',
                  fontSize: '18px',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  textAlign: 'center',
                  backgroundColor: '#8B6914',
                  borderRadius: '16px',
                  whiteSpace: 'nowrap'
                }}
              >
                <span className="text-2xl">🛡️</span>
                FB SAFETY
              </button>
              <button 
                onClick={() => handleToolChange('linkcheck')}
                className="transition-all shadow-md hover:opacity-90"
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  height: '80px',
                  width: '100%',
                  fontSize: '18px',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  textAlign: 'center',
                  backgroundColor: '#8B6914',
                  borderRadius: '16px',
                  whiteSpace: 'nowrap'
                }}
              >
                <span className="text-2xl">🔗</span>
                LINK CHECKER
              </button>
              <button 
                onClick={() => handleToolChange('scamalerts')}
                className="transition-all shadow-md hover:opacity-90"
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  height: '80px',
                  width: '100%',
                  fontSize: '18px',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  textAlign: 'center',
                  backgroundColor: '#8B6914',
                  borderRadius: '16px',
                  whiteSpace: 'nowrap'
                }}
              >
                <span className="text-2xl">⚠️</span>
                SCAM ALERTS
              </button>
              <button 
                onClick={() => handleToolChange('games')}
                className="col-span-2 transition-all shadow-md hover:opacity-90"
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  height: '80px',
                  width: '100%',
                  fontSize: '18px',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  textAlign: 'center',
                  backgroundColor: '#8B6914',
                  borderRadius: '16px',
                  whiteSpace: 'nowrap'
                }}
              >
                <span className="text-2xl">🎮</span>
                SAFE GAMES
              </button>
            </div>
          </div>
        </div>

        {/* Modern CTA Section - More Compact on Mobile */}
        <section className="mt-12 md:mt-20 relative overflow-hidden bg-primary text-white p-8 md:p-16 rounded-[2rem] md:rounded-[3rem] shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white blur-[120px] opacity-20 -mr-32 -mt-32"></div>
          <div className="relative z-10 text-center flex justify-center">
            <Button 
              variant="primary" 
              onClick={() => {
                if (window.confirm('This feature is coming soon! Would you like to be notified when it is available?')) {
                  // Do nothing for now
                }
              }}
              className="!bg-white !text-primary !border-none !rounded-full px-8 md:px-10 py-4 md:py-5 text-sm md:text-base shadow-xl font-bold uppercase"
            >
              COMING SOON
            </Button>
          </div>
        </section>
      </main>

      {/* Modern Footer - Compact */}
      <footer className="bg-secondary py-12 px-4 border-t border-border-main">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-6">
          <div>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-7 h-7 md:w-8 md:h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-xs md:text-sm">R</span>
              </div>
              <span className="text-base md:text-lg font-bold tracking-tight text-text-main">RescueKit</span>
            </div>
            <p className="text-[#4A4F3E] max-w-sm mx-auto text-sm font-medium">
              Dedicated to making technology accessible and safe for everyone, regardless of age.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-[10px] md:text-sm font-bold uppercase tracking-widest text-[#4A4F3E]">
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
        <div className="max-w-5xl mx-auto mt-8 md:mt-12 pt-6 md:pt-8 border-t border-[#4A4F3E]/20 text-center text-[8px] md:text-xs text-[#4A4F3E] font-bold uppercase tracking-[0.2em]">
          © 2024 SENIOR ANDROID RESCUE KIT • HANDCRAFTED FOR YOU
        </div>
      </footer>

      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/tool/checker" element={<FeaturePage title="App Checker"><AppCheckerWrapper /></FeaturePage>} />
        <Route path="/tool/search" element={<FeaturePage title="Phone Search"><PhoneSearch /></FeaturePage>} />
        <Route path="/tool/deals" element={<FeaturePage title="Deals"><Deals /></FeaturePage>} />
        <Route path="/tool/adblock" element={<FeaturePage title="Ad Blocker"><AdBlockerInfo /></FeaturePage>} />
        <Route path="/tool/tips" element={<FeaturePage title="Performance"><PerformanceTips /></FeaturePage>} />
        <Route path="/tool/fbsafety" element={<FeaturePage title="FB Safety"><FBSafety /></FeaturePage>} />
        <Route path="/tool/linkcheck" element={<FeaturePage title="Link Checker"><LinkCheck /></FeaturePage>} />
        <Route path="/tool/scamalerts" element={<FeaturePage title="Scam Alerts"><ScamAlerts /></FeaturePage>} />
        <Route path="/tool/games" element={<FeaturePage title="Safe Games"><SafeGames /></FeaturePage>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

