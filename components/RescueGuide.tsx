
import React from 'react';
import { DeviceInstruction } from '../types';

interface RescueGuideProps {
  instruction: DeviceInstruction;
}

const RescueGuide: React.FC<RescueGuideProps> = ({ instruction }) => {
  return (
    <div id="guide" className="bg-white p-6 md:p-10 rounded-[2rem] shadow-[0_4px_12px_rgba(0,0,0,0.06)] mb-8 md:mb-12 border border-border-main animate-in fade-in slide-in-from-bottom-4 duration-700">
      <h2 className="text-2xl md:text-[28px] font-bold mb-6 md:mb-8 flex items-center gap-4 text-text-main">
        <div className="bg-primary text-white w-10 h-10 md:w-12 md:h-12 flex-shrink-0 flex items-center justify-center rounded-2xl text-lg md:text-xl shadow-lg shadow-primary/20">1</div>
        Stop the Ads on your {instruction.brand}
      </h2>
      
      <div className="space-y-4 md:space-y-5 mb-8 md:mb-10">
        {instruction.steps.map((step, idx) => (
          <div key={idx} className="flex gap-4 md:gap-5 items-start group">
            <div className="w-7 h-7 md:w-8 md:h-8 flex-shrink-0 bg-primary/10 text-primary rounded-xl flex items-center justify-center font-black text-xs md:text-sm transition-colors group-hover:bg-primary group-hover:text-white shadow-sm">
              {idx + 1}
            </div>
            <p className="text-base md:text-lg leading-relaxed text-text-muted font-medium">
              {step.split('"').map((part, i) => i % 2 === 1 ? <strong key={i} className="text-primary font-black">"{part}"</strong> : part)}
            </p>
          </div>
        ))}
      </div>

      {instruction.note && (
        <div className="bg-[#D6D0F5]/30 p-4 md:p-6 rounded-2xl border border-border-main mb-8 md:mb-10 shadow-sm">
          <p className="text-sm md:text-base font-bold text-primary flex items-center gap-3">
            <span className="text-xl md:text-2xl">💡</span>
            Tip: {instruction.note}
          </p>
        </div>
      )}

      <div className="h-px bg-border-main mb-8 md:mb-10" />

      <h2 className="text-2xl md:text-[28px] font-bold mb-6 md:mb-8 flex items-center gap-4 text-text-main">
        <div className="bg-secondary text-white w-10 h-10 md:w-12 md:h-12 flex-shrink-0 flex items-center justify-center rounded-2xl text-lg md:text-xl shadow-lg shadow-secondary/20">2</div>
        Delete the "Bad" Apps
      </h2>
      <p className="text-base md:text-lg text-text-muted mb-6 md:mb-8 leading-relaxed font-medium">Look for these apps on your screen. If you see them, press and hold your finger on them, then tap <strong className="text-text-main">Uninstall</strong>.</p>
      
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
        {['Any "Cleaner" app', 'Any "Battery Booster"', 'Any "Fast Charging" app', 'Multiple Weather apps', 'Aggressive Flashlight apps', 'Free Game apps you didn\'t install'].map((item, i) => (
          <li key={i} className="flex items-center gap-3 md:gap-4 p-4 md:p-5 bg-white rounded-2xl border border-border-main transition-all hover:bg-bg-main shadow-sm">
            <div className="w-6 h-6 md:w-7 md:h-7 bg-destructive/10 text-destructive rounded-full flex items-center justify-center text-[10px] md:text-[11px] font-black">✕</div>
            <span className="font-bold text-sm md:text-base text-text-main">{item}</span>
          </li>
        ))}
      </ul>

      {instruction.safeModeSteps && (
        <>
          <div className="h-px bg-border-main my-10 md:my-12" />
          
          <div className="bg-destructive/10 p-6 md:p-8 rounded-[2rem] border border-destructive/20 mb-8 md:mb-10 shadow-sm">
            <h3 className="text-xl md:text-2xl font-bold text-destructive mb-3 flex items-center gap-3">
              <span>🚨</span> Ads Hijacking Your Screen?
            </h3>
            <p className="text-destructive/80 text-sm md:text-base font-medium">If ads keep popping up and you can't even use your phone, follow these steps to use "Safe Mode".</p>
          </div>

          <div className="space-y-10 md:space-y-12">
            <div>
              <h4 className="text-lg md:text-xl font-bold text-text-main mb-5 flex items-center gap-3">
                <span className="w-8 h-8 bg-destructive text-white rounded-full flex items-center justify-center text-sm font-black shadow-md">A</span>
                Enter Safe Mode
              </h4>
              <div className="space-y-4 ml-11">
                {instruction.safeModeSteps.enter.map((step, i) => (
                  <p key={i} className="text-text-muted text-base md:text-lg leading-relaxed font-medium">• {step}</p>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg md:text-xl font-bold text-text-main mb-5 flex items-center gap-3">
                <span className="w-8 h-8 bg-destructive text-white rounded-full flex items-center justify-center text-sm font-black shadow-md">B</span>
                Uninstall Malicious Apps
              </h4>
              <div className="space-y-4 ml-11">
                {instruction.safeModeSteps.uninstall.map((step, i) => (
                  <p key={i} className="text-text-muted text-base md:text-lg leading-relaxed font-medium">• {step}</p>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg md:text-xl font-bold text-text-main mb-5 flex items-center gap-3">
                <span className="w-8 h-8 bg-destructive text-white rounded-full flex items-center justify-center text-sm font-black shadow-md">C</span>
                Exit Safe Mode
              </h4>
              <div className="space-y-4 ml-11">
                {instruction.safeModeSteps.exit.map((step, i) => (
                  <p key={i} className="text-text-muted text-base md:text-lg leading-relaxed font-medium">• {step}</p>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RescueGuide;
