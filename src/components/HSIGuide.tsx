
import React from 'react';
import { 
  Download, 
  Plug, 
  QrCode, 
  Wifi, 
  Signal, 
  Zap, 
  ShieldAlert, 
  RefreshCw, 
  Phone,
  CheckCircle2,
  Info,
  ArrowRight,
  HelpCircle,
  Smartphone,
  Layout,
  Monitor
} from 'lucide-react';

const HSIGuide: React.FC = () => {
  const setupSteps = [
    {
      title: "Download the App",
      icon: Smartphone,
      description: "Search for 'T-Life' in the Play Store and install it."
    },
    {
      title: "Find the Best Spot",
      icon: Layout,
      description: "Place your gateway near a window, ideally on an upper floor. Avoid placing it in a closet or behind the TV."
    },
    {
      title: "Power On",
      icon: Plug,
      description: "Plug the power cord into the gateway and then into a wall outlet. Wait for the screen to light up."
    },
    {
      title: "Scan the Code",
      icon: QrCode,
      description: "Open the app and follow the prompts to scan the QR code on the back or bottom of your gateway."
    },
    {
      title: "Set Your Wi-Fi",
      icon: Wifi,
      description: "Choose a name for your Wi-Fi and a strong password that you can remember."
    }
  ];

  const troubleshootingTips = [
    {
      issue: "Weak Signal (Low Bars)",
      icon: Signal,
      solution: "Move the gateway closer to a window or high up on a bookshelf. Use the T-Life app to find the 'sweet spot' facing the nearest cell tower."
    },
    {
      issue: "Slow Speeds with VPN",
      icon: ShieldAlert,
      solution: "VPNs add extra steps that can slow down your connection. Try disabling your VPN when you are on your secure home Wi-Fi."
    },
    {
      issue: "Barriers & Interference",
      icon: Monitor,
      solution: "Avoid hiding your gateway behind sofas or inside cabinets. Metal, wood, and large furniture can block your Wi-Fi signal."
    },
    {
      issue: "Outdated Equipment",
      icon: RefreshCw,
      solution: "Modems should be replaced every 4-5 years. If your devices support Wi-Fi 6 but your router doesn't, it's time for an upgrade."
    },
    {
      issue: "Sudden Slowdowns",
      icon: Zap,
      solution: "Run a speed test. If speeds are low, try a 'power cycle' (unplug for 30 seconds). Also, check for malware or viruses on your computer."
    }
  ];

  return (
    <div className="p-6 md:p-10 space-y-16">
      <div className="space-y-2">
        <h2 className="text-2xl md:text-[32px] font-bold text-text-main flex items-center gap-4">
          <div className="p-3 bg-white rounded-2xl shadow-sm border border-border-main">
            <Wifi className="text-primary" size={28} />
          </div>
          T-Mobile Home Internet
        </h2>
        <p className="text-text-muted text-lg font-medium">Get your home Wi-Fi up and running in minutes.</p>
      </div>

      <section className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center text-sm font-black shadow-lg shadow-primary/20">1</div>
          <h3 className="text-2xl font-bold text-text-main">Setup Guide</h3>
        </div>
        <div className="space-y-6">
          {setupSteps.map((step, index) => (
            <div key={index} className="card-premium p-8 bg-white border border-border-main flex gap-8 items-start group hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-bg-main rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform text-primary">
                <step.icon size={28} />
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-text-main text-xl leading-tight">{step.title}</h4>
                <p className="text-lg text-text-muted leading-relaxed font-medium">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center text-sm font-black shadow-lg shadow-primary/20">2</div>
          <h3 className="text-2xl font-bold text-text-main">Speed Optimization</h3>
        </div>
        <div className="card-premium p-10 bg-primary/5 border-primary/10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
            <Zap size={120} />
          </div>
          <ul className="space-y-6 relative z-10">
            <li className="flex gap-6 items-start">
              <div className="p-2 bg-primary/10 rounded-lg text-primary flex-shrink-0">
                <CheckCircle2 size={20} />
              </div>
              <p className="text-lg text-text-main font-medium leading-relaxed">
                <strong className="block text-primary mb-1">Use Mesh Devices</strong>
                If you have a large home, mesh access points can bring Wi-Fi to every corner and even outdoors.
              </p>
            </li>
            <li className="flex gap-6 items-start">
              <div className="p-2 bg-primary/10 rounded-lg text-primary flex-shrink-0">
                <CheckCircle2 size={20} />
              </div>
              <p className="text-lg text-text-main font-medium leading-relaxed">
                <strong className="block text-primary mb-1">Check for Malware</strong>
                Run regular antispyware and antivirus checks to ensure malicious software isn't hogging your bandwidth.
              </p>
            </li>
            <li className="flex gap-6 items-start">
              <div className="p-2 bg-primary/10 rounded-lg text-primary flex-shrink-0">
                <CheckCircle2 size={20} />
              </div>
              <p className="text-lg text-text-main font-medium leading-relaxed">
                <strong className="block text-primary mb-1">Wi-Fi 6 Technology</strong>
                Ensure your gateway supports Wi-Fi 6 for the fastest possible connection with modern devices.
              </p>
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-rose-500 text-white rounded-full flex items-center justify-center text-sm font-black shadow-lg shadow-rose-500/20">3</div>
          <h3 className="text-2xl font-bold text-text-main">Troubleshooting</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {troubleshootingTips.map((tip, index) => (
            <div key={index} className="card-premium p-8 bg-white border border-border-main hover:shadow-lg transition-all group">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-rose-50 rounded-xl text-rose-600 group-hover:scale-110 transition-transform">
                  <tip.icon size={24} />
                </div>
                <h4 className="font-bold text-text-main text-lg leading-tight">{tip.issue}</h4>
              </div>
              <div className="p-4 bg-bg-main rounded-2xl border border-border-main/50">
                <p className="text-base text-text-muted leading-relaxed font-medium">
                  <span className="inline-flex items-center gap-1.5 text-rose-600 font-black uppercase tracking-widest text-[10px] mb-2">
                    <RefreshCw size={12} />
                    Solution
                  </span>
                  <br />
                  {tip.solution}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="card-premium p-10 bg-primary text-white flex flex-col md:flex-row items-center gap-8 shadow-xl shadow-primary/20 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-700">
          <Phone size={120} />
        </div>
        <div className="p-6 bg-white/10 rounded-3xl backdrop-blur-md relative z-10">
          <Phone size={40} />
        </div>
        <div className="text-center md:text-left relative z-10 space-y-2">
          <h4 className="text-2xl font-bold">Still stuck?</h4>
          <p className="text-lg font-medium opacity-90">
            Call T-Mobile support at <br className="md:hidden" />
            <span className="text-3xl font-black tracking-tight">1-844-275-9310</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HSIGuide;

