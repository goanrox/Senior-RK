
import React from 'react';

const HSIGuide: React.FC = () => {
  const setupSteps = [
    {
      title: "Download the App",
      icon: "📲",
      description: "Search for 'T-Life' in the Play Store and install it."
    },
    {
      title: "Find the Best Spot",
      icon: "🪟",
      description: "Place your gateway near a window, ideally on an upper floor. Avoid placing it in a closet or behind the TV."
    },
    {
      title: "Power On",
      icon: "🔌",
      description: "Plug the power cord into the gateway and then into a wall outlet. Wait for the screen to light up."
    },
    {
      title: "Scan the Code",
      icon: "📷",
      description: "Open the app and follow the prompts to scan the QR code on the back or bottom of your gateway."
    },
    {
      title: "Set Your Wi-Fi",
      icon: "🔑",
      description: "Choose a name for your Wi-Fi and a strong password that you can remember."
    }
  ];

  const troubleshootingTips = [
    {
      issue: "Weak Signal (Low Bars)",
      solution: "Move the gateway closer to a window or high up on a bookshelf. Use the T-Life app to find the 'sweet spot' facing the nearest cell tower."
    },
    {
      issue: "Slow Speeds with VPN",
      solution: "VPNs add extra steps that can slow down your connection. Try disabling your VPN when you are on your secure home Wi-Fi."
    },
    {
      issue: "Barriers & Interference",
      solution: "Avoid hiding your gateway behind sofas or inside cabinets. Metal, wood, and large furniture can block your Wi-Fi signal."
    },
    {
      issue: "Outdated Equipment",
      solution: "Modems should be replaced every 4-5 years. If your devices support Wi-Fi 6 but your router doesn't, it's time for an upgrade."
    },
    {
      issue: "Sudden Slowdowns",
      solution: "Run a speed test. If speeds are low, try a 'power cycle' (unplug for 30 seconds). Also, check for malware or viruses on your computer."
    }
  ];

  return (
    <div className="p-5 md:p-8">
      <h2 className="text-xl md:text-2xl font-extrabold mb-2 text-text-main">T-Mobile Home Internet</h2>
      <p className="mb-6 md:mb-8 text-text-muted text-sm md:text-base">Get your home Wi-Fi up and running in minutes.</p>

      <section className="mb-10 md:mb-12">
        <h3 className="text-lg md:text-xl font-bold text-text-main mb-5 flex items-center gap-2">
          <span className="bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
          Setup Guide
        </h3>
        <div className="space-y-4 md:space-y-6">
          {setupSteps.map((step, index) => (
            <div key={index} className="flex gap-4 items-start group">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-surface-muted rounded-xl flex items-center justify-center text-xl md:text-2xl flex-shrink-0 group-hover:scale-110 transition-transform border border-border-main">
                {step.icon}
              </div>
              <div>
                <h4 className="font-bold text-text-main text-base md:text-lg">{step.title}</h4>
                <p className="text-sm md:text-base text-text-muted leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10 md:mb-12">
        <h3 className="text-lg md:text-xl font-bold text-text-main mb-5 flex items-center gap-2">
          <span className="bg-emerald-500/10 text-emerald-500 w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
          Speed Optimization
        </h3>
        <div className="bg-emerald-500/5 p-5 md:p-6 rounded-2xl border border-emerald-500/10">
          <ul className="space-y-3">
            <li className="flex gap-3 text-sm md:text-base">
              <span className="text-emerald-500 font-bold">✓</span>
              <span className="text-text-main"><strong>Use Mesh Devices:</strong> If you have a large home, mesh access points can bring Wi-Fi to every corner and even outdoors.</span>
            </li>
            <li className="flex gap-3 text-sm md:text-base">
              <span className="text-emerald-500 font-bold">✓</span>
              <span className="text-text-main"><strong>Check for Malware:</strong> Run regular antispyware and antivirus checks to ensure malicious software isn't hogging your bandwidth.</span>
            </li>
            <li className="flex gap-3 text-sm md:text-base">
              <span className="text-emerald-500 font-bold">✓</span>
              <span className="text-text-main"><strong>Wi-Fi 6:</strong> Ensure your gateway supports Wi-Fi 6 technology for the fastest possible connection with modern devices.</span>
            </li>
          </ul>
        </div>
      </section>

      <section>
        <h3 className="text-lg md:text-xl font-bold text-text-main mb-5 flex items-center gap-2">
          <span className="bg-rose-500/10 text-rose-500 w-6 h-6 rounded-full flex items-center justify-center text-xs">3</span>
          Troubleshooting
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {troubleshootingTips.map((tip, index) => (
            <div key={index} className="p-4 md:p-5 bg-surface-muted rounded-xl md:rounded-2xl border border-border-main hover:bg-surface hover:shadow-lg hover:shadow-cyan-900/5 transition-all">
              <h4 className="font-bold text-rose-500 text-sm md:text-base mb-2 flex items-center gap-2">
                <span>❓</span> {tip.issue}
              </h4>
              <p className="text-xs md:text-sm text-text-muted leading-relaxed">
                <strong className="text-text-main">Fix:</strong> {tip.solution}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-8 p-5 md:p-6 bg-primary/10 rounded-xl md:rounded-2xl border border-primary/20 flex items-center gap-4">
        <div className="text-2xl md:text-3xl">📞</div>
        <div>
          <h4 className="font-bold text-primary text-sm md:text-base">Still stuck?</h4>
          <p className="text-xs md:text-sm text-text-muted">Call T-Mobile support at <strong className="text-primary">1-844-275-9310</strong></p>
        </div>
      </div>
    </div>
  );
};

export default HSIGuide;
