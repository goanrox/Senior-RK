
import React from 'react';

const AdBlockerInfo: React.FC = () => {
  return (
    <div className="p-5 md:p-8">
      <h2 className="text-xl md:text-2xl font-extrabold mb-5 md:mb-6 flex items-center gap-3 text-text-main">
        <div className="bg-emerald-500 text-white w-8 h-8 md:w-10 md:h-10 flex-shrink-0 flex items-center justify-center rounded-lg md:rounded-xl text-base md:text-lg shadow-lg shadow-emerald-500/20">🛡️</div>
        What is an Ad Blocker?
      </h2>
      
      <div className="space-y-5 md:space-y-6 text-sm md:text-base text-text-muted">
        <p className="text-base md:text-lg font-medium leading-relaxed text-text-main">
          Think of an ad blocker like a <span className="text-emerald-500 font-extrabold">screen door</span> for your phone. 
          It lets the good stuff in, but keeps the "bugs" (annoying ads) out.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-6 md:mt-8">
          <div className="bg-emerald-500/10 p-4 md:p-6 rounded-xl md:rounded-2xl border border-emerald-500/20">
            <h3 className="text-lg md:text-xl font-extrabold mb-3 md:mb-4 text-emerald-500">Why use one?</h3>
            <ul className="space-y-2 md:space-y-3">
              <li className="flex items-start gap-2 md:gap-3">
                <div className="w-4 h-4 md:w-5 md:h-5 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center text-[9px] md:text-[10px] mt-0.5 md:mt-1">✓</div>
                <span className="text-xs md:text-sm"><strong className="text-text-main">No pop-ups:</strong> Stops windows that cover your screen.</span>
              </li>
              <li className="flex items-start gap-2 md:gap-3">
                <div className="w-4 h-4 md:w-5 md:h-5 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center text-[9px] md:text-[10px] mt-0.5 md:mt-1">✓</div>
                <span className="text-xs md:text-sm"><strong className="text-text-main">Faster Phone:</strong> Phone doesn't work hard to load junk.</span>
              </li>
              <li className="flex items-start gap-2 md:gap-3">
                <div className="w-4 h-4 md:w-5 md:h-5 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center text-[9px] md:text-[10px] mt-0.5 md:mt-1">✓</div>
                <span className="text-xs md:text-sm"><strong className="text-text-main">Safer:</strong> Blocks many scam buttons.</span>
              </li>
            </ul>
          </div>

          <div className="bg-primary/10 p-4 md:p-6 rounded-xl md:rounded-2xl border border-primary/20">
            <h3 className="text-lg md:text-xl font-extrabold mb-3 md:mb-4 text-primary">Why "dns.adguard.com"?</h3>
            <p className="text-xs md:text-sm mb-3 md:mb-4 leading-relaxed text-text-muted">This acts as a filter for your entire phone.</p>
            <ul className="space-y-2 md:space-y-3">
              <li className="flex items-start gap-2 md:gap-3">
                <div className="w-4 h-4 md:w-5 md:h-5 bg-primary/20 text-primary rounded-full flex items-center justify-center text-[9px] md:text-[10px] mt-0.5 md:mt-1">✨</div>
                <span className="text-xs md:text-sm"><strong className="text-text-main">No App Needed:</strong> Nothing new to download.</span>
              </li>
              <li className="flex items-start gap-2 md:gap-3">
                <div className="w-4 h-4 md:w-5 md:h-5 bg-primary/20 text-primary rounded-full flex items-center justify-center text-[9px] md:text-[10px] mt-0.5 md:mt-1">✨</div>
                <span className="text-xs md:text-sm"><strong className="text-text-main">Works Everywhere:</strong> Blocks ads in games too.</span>
              </li>
              <li className="flex items-start gap-2 md:gap-3">
                <div className="w-4 h-4 md:w-5 md:h-5 bg-primary/20 text-primary rounded-full flex items-center justify-center text-[9px] md:text-[10px] mt-0.5 md:mt-1">✨</div>
                <span className="text-xs md:text-sm"><strong className="text-text-main">It's Free:</strong> A great service for everyone.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdBlockerInfo;
