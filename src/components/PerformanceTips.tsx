
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
    <div className="p-6 md:p-10">
      <h2 className="text-2xl md:text-[28px] font-bold mb-2 text-text-main">Performance Tips</h2>
      <p className="mb-6 md:mb-8 text-text-muted text-sm md:text-base font-medium">Simple habits to keep your phone feeling brand new.</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
        {tips.map((tip, index) => (
          <div key={index} className="bg-white p-6 md:p-8 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.06)] border border-border-main hover:bg-bg-main transition-all group">
            <div className="flex items-center gap-4 mb-4 md:mb-6">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-bg-main rounded-xl shadow-sm flex items-center justify-center text-xl md:text-2xl group-hover:scale-110 transition-transform">
                {tip.icon}
              </div>
              <h3 className="text-lg md:text-xl font-bold text-text-main">{tip.title}</h3>
            </div>
            <p className="text-sm md:text-base text-text-muted mb-4 md:mb-6 leading-relaxed font-medium">
              {tip.description}
            </p>
            <div className="bg-primary/10 text-primary px-3 py-1.5 md:py-2 rounded-full text-[10px] md:text-[11px] font-bold inline-block shadow-sm">
              How: {tip.action}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 md:mt-12 p-8 md:p-12 bg-white rounded-[2rem] border border-border-main shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
        <h3 className="text-xl md:text-2xl font-bold text-text-main mb-6 flex items-center gap-3">
          <span>🧹</span> How to Clear App Cache
        </h3>
        <p className="text-base md:text-lg text-text-muted mb-8 font-medium">
          Clearing "Cache" removes temporary files that apps don't need anymore, which can speed up your phone.
        </p>
        <div className="space-y-5">
          {[
            { step: 1, text: "Open your phone's Settings app (the gear icon)." },
            { step: 2, text: "Tap on 'Apps' or 'Applications'." },
            { step: 3, text: "Tap on an app that feels slow (like Facebook or Chrome)." },
            { step: 4, text: "Tap on 'Storage' or 'Storage & Cache'." },
            { step: 5, text: "Tap 'Clear Cache'. Do NOT tap 'Clear Data' unless you want to log out." }
          ].map((item) => (
            <div key={item.step} className="flex gap-5 items-start">
              <div className="w-7 h-7 md:w-8 md:h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs md:text-sm font-black flex-shrink-0 shadow-sm">
                {item.step}
              </div>
              <p className="text-sm md:text-base text-text-muted font-bold pt-1">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 md:mt-10 p-6 md:p-8 bg-[#FAD4C0]/30 rounded-2xl border border-border-main flex flex-col md:flex-row items-center gap-6 md:gap-8 shadow-sm">
        <div className="text-3xl md:text-4xl">💡</div>
        <div className="text-center md:text-left">
          <h4 className="text-lg md:text-xl font-bold mb-2 text-text-main">Pro Tip: Don't use "Cleaner" apps!</h4>
          <p className="text-sm md:text-base text-text-muted leading-relaxed font-medium">
            Most apps that promise to "Clean" or "Boost" your phone actually do the opposite. Your phone already has these tools built-in!
          </p>
        </div>
      </div>
    </div>
  );
};

export default PerformanceTips;

