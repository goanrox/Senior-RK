
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
    <div className="p-6 md:p-10">
      <h2 className="text-2xl md:text-[28px] font-bold mb-2 text-text-main">T-Mobile Home Internet</h2>
      <p className="mb-8 md:mb-10 text-text-muted text-sm md:text-base font-medium">Get your home Wi-Fi up and running in minutes.</p>

      <section className="mb-12 md:mb-16">
        <h3 className="text-xl md:text-2xl font-bold text-text-main mb-6 flex items-center gap-3">
          <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm font-black">1</span>
          Setup Guide
        </h3>
        <div className="space-y-6 md:space-y-8">
          {setupSteps.map((step, index) => (
            <div key={index} className="flex gap-5 items-start group">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06)] rounded-2xl flex items-center justify-center text-xl md:text-2xl flex-shrink-0 group-hover:scale-110 transition-transform border border-border-main">
                {step.icon}
              </div>
              <div>
                <h4 className="font-bold text-text-main text-lg md:text-xl mb-1">{step.title}</h4>
                <p className="text-sm md:text-base text-text-muted leading-relaxed font-medium">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12 md:mb-16">
        <h3 className="text-xl md:text-2xl font-bold text-text-main mb-6 flex items-center gap-3">
          <span className="bg-[#D6D0F5]/50 text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm font-black">2</span>
          Speed Optimization
        </h3>
        <div className="bg-[#D6D0F5]/30 p-6 md:p-8 rounded-[2rem] border border-border-main shadow-sm">
          <ul className="space-y-4">
            <li className="flex gap-4 text-sm md:text-base font-medium">
              <span className="text-primary font-black">✓</span>
              <span className="text-text-main"><strong>Use Mesh Devices:</strong> If you have a large home, mesh access points can bring Wi-Fi to every corner and even outdoors.</span>
            </li>
            <li className="flex gap-4 text-sm md:text-base font-medium">
              <span className="text-primary font-black">✓</span>
              <span className="text-text-main"><strong>Check for Malware:</strong> Run regular antispyware and antivirus checks to ensure malicious software isn't hogging your bandwidth.</span>
            </li>
            <li className="flex gap-4 text-sm md:text-base font-medium">
              <span className="text-primary font-black">✓</span>
              <span className="text-text-main"><strong>Wi-Fi 6:</strong> Ensure your gateway supports Wi-Fi 6 technology for the fastest possible connection with modern devices.</span>
            </li>
          </ul>
        </div>
      </section>

      <section>
        <h3 className="text-xl md:text-2xl font-bold text-text-main mb-6 flex items-center gap-3">
          <span className="bg-[#F4A5AE]/50 text-secondary-dark w-8 h-8 rounded-full flex items-center justify-center text-sm font-black">3</span>
          Troubleshooting
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {troubleshootingTips.map((tip, index) => (
            <div key={index} className="p-6 md:p-8 bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.06)] border border-border-main hover:bg-bg-main transition-all">
              <h4 className="font-bold text-secondary-dark text-base md:text-lg mb-3 flex items-center gap-2">
                <span>❓</span> {tip.issue}
              </h4>
              <p className="text-sm md:text-base text-text-muted leading-relaxed font-medium">
                <strong className="text-text-main">Fix:</strong> {tip.solution}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-10 md:mt-12 p-6 md:p-8 bg-primary/10 rounded-2xl border border-border-main flex items-center gap-6 shadow-sm">
        <div className="text-3xl md:text-4xl">📞</div>
        <div>
          <h4 className="font-bold text-primary text-lg md:text-xl mb-1">Still stuck?</h4>
          <p className="text-sm md:text-base text-text-muted font-medium">Call T-Mobile support at <strong className="text-primary">1-844-275-9310</strong></p>
        </div>
      </div>
    </div>
  );
};

export default HSIGuide;
