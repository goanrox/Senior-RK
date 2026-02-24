
import React from 'react';
import { DeviceInstruction } from '../types';

interface RescueGuideProps {
  instruction: DeviceInstruction;
}

const RescueGuide: React.FC<RescueGuideProps> = ({ instruction }) => {
  return (
    <div id="guide" className="bg-surface p-5 md:p-8 rounded-3xl shadow-xl shadow-cyan-900/5 mb-6 md:mb-8 border border-border-main animate-in fade-in slide-in-from-bottom-4 duration-700">
      <h2 className="text-xl md:text-2xl font-extrabold mb-5 md:mb-6 flex items-center gap-3 text-text-main">
        <div className="bg-primary text-white w-8 h-8 md:w-10 md:h-10 flex-shrink-0 flex items-center justify-center rounded-lg md:rounded-xl text-base md:text-lg shadow-lg shadow-primary/20">1</div>
        Stop the Ads on your {instruction.brand}
      </h2>
      
      <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
        {instruction.steps.map((step, idx) => (
          <div key={idx} className="flex gap-3 md:gap-4 items-start group">
            <div className="w-6 h-6 md:w-8 md:h-8 flex-shrink-0 bg-primary/10 text-primary rounded-md md:rounded-lg flex items-center justify-center font-black text-xs md:text-sm transition-colors group-hover:bg-primary group-hover:text-white">
              {idx + 1}
            </div>
            <p className="text-base md:text-lg leading-relaxed text-text-muted">
              {step.split('"').map((part, i) => i % 2 === 1 ? <strong key={i} className="text-primary font-extrabold">"{part}"</strong> : part)}
            </p>
          </div>
        ))}
      </div>

      {instruction.note && (
        <div className="bg-primary/10 p-3 md:p-4 rounded-xl md:rounded-2xl border border-primary/20 mb-6 md:mb-8">
          <p className="text-sm md:text-base font-semibold text-primary flex items-center gap-2">
            <span className="text-lg md:text-xl">💡</span>
            Tip: {instruction.note}
          </p>
        </div>
      )}

      <div className="h-px bg-gradient-to-r from-transparent via-border-main to-transparent mb-6 md:mb-8" />

      <h2 className="text-xl md:text-2xl font-extrabold mb-5 md:mb-6 flex items-center gap-3 text-text-main">
        <div className="bg-amber-500 text-white w-8 h-8 md:w-10 md:h-10 flex-shrink-0 flex items-center justify-center rounded-lg md:rounded-xl text-base md:text-lg shadow-lg shadow-amber-500/20">2</div>
        Delete the "Bad" Apps
      </h2>
      <p className="text-base md:text-lg text-text-muted mb-5 md:mb-6 leading-relaxed">Look for these apps on your screen. If you see them, press and hold your finger on them, then tap <strong className="text-text-main">Uninstall</strong>.</p>
      
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
        {['Any "Cleaner" app', 'Any "Battery Booster"', 'Any "Fast Charging" app', 'Multiple Weather apps', 'Aggressive Flashlight apps', 'Free Game apps you didn\'t install'].map((item, i) => (
          <li key={i} className="flex items-center gap-2 md:gap-3 p-3 md:p-4 bg-surface-muted rounded-xl md:rounded-2xl border border-border-main transition-all hover:bg-surface hover:shadow-md hover:shadow-cyan-900/5">
            <div className="w-5 h-5 md:w-6 md:h-6 bg-rose-500/10 text-rose-500 rounded-md flex items-center justify-center text-[9px] md:text-[10px]">✕</div>
            <span className="font-bold text-xs md:text-sm text-text-main">{item}</span>
          </li>
        ))}
      </ul>

      {instruction.safeModeSteps && (
        <>
          <div className="h-px bg-gradient-to-r from-transparent via-border-main to-transparent my-8" />
          
          <div className="bg-rose-500/10 p-6 rounded-2xl border border-rose-500/20 mb-8">
            <h3 className="text-xl font-extrabold text-rose-500 mb-2 flex items-center gap-2">
              <span>🚨</span> Ads Hijacking Your Screen?
            </h3>
            <p className="text-rose-500/80 text-sm">If ads keep popping up and you can't even use your phone, follow these steps to use "Safe Mode".</p>
          </div>

          <div className="space-y-8">
            <div>
              <h4 className="text-lg font-bold text-text-main mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-rose-500 text-white rounded-full flex items-center justify-center text-xs">A</span>
                Enter Safe Mode
              </h4>
              <div className="space-y-3 ml-8">
                {instruction.safeModeSteps.enter.map((step, i) => (
                  <p key={i} className="text-text-muted text-base leading-relaxed">• {step}</p>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold text-text-main mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-rose-500 text-white rounded-full flex items-center justify-center text-xs">B</span>
                Uninstall Malicious Apps
              </h4>
              <div className="space-y-3 ml-8">
                {instruction.safeModeSteps.uninstall.map((step, i) => (
                  <p key={i} className="text-text-muted text-base leading-relaxed">• {step}</p>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold text-text-main mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-rose-500 text-white rounded-full flex items-center justify-center text-xs">C</span>
                Exit Safe Mode
              </h4>
              <div className="space-y-3 ml-8">
                {instruction.safeModeSteps.exit.map((step, i) => (
                  <p key={i} className="text-text-muted text-base leading-relaxed">• {step}</p>
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
