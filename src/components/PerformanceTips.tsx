
import React from 'react';
import { 
  RefreshCw, 
  Image as ImageIcon, 
  Layers, 
  ArrowUpCircle, 
  Info, 
  CheckCircle2, 
  Zap,
  Settings,
  Trash2,
  Sparkles
} from 'lucide-react';

const PerformanceTips: React.FC = () => {
  const tips = [
    {
      title: "The 'Magic' Restart",
      icon: RefreshCw,
      description: "Turning your phone off and back on once a week clears out 'cobwebs'.",
      action: "Hold Power and tap 'Restart'.",
      color: "text-blue-500 bg-blue-50"
    },
    {
      title: "Clear Old Photos",
      icon: ImageIcon,
      description: "Deleting blurry photos or old videos can give your phone 'room to breathe'.",
      action: "Use 'Google Photos' to delete junk.",
      color: "text-emerald-500 bg-emerald-50"
    },
    {
      title: "Close Open Apps",
      icon: Layers,
      description: "Apps stay open in the background even when you aren't using them.",
      action: "Swipe up and 'Swipe Away' apps.",
      color: "text-amber-500 bg-amber-50"
    },
    {
      title: "Check for Updates",
      icon: ArrowUpCircle,
      description: "Phone makers send out 'tune-ups' regularly to keep things smooth.",
      action: "Settings > Software Update.",
      color: "text-purple-500 bg-purple-50"
    }
  ];

  return (
    <div className="p-6 md:p-10 space-y-12">
      <div className="space-y-2">
        <h2 className="text-2xl md:text-[32px] font-bold text-text-main">Performance Tips</h2>
        <p className="text-text-muted text-lg font-medium">Simple habits to keep your phone feeling brand new.</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {tips.map((tip, index) => (
          <div key={index} className="card-premium p-8 bg-white border border-border-main hover:shadow-lg transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <tip.icon size={80} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-14 h-14 rounded-2xl shadow-sm flex items-center justify-center transition-transform group-hover:scale-110 ${tip.color}`}>
                  <tip.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-text-main">{tip.title}</h3>
              </div>
              <p className="text-base text-text-muted mb-8 leading-relaxed font-medium">
                {tip.description}
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-bg-main text-text-main rounded-xl text-xs font-bold uppercase tracking-widest border border-border-main shadow-sm">
                <Settings size={14} className="opacity-40" />
                How: {tip.action}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Clear Cache Section */}
      <div className="card-premium p-8 md:p-12 bg-white border border-border-main shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5">
          <Zap size={120} />
        </div>
        <div className="relative z-10">
          <h3 className="text-2xl font-bold text-text-main mb-6 flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-2xl text-primary">
              <Zap size={28} />
            </div>
            How to Clear App Cache
          </h3>
          <p className="text-lg text-text-muted mb-10 font-medium leading-relaxed">
            Clearing "Cache" removes temporary files that apps don't need anymore, which can speed up your phone without deleting your photos or messages.
          </p>
          <div className="space-y-6">
            {[
              { step: 1, text: "Open your phone's Settings app (the gear icon)." },
              { step: 2, text: "Tap on 'Apps' or 'Applications'." },
              { step: 3, text: "Tap on an app that feels slow (like Facebook or Chrome)." },
              { step: 4, text: "Tap on 'Storage' or 'Storage & Cache'." },
              { step: 5, text: "Tap 'Clear Cache'. Do NOT tap 'Clear Data' unless you want to log out." }
            ].map((item) => (
              <div key={item.step} className="flex gap-6 items-start group">
                <div className="w-8 h-8 bg-primary/10 text-primary rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0 shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                  {item.step}
                </div>
                <p className="text-base text-text-muted font-bold pt-1 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pro Tip Callout */}
      <div className="card-premium p-8 bg-accent/5 border-accent/10 flex flex-col md:flex-row items-center gap-8 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5">
          <Sparkles size={100} />
        </div>
        <div className="p-4 bg-accent/10 rounded-3xl text-accent relative z-10">
          <Sparkles size={40} />
        </div>
        <div className="text-center md:text-left relative z-10">
          <h4 className="text-xl font-bold mb-2 text-text-main">Pro Tip: Don't use "Cleaner" apps!</h4>
          <p className="text-base text-text-muted leading-relaxed font-medium">
            Most apps that promise to "Clean" or "Boost" your phone actually do the opposite. Your phone already has these tools built-in!
          </p>
        </div>
      </div>
    </div>
  );
};

export default PerformanceTips;

