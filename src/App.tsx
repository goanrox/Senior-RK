
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { 
  Home as HomeIcon, 
  ShieldCheck, 
  Smartphone, 
  HelpCircle, 
  ChevronLeft, 
  ChevronRight,
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  Zap, 
  Tag, 
  Ban, 
  Link as LinkIcon, 
  Gamepad2, 
  Info,
  ArrowRight,
  ShieldAlert,
  Settings,
  Bell,
  User,
  Shield
} from 'lucide-react';
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
import { Toaster } from 'sonner';
import { hapticFeedback } from './utils/haptics';

const FeaturePage: React.FC<{ title: string; children: React.ReactNode; backPath?: string }> = ({ title, children, backPath = '/' }) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-bg-main text-text-main flex flex-col font-sans transition-colors duration-300 max-w-[430px] mx-auto w-full relative pb-safe-bottom overflow-x-hidden">
      <div className="sticky top-0 z-50 glass-effect px-6 py-4 flex items-center gap-4">
        <button 
          onClick={() => navigate(backPath)} 
          className="p-3 bg-white/80 rounded-2xl shadow-sm text-primary border border-border-main active:scale-95 transition-all flex items-center justify-center"
        >
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-xl font-bold text-text-main truncate">{title}</h1>
      </div>
      <div className="px-6 py-6 flex-grow pb-32">
        <div className="card-premium overflow-hidden h-full">
          {children}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navItems = [
    { icon: HomeIcon, label: 'Home', path: '/' },
    { icon: ShieldCheck, label: 'Safety', path: '/safety' },
    { icon: Smartphone, label: 'Phone', path: '/phone' },
    { icon: HelpCircle, label: 'Help', path: '/help' },
  ];

  return (
    <nav className="bottom-nav fixed bottom-0 left-0 right-0 w-full glass-effect border-t border-border-main py-3 pb-safe-bottom flex justify-between items-center z-50 rounded-t-[32px] overflow-hidden max-w-full">
      {navItems.map((item, index) => {
        const isActive = location.pathname === item.path;
        return (
          <button
            key={index}
            onClick={() => {
              hapticFeedback.light();
              navigate(item.path);
            }}
            className={`flex-1 flex flex-col items-center justify-center gap-1 transition-all duration-300 ${
              isActive ? 'text-primary scale-110' : 'text-text-muted opacity-60'
            }`}
          >
            <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-bold uppercase tracking-wider text-center">{item.label}</span>
            {isActive && (
              <div className="w-1 h-1 bg-primary rounded-full mt-0.5" />
            )}
          </button>
        );
      })}
    </nav>
  );
};

