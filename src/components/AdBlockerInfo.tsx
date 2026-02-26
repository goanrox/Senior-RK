
import React from 'react';

const AdBlockerInfo: React.FC = () => {
  return (
    <div className="p-6 md:p-10">
      <h2 className="text-2xl md:text-[28px] font-bold mb-6 md:mb-8 flex items-center gap-4 text-text-main">
        <div className="bg-primary text-white w-10 h-10 md:w-12 md:h-12 flex-shrink-0 flex items-center justify-center rounded-2xl text-lg md:text-xl shadow-lg shadow-primary/20">🛡️</div>
        What is an Ad Blocker?
      </h2>
      
      <div className="space-y-6 md:space-y-8 text-sm md:text-base text-text-muted font-medium">
        <p className="text-lg md:text-xl font-bold leading-relaxed text-text-main">
          Think of an ad blocker like a <span className="text-primary font-black">screen door</span> for your phone. 
          It lets the good stuff in, but keeps the "bugs" (annoying ads) out.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-8 md:mt-10">
          <div className="bg-[#D6D0F5]/30 p-6 md:p-8 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.06)] border border-border-main">
            <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-primary">Why use one?</h3>
            <ul className="space-y-3 md:space-y-4">
              <li className="flex items-start gap-3 md:gap-4">
                <div className="w-5 h-5 md:w-6 md:h-6 bg-primary/20 text-primary rounded-full flex items-center justify-center text-[10px] md:text-[11px] mt-0.5 md:mt-1">✓</div>
                <span className="text-sm md:text-base font-medium"><strong className="text-text-main">No pop-ups:</strong> Stops windows that cover your screen.</span>
              </li>
              <li className="flex items-start gap-3 md:gap-4">
                <div className="w-5 h-5 md:w-6 md:h-6 bg-primary/20 text-primary rounded-full flex items-center justify-center text-[10px] md:text-[11px] mt-0.5 md:mt-1">✓</div>
                <span className="text-sm md:text-base font-medium"><strong className="text-text-main">Faster Phone:</strong> Phone doesn't work hard to load junk.</span>
              </li>
              <li className="flex items-start gap-3 md:gap-4">
                <div className="w-5 h-5 md:w-6 md:h-6 bg-primary/20 text-primary rounded-full flex items-center justify-center text-[10px] md:text-[11px] mt-0.5 md:mt-1">✓</div>
                <span className="text-sm md:text-base font-medium"><strong className="text-text-main">Safer:</strong> Blocks many scam buttons.</span>
              </li>
            </ul>
          </div>

          <div className="bg-[#FAD4C0]/30 p-6 md:p-8 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.06)] border border-border-main">
            <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-secondary-dark">Why "dns.adguard.com"?</h3>
            <p className="text-sm md:text-base mb-4 md:mb-6 leading-relaxed text-text-muted font-medium">This acts as a filter for your entire phone.</p>
            <ul className="space-y-3 md:space-y-4">
              <li className="flex items-start gap-3 md:gap-4">
                <div className="w-5 h-5 md:w-6 md:h-6 bg-secondary/20 text-secondary-dark rounded-full flex items-center justify-center text-[10px] md:text-[11px] mt-0.5 md:mt-1">✨</div>
                <span className="text-sm md:text-base font-medium"><strong className="text-text-main">No App Needed:</strong> Nothing new to download.</span>
              </li>
              <li className="flex items-start gap-3 md:gap-4">
                <div className="w-5 h-5 md:w-6 md:h-6 bg-secondary/20 text-secondary-dark rounded-full flex items-center justify-center text-[10px] md:text-[11px] mt-0.5 md:mt-1">✨</div>
                <span className="text-sm md:text-base font-medium"><strong className="text-text-main">Works Everywhere:</strong> Blocks ads in games too.</span>
              </li>
              <li className="flex items-start gap-3 md:gap-4">
                <div className="w-5 h-5 md:w-6 md:h-6 bg-secondary/20 text-secondary-dark rounded-full flex items-center justify-center text-[10px] md:text-[11px] mt-0.5 md:mt-1">✨</div>
                <span className="text-sm md:text-base font-medium"><strong className="text-text-main">It's Free:</strong> A great service for everyone.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdBlockerInfo;

