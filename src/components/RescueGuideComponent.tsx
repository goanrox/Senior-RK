import React from 'react';
import { DeviceInstruction } from '../types';
import { 
  ShieldCheck, 
  Trash2, 
  AlertCircle, 
  Lightbulb, 
  ChevronRight,
  ShieldAlert,
  Power,
  Smartphone
} from 'lucide-react';

interface RescueGuideProps {
  instruction: DeviceInstruction;
}

const RescueGuide: React.FC<RescueGuideProps> = ({ instruction }) => {
  return (
    <div id="guide" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Step 1: Stop Ads */}
      <div className="card-premium p-6 md:p-10 bg-white border border-border-main shadow-sm overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-5">
          <ShieldCheck size={120} />
        </div>
        
        <h2 className="text-2xl md:text-[28px] font-bold mb-8 flex items-center gap-4 text-text-main relative z-10">
          <div className="bg-primary text-white w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-2xl text-xl shadow-lg shadow-primary/20">1</div>
          Stop the Ads on your {instruction.brand}
        </h2>
        
        <div className="space-y-6 mb-10 relative z-10">
          {instruction.steps.map((step, idx) => (
            <div key={idx} className="flex gap-5 items-start group">
              <div className="w-8 h-8 flex-shrink-0 bg-primary/10 text-primary rounded-xl flex items-center justify-center font-black text-sm transition-all group-hover:bg-primary group-hover:text-white shadow-sm">
                {idx + 1}
              </div>
              <p className="text-lg leading-relaxed text-text-muted font-medium flex-1">
                {step.split('"').map((part, i) => i % 2 === 1 ? <strong key={i} className="text-primary font-black">"{part}"</strong> : part)}
              </p>
            </div>
          ))}
        </div>

        {instruction.note && (
          <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 mb-8 shadow-sm flex items-start gap-4">
            <div className="p-2 bg-primary/10 rounded-xl text-primary">
              <Lightbulb size={24} />
            </div>
            <p className="text-base font-medium text-text-main leading-relaxed">
              <span className="font-bold text-primary block mb-1">Expert Tip:</span>
              {instruction.note}
            </p>
          </div>
        )}
      </div>

      {/* Step 2: Delete Bad Apps */}
      <div className="card-premium p-6 md:p-10 bg-white border border-border-main shadow-sm overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-5">
          <Trash2 size={120} />
        </div>

        <h2 className="text-2xl md:text-[28px] font-bold mb-8 flex items-center gap-4 text-text-main relative z-10">
          <div className="bg-secondary text-white w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-2xl text-xl shadow-lg shadow-secondary/20">2</div>
          Delete the "Bad" Apps
        </h2>
        
        <p className="text-lg text-text-muted mb-8 leading-relaxed font-medium relative z-10">
          Look for these apps on your screen. If you see them, press and hold your finger on them, then tap <strong className="text-text-main">Uninstall</strong>.
        </p>
        
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
          {[
            'Any "Cleaner" app', 
            'Any "Battery Booster"', 
            'Any "Fast Charging" app', 
            'Multiple Weather apps', 
            'Aggressive Flashlight apps', 
            'Free Game apps you didn\'t install'
          ].map((item, i) => (
            <li key={i} className="flex items-center gap-4 p-5 bg-bg-main/50 rounded-2xl border border-border-main transition-all hover:bg-white hover:shadow-md group">
              <div className="w-8 h-8 bg-destructive/10 text-destructive rounded-full flex items-center justify-center group-hover:bg-destructive group-hover:text-white transition-all">
                <AlertCircle size={18} />
              </div>
              <span className="font-bold text-base text-text-main">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Safe Mode Section */}
      {instruction.safeModeSteps && (
        <div className="card-premium p-6 md:p-10 bg-white border border-border-main shadow-sm overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <ShieldAlert size={120} />
          </div>

          <div className="bg-destructive/5 p-8 rounded-[2rem] border border-destructive/10 mb-10 shadow-sm relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-destructive/10 rounded-2xl text-destructive">
                <ShieldAlert size={32} />
              </div>
              <h3 className="text-2xl font-bold text-destructive">Ads Hijacking Your Screen?</h3>
            </div>
            <p className="text-destructive/80 text-lg font-medium leading-relaxed">
              If ads keep popping up and you can't even use your phone, follow these steps to use "Safe Mode".
            </p>
          </div>

          <div className="space-y-12 relative z-10">
            <SafeModeStep 
              letter="A" 
              title="Enter Safe Mode" 
              steps={instruction.safeModeSteps.enter} 
              icon={Power}
            />
            <SafeModeStep 
              letter="B" 
              title="Uninstall Malicious Apps" 
              steps={instruction.safeModeSteps.uninstall} 
              icon={Smartphone}
            />
            <SafeModeStep 
              letter="C" 
              title="Exit Safe Mode" 
              steps={instruction.safeModeSteps.exit} 
              icon={ChevronRight}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const SafeModeStep: React.FC<{ letter: string; title: string; steps: string[]; icon: any }> = ({ letter, title, steps, icon: Icon }) => (
  <div className="group">
    <div className="flex items-center gap-4 mb-6">
      <div className="w-10 h-10 bg-destructive text-white rounded-2xl flex items-center justify-center text-lg font-black shadow-lg shadow-destructive/20 transition-transform group-hover:scale-110">
        {letter}
      </div>
      <h4 className="text-xl font-bold text-text-main flex items-center gap-3">
        {title}
        <Icon size={20} className="text-destructive opacity-40" />
      </h4>
    </div>
    <div className="space-y-4 ml-14">
      {steps.map((step, i) => (
        <div key={i} className="flex gap-4 items-start">
          <div className="w-1.5 h-1.5 bg-destructive/40 rounded-full mt-2.5 flex-shrink-0" />
          <p className="text-text-muted text-lg leading-relaxed font-medium">{step}</p>
        </div>
      ))}
    </div>
  </div>
);

export default RescueGuide;
