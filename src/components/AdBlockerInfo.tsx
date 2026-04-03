
import React from 'react';
import { Shield, CheckCircle2, Sparkles, Info, Zap, Lock } from 'lucide-react';

const AdBlockerInfo: React.FC = () => {
  return (
    <div className="p-6 md:p-10 space-y-10">
      <div className="space-y-4">
        <h2 className="text-2xl md:text-[32px] font-bold flex items-center gap-4 text-text-main">
          <div className="bg-primary text-white w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-2xl text-xl shadow-lg shadow-primary/20">
            <Shield size={28} />
          </div>
          What is an Ad Blocker?
        </h2>
        
        <p className="text-xl md:text-2xl font-medium leading-relaxed text-text-main">
          Think of an ad blocker like a <span className="text-primary font-bold">screen door</span> for your phone. 
          It lets the good stuff in, but keeps the "bugs" (annoying ads) out.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Why use one? */}
        <div className="card-premium p-8 bg-primary/5 border-primary/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Zap size={100} />
          </div>
          <h3 className="text-2xl font-bold mb-6 text-primary flex items-center gap-3">
            <Zap size={24} />
            Why use one?
          </h3>
          <ul className="space-y-6">
            <li className="flex items-start gap-4 group">
              <div className="w-6 h-6 bg-primary/20 text-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-primary group-hover:text-white transition-all">
                <CheckCircle2 size={16} />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-text-main">No more pop-ups</p>
                <p className="text-text-muted text-sm leading-relaxed">Stops windows that cover your screen while you're reading or browsing.</p>
              </div>
            </li>
            <li className="flex items-start gap-4 group">
              <div className="w-6 h-6 bg-primary/20 text-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-primary group-hover:text-white transition-all">
                <CheckCircle2 size={16} />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-text-main">Faster phone</p>
                <p className="text-text-muted text-sm leading-relaxed">Your phone doesn't have to work hard to load junk, making it feel smoother.</p>
              </div>
            </li>
            <li className="flex items-start gap-4 group">
              <div className="w-6 h-6 bg-primary/20 text-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-primary group-hover:text-white transition-all">
                <CheckCircle2 size={16} />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-text-main">Safer browsing</p>
                <p className="text-text-muted text-sm leading-relaxed">Blocks many fake "Download" or "Update" buttons that are actually scams.</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Why DNS? */}
        <div className="card-premium p-8 bg-accent/5 border-accent/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Sparkles size={100} />
          </div>
          <h3 className="text-2xl font-bold mb-6 text-accent flex items-center gap-3">
            <Sparkles size={24} />
            Why "dns.adguard.com"?
          </h3>
          <p className="text-lg text-text-muted mb-8 leading-relaxed font-medium">This acts as a smart filter for your entire phone.</p>
          <ul className="space-y-6">
            <li className="flex items-start gap-4 group">
              <div className="w-6 h-6 bg-accent/20 text-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-accent group-hover:text-white transition-all">
                <Lock size={16} />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-text-main">No app needed</p>
                <p className="text-text-muted text-sm leading-relaxed">Nothing new to download or install. It's built right into your phone's settings.</p>
              </div>
            </li>
            <li className="flex items-start gap-4 group">
              <div className="w-6 h-6 bg-accent/20 text-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-accent group-hover:text-white transition-all">
                <Sparkles size={16} />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-text-main">Works everywhere</p>
                <p className="text-text-muted text-sm leading-relaxed">Blocks ads in your web browser and even inside many games.</p>
              </div>
            </li>
            <li className="flex items-start gap-4 group">
              <div className="w-6 h-6 bg-accent/20 text-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-accent group-hover:text-white transition-all">
                <Info size={16} />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-text-main">It's completely free</p>
                <p className="text-text-muted text-sm leading-relaxed">A great service provided to everyone to help keep the internet clean.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdBlockerInfo;