const PageLayout: React.FC<{ children: React.ReactNode; title: string; showHeader?: boolean }> = ({ children, title, showHeader = true }) => {
  const [isLargeText, setIsLargeText] = useState(false);

  useEffect(() => {
    if (isLargeText) {
      document.documentElement.classList.add('large-text');
    } else {
      document.documentElement.classList.remove('large-text');
    }
  }, [isLargeText]);

  const toggleLargeText = () => {
    hapticFeedback.light();
    setIsLargeText(!isLargeText);
  };

  return (
    <div className="min-h-screen bg-bg-main text-text-main flex flex-col font-sans transition-colors duration-300 max-w-[430px] mx-auto w-full relative pb-safe-bottom overflow-x-hidden">
      {showHeader && (
        <header className="sticky top-0 z-50 glass-effect px-6 py-5 flex justify-between items-center rounded-b-[32px]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="text-white font-black text-xl">R</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-text-main">{title}</span>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleLargeText}
              className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold transition-all border ${
                isLargeText ? 'bg-primary border-primary text-white shadow-md' : 'bg-white/50 border-border-main text-text-main'
              }`}
              title="Toggle Large Text"
            >
              AA
            </button>
          </div>
        </header>
      )}
      <main className="px-6 py-8 flex-grow w-full space-y-8 animate-in fade-in duration-500 pb-32">
        {children}
      </main>
      <BottomNav />
    </div>
  );
};

const ToolButton: React.FC<{ onClick: () => void; icon: any; label: string; description?: string; color: string }> = ({ onClick, icon: Icon, label, description, color }) => (
  <button 
    onClick={onClick}
    className="w-full card-premium p-5 flex items-center gap-5 active:scale-[0.98] transition-all group text-left"
  >
    <div className={`p-4 rounded-2xl ${color} shadow-sm`}>
      <Icon size={28} />
    </div>
    <div className="flex-1">
      <h3 className="font-bold text-lg text-text-main group-hover:text-primary transition-colors">{label}</h3>
      {description && <p className="text-sm text-text-muted leading-tight">{description}</p>}
    </div>
    <ChevronRight className="text-text-subtle group-hover:translate-x-1 transition-transform" size={20} />
  </button>
);

const HomeView: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <PageLayout title="RescueKit">
      {/* Reassurance Status Card */}
      <section className="card-premium p-6 bg-primary-glow border-primary-light/50">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-primary-light rounded-2xl text-primary flex-shrink-0">
            <ShieldCheck size={32} />
          </div>
          <div>
            <h2 className="text-xl font-bold leading-tight">Let’s check your phone together.</h2>
            <p className="text-sm text-text-muted mt-1">We’ll help you safely find and fix common issues.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 pt-6 border-t border-border-main">
          <div className="text-center">
            <div className="text-xl font-bold text-primary">98%</div>
            <div className="text-[9px] font-bold uppercase tracking-wider text-text-subtle">Safety score</div>
          </div>
          <div className="text-center border-x border-border-main">
            <div className="text-xl font-bold text-primary">0</div>
            <div className="text-[9px] font-bold uppercase tracking-wider text-text-subtle">Issues</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-primary">2m</div>
            <div className="text-[9px] font-bold uppercase tracking-wider text-text-subtle">Check time</div>
          </div>
        </div>
      </section>

      {/* Primary Action Callout - Guided Feel */}
      <section className="py-2 space-y-4">
        <h2 className="text-lg font-bold px-1">Recommended for you</h2>
        <div className="card-premium bg-white p-6 shadow-lg border border-border-main rounded-[24px] opacity-100">
          <div className="flex items-start gap-5 mb-6">
            <div className="p-4 bg-accent-tint rounded-3xl flex-shrink-0 text-accent">
              <ShieldAlert size={32} />
            </div>
            <div className="text-left">
              <h3 className="text-xl font-bold text-text-main">Phone safety check</h3>
              <p className="text-text-muted text-sm mt-1 leading-relaxed">We'll look for anything that needs attention and help you fix it safely.</p>
            </div>
          </div>
          <button 
            onClick={() => {
              hapticFeedback.medium();
              navigate('/tool/checker');
            }}
            className="w-full bg-accent text-text-main rounded-2xl py-4 font-bold shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-3"
          >
            Start quick phone check
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Minimal Quick Actions */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-lg font-bold">Quick tools</h2>
          <button onClick={() => navigate('/phone')} className="text-xs font-bold text-primary uppercase tracking-wider">View all</button>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <ToolButton 
            onClick={() => navigate('/tool/search')}
            icon={Smartphone}
            label="Phone search"
            description="Identify your device model"
            color="bg-primary-light text-primary"
          />
        </div>
      </section>

      <footer className="text-center pt-8 pb-4">
        <div className="text-[10px] text-text-muted/40 font-bold uppercase tracking-[0.2em]">
          © 2024 RESCUEKIT • FOR SENIORS
        </div>
      </footer>
    </PageLayout>
  );
};

const SafetyView: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <PageLayout title="Safety">
      <section className="space-y-6">
        <div className="px-1">
          <h2 className="text-lg font-bold">Security tools</h2>
          <p className="text-sm text-text-muted mt-1">Keep your personal information safe and secure.</p>
        </div>
        <div className="space-y-4">
          <ToolButton 
            onClick={() => navigate('/tool/checker')}
            icon={ShieldAlert}
            label="App checker"
            description="Identify risky or fake apps"
            color="bg-red-50 text-red-600"
          />
          <ToolButton 
            onClick={() => navigate('/tool/linkcheck')}
            icon={LinkIcon}
            label="Link checker"
            description="Verify suspicious website links"
            color="bg-primary-light text-primary"
          />
          <ToolButton 
            onClick={() => navigate('/tool/scamalerts')}
            icon={AlertTriangle}
            label="Scam alerts"
            description="Latest phone and online scams"
            color="bg-orange-50 text-orange-600"
          />
          <ToolButton 
            onClick={() => navigate('/tool/fbsafety')}
            icon={ShieldCheck}
            label="FB safety"
            description="Secure your Facebook account"
            color="bg-blue-50 text-blue-600"
          />
        </div>
      </section>
    </PageLayout>
  );
};

const PhoneView: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <PageLayout title="Phone">
      <section className="space-y-6">
        <div className="px-1">
          <h2 className="text-lg font-bold">Device tools</h2>
          <p className="text-sm text-text-muted mt-1">Optimize your device performance and find the best deals.</p>
        </div>
        <div className="space-y-4">
          <ToolButton 
            onClick={() => navigate('/tool/search')}
            icon={Smartphone}
            label="Phone search"
            description="Identify your device model"
            color="bg-primary-light text-primary"
          />
          <ToolButton 
            onClick={() => navigate('/tool/tips')}
            icon={Zap}
            label="Performance"
            description="Clean up and speed up"
            color="bg-purple-50 text-purple-600"
          />
          <ToolButton 
            onClick={() => navigate('/tool/adblock')}
            icon={Ban}
            label="Ad blocker"
            description="Stop annoying pop-ups"
            color="bg-red-50 text-red-600"
          />
          <ToolButton 
            onClick={() => navigate('/tool/deals')}
            icon={Tag}
            label="Deals"
            description="Exclusive senior discounts"
            color="bg-accent-tint text-accent"
          />
        </div>
      </section>
    </PageLayout>
  );
};

const HelpView: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDevice, setSelectedDevice] = useState<DeviceBrand | null>(null);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const handleDeviceSelect = (brand: DeviceBrand) => {
    hapticFeedback.medium();
    setSelectedDevice(brand);
    setTimeout(() => {
      document.getElementById('guide')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <PageLayout title="Help">
      <section className="space-y-10">
        {/* Device Selection */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-1">
            <div>
              <h2 className="text-lg font-bold">Device help</h2>
              <p className="text-sm text-text-muted mt-1">Select your phone brand to get started.</p>
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary-light px-3 py-1 rounded-full">Step 1</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {(Object.values(DeviceBrand)).map((brand) => (
              <button
                key={brand}
                onClick={() => handleDeviceSelect(brand)}
                className={`btn-tactile h-20 text-base font-bold transition-all ${
                  selectedDevice === brand 
                  ? 'bg-primary text-white border-primary shadow-lg shadow-primary/10 scale-[1.02]' 
                  : 'bg-white border border-border-main text-text-main hover:border-primary/30'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>

        {/* Rescue Content */}
        {selectedDevice && (
          <div id="guide" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between px-1 mb-6">
              <h2 className="text-lg font-bold">Instructions</h2>
              <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary-light px-3 py-1 rounded-full">Step 2</span>
            </div>
            <div className="card-premium p-1">
              <RescueGuide instruction={DEVICE_INSTRUCTIONS[selectedDevice]} />
            </div>
          </div>
        )}

        {/* Other Help Items */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold px-1">Support & Fun</h2>
          <div className="space-y-4">
            <ToolButton 
              onClick={() => navigate('/tool/games')}
              icon={Gamepad2}
              label="Safe games"
              description="Play without risk"
              color="bg-pink-50 text-pink-600"
            />
            <ToolButton 
              onClick={() => setIsAboutOpen(true)}
              icon={Info}
              label="About RescueKit"
              description="Learn about our mission"
              color="bg-slate-100 text-slate-600"
            />
          </div>
        </div>

        {/* Coming Soon Section */}
        <section className="py-12 flex flex-col items-center justify-center space-y-4 border-t border-border-main/30">
          <div className="w-12 h-1 bg-primary-light rounded-full"></div>
          <div className="px-6 py-2 bg-bg-secondary text-text-subtle rounded-full font-black text-[10px] uppercase tracking-[0.3em] border border-border-main/50 shadow-sm">
            COMING SOON
          </div>
          <p className="text-[10px] font-bold text-text-subtle uppercase tracking-widest text-center">More tools in development</p>
        </section>
      </section>
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </PageLayout>
  );
};

const AppCheckerWrapper = () => {
  const location = useLocation();
  return <AppChecker selectedDevice={location.state?.selectedDevice || null} />;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Toaster position="top-center" richColors />
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/safety" element={<SafetyView />} />
        <Route path="/phone" element={<PhoneView />} />
        <Route path="/help" element={<HelpView />} />
        
        <Route path="/admin" element={<Admin />} />
        
        <Route path="/tool/checker" element={<FeaturePage title="App Checker" backPath="/safety"><AppCheckerWrapper /></FeaturePage>} />
        <Route path="/tool/search" element={<FeaturePage title="Phone Search" backPath="/phone"><PhoneSearch /></FeaturePage>} />
        <Route path="/tool/deals" element={<FeaturePage title="Deals" backPath="/phone"><Deals /></FeaturePage>} />
        <Route path="/tool/adblock" element={<FeaturePage title="Ad Blocker" backPath="/phone"><AdBlockerInfo /></FeaturePage>} />
        <Route path="/tool/tips" element={<FeaturePage title="Performance" backPath="/phone"><PerformanceTips /></FeaturePage>} />
        <Route path="/tool/fbsafety" element={<FeaturePage title="FB Safety" backPath="/safety"><FBSafety /></FeaturePage>} />
        <Route path="/tool/linkcheck" element={<FeaturePage title="Link Checker" backPath="/safety"><LinkCheck /></FeaturePage>} />
        <Route path="/tool/scamalerts" element={<FeaturePage title="Scam Alerts" backPath="/safety"><ScamAlerts /></FeaturePage>} />
        <Route path="/tool/games" element={<FeaturePage title="Safe Games" backPath="/help"><SafeGames /></FeaturePage>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;


