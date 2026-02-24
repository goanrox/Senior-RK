
import React from 'react';

const PerformanceTips: React.FC = () => {
  const tips = [
    {
      title: "The 'Magic' Restart",
      icon: "🔄",
      description: "Turning your phone off and back on once a week clears out 'cobwebs'.",
      action: "Hold Power and tap 'Restart'."
    },
    {
      title: "Clear Old Photos",
      icon: "📸",
      description: "Deleting blurry photos or old videos can give your phone 'room to breathe'.",
      action: "Use 'Google Photos' to delete junk."
    },
    {
      title: "Close Open Apps",
      icon: "📑",
      description: "Apps stay open in the background even when you aren't using them.",
      action: "Swipe up and 'Swipe Away' apps."
    },
    {
      title: "Check for Updates",
      icon: "🆙",
      description: "Phone makers send out 'tune-ups' regularly to keep things smooth.",
      action: "Settings > Software Update."
    }
  ];

  return (
    <div className="p-5 md:p-8">
      <h2 className="text-xl md:text-2xl font-extrabold mb-2 text-text-main">Performance Tips</h2>
      <p className="mb-5 md:mb-6 text-text-muted text-sm md:text-base">Simple habits to keep your phone feeling brand new.</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
        {tips.map((tip, index) => (
          <div key={index} className="bg-surface-muted p-4 md:p-5 rounded-xl md:rounded-2xl border border-border-main hover:bg-surface hover:shadow-lg hover:shadow-cyan-900/5 transition-all group">
            <div className="flex items-center gap-3 mb-2 md:mb-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-surface rounded-lg shadow-sm flex items-center justify-center text-lg md:text-xl group-hover:scale-110 transition-transform">
                {tip.icon}
              </div>
              <h3 className="text-base md:text-lg font-extrabold text-text-main">{tip.title}</h3>
            </div>
            <p className="text-xs md:text-sm text-text-muted mb-3 md:mb-4 leading-relaxed">
              {tip.description}
            </p>
            <div className="bg-primary/10 text-primary px-2.5 py-1 md:py-1.5 rounded-lg text-[9px] md:text-[10px] font-bold inline-block">
              How: {tip.action}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 md:mt-10 p-5 md:p-8 bg-surface rounded-2xl md:rounded-3xl border border-border-main shadow-xl shadow-cyan-900/5">
        <h3 className="text-lg md:text-xl font-extrabold text-text-main mb-4 flex items-center gap-2">
          <span>🧹</span> How to Clear App Cache
        </h3>
        <p className="text-sm md:text-base text-text-muted mb-6">
          Clearing "Cache" removes temporary files that apps don't need anymore, which can speed up your phone.
        </p>
        <div className="space-y-4">
          {[
            { step: 1, text: "Open your phone's Settings app (the gear icon)." },
            { step: 2, text: "Tap on 'Apps' or 'Applications'." },
            { step: 3, text: "Tap on an app that feels slow (like Facebook or Chrome)." },
            { step: 4, text: "Tap on 'Storage' or 'Storage & Cache'." },
            { step: 5, text: "Tap 'Clear Cache'. Do NOT tap 'Clear Data' unless you want to log out." }
          ].map((item) => (
            <div key={item.step} className="flex gap-4 items-start">
              <div className="w-6 h-6 md:w-7 md:h-7 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs md:text-sm font-black flex-shrink-0">
                {item.step}
              </div>
              <p className="text-sm md:text-base text-text-muted font-medium pt-0.5">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 md:mt-8 p-5 md:p-6 bg-surface-muted rounded-xl md:rounded-2xl border border-border-main flex flex-col md:flex-row items-center gap-4 md:gap-6">
        <div className="text-2xl md:text-3xl">💡</div>
        <div className="text-center md:text-left">
          <h4 className="text-base md:text-lg font-bold mb-1 text-text-main">Pro Tip: Don't use "Cleaner" apps!</h4>
          <p className="text-xs md:text-sm text-text-muted leading-relaxed">
            Most apps that promise to "Clean" or "Boost" your phone actually do the opposite. Your phone already has these tools built-in!
          </p>
        </div>
      </div>
    </div>
  );
};

export default PerformanceTips;
