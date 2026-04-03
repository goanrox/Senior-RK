import React, { useState, useRef, useEffect } from 'react';
import { 
  Phone, 
  AlertTriangle, 
  Key, 
  ShieldCheck, 
  Building2, 
  CreditCard, 
  Ban, 
  Gift, 
  DollarSign, 
  UserCheck, 
  Bitcoin, 
  Smartphone, 
  Users, 
  Mail, 
  ShieldAlert, 
  Monitor, 
  Bug, 
  XCircle, 
  Megaphone, 
  Smile,
  Download,
  Hash,
  MessageSquare,
  Apple,
  CheckCircle2,
  Info,
  Zap,
  ChevronDown,
  ChevronUp,
  Layers,
  Shield
} from 'lucide-react';

const AccordionSection: React.FC<{ 
  title: string; 
  icon: React.ReactNode; 
  isOpen: boolean; 
  onToggle: () => void; 
  children: React.ReactNode;
  id: string;
}> = ({ title, icon, isOpen, onToggle, children, id }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div id={id} className="card-premium bg-white border border-border-main overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md">
      <button 
        onClick={onToggle}
        className="w-full p-6 flex items-center justify-between text-left active:bg-bg-secondary transition-colors group"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary-glow rounded-2xl text-primary border border-primary-light/30 group-hover:scale-110 transition-transform">
            {icon}
          </div>
          <h3 className="text-xl font-bold text-text-main leading-tight">{title}</h3>
        </div>
        <div className={`p-2 rounded-full transition-transform duration-300 ${isOpen ? 'rotate-180 bg-primary-light text-primary' : 'bg-bg-secondary text-text-subtle'}`}>
          <ChevronDown size={20} />
        </div>
      </button>
      
      <div 
        ref={contentRef}
        style={{ maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : '0px' }}
        className="transition-all duration-500 ease-in-out overflow-hidden"
      >
        <div className="p-6 pt-0 border-t border-border-main/50 space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
          {children}
        </div>
      </div>
    </div>
  );
};

const ScamAlerts: React.FC = () => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (id: string) => {
    setOpenSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const expandAll = () => {
    const allIds = [...sections.map((_, i) => `scam-${i}`), 'block-carrier', 'block-apps', 'block-actions'];
    const newState: Record<string, boolean> = {};
    allIds.forEach(id => newState[id] = true);
    setOpenSections(newState);
  };

  const collapseAll = () => {
    setOpenSections({});
  };

  const scrollToSection = (id: string) => {
    if (!openSections[id]) {
      setOpenSections(prev => ({ ...prev, [id]: true }));
    }
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const sections = [
    {
      label: "Amazon",
      header: "Fake Amazon & Online Store Calls",
      icon: <Building2 size={24} />,
      tips: [
        {
          title: "Amazon will NEVER call you about a suspicious order.",
          detail: "If someone calls claiming to be Amazon — hang up immediately.",
          icon: Phone,
          color: "destructive"
        },
        {
          title: "Scammers say: 'Your account has been charged $399.'",
          detail: "This is 100% fake. Amazon does not call customers to cancel orders.",
          icon: AlertTriangle,
          color: "amber"
        },
        {
          title: "Never give your password or verification codes.",
          detail: "Legitimate companies will never ask for this information over the phone.",
          icon: Key,
          color: "destructive"
        },
        {
          title: "If worried, call Amazon yourself directly.",
          detail: "Always use official contact numbers you find yourself on their website.",
          icon: ShieldCheck,
          color: "emerald"
        }
      ]
    },
    {
      label: "Banking",
      header: "Fake Bank & Credit Card Calls",
      icon: <CreditCard size={24} />,
      tips: [
        {
          title: "Banks NEVER ask for your PIN or full card number.",
          detail: "Banks already have this info and will never ask you to 'verify' it this way.",
          icon: Building2,
          color: "destructive"
        },
        {
          title: "Scammers say: 'We detected fraud on your account.'",
          detail: "This is the scam itself. They are trying to steal your card details.",
          icon: CreditCard,
          color: "amber"
        },
        {
          title: "Hang up and call the number on the BACK of your card.",
          detail: "This is the only way to ensure you are actually talking to your bank.",
          icon: Phone,
          color: "emerald"
        },
        {
          title: "Real banks never ask you to transfer to a 'safe account'.",
          detail: "That IS the fraud. Once you transfer the money, it's gone forever.",
          icon: Ban,
          color: "destructive"
        }
      ]
    },
    {
      label: "Gift cards",
      header: "Gift Card Scams",
      icon: <Gift size={24} />,
      tips: [
        {
          title: "No real company asks for payment in gift cards.",
          detail: "Gift cards are for gifts, not for payments, fees, or bail money.",
          icon: Gift,
          color: "destructive"
        },
        {
          title: "Scammers say: 'Buy Target or Walmart cards to pay a fine.'",
          detail: "Legitimate businesses do not accept other companies' gift cards.",
          icon: AlertTriangle,
          color: "amber"
        },
        {
          title: "Never read the numbers on the back to anyone.",
          detail: "Once you read those numbers, the money is gone and cannot be traced.",
          icon: DollarSign,
          color: "amber"
        },
        {
          title: "The IRS and Medicare NEVER accept gift cards.",
          detail: "Anyone asking for payment via gift card is a criminal.",
          icon: UserCheck,
          color: "destructive"
        }
      ]
    },
    {
      label: "Crypto",
      header: "Bitcoin & Crypto ATM Scams",
      icon: <Bitcoin size={24} />,
      tips: [
        {
          title: "Government agencies NEVER ask for Bitcoin.",
          detail: "Cryptocurrency is irreversible, which is why scammers love it.",
          icon: Bitcoin,
          color: "destructive"
        },
        {
          title: "Scammers stay on the phone while you deposit cash.",
          detail: "They use pressure to keep you from thinking or asking for help.",
          icon: Smartphone,
          color: "destructive"
        },
        {
          title: "Common fake reasons: 'Pay bail' or 'Avoid arrest'.",
          detail: "All of these reasons are fake and designed to create panic.",
          icon: ShieldAlert,
          color: "destructive"
        },
        {
          title: "Hang up and call a family member immediately.",
          detail: "Getting a second opinion will help you see the scam clearly.",
          icon: Users,
          color: "emerald"
        }
      ]
    },
    {
      label: "Government",
      header: "Fake Government & IRS Calls",
      icon: <UserCheck size={24} />,
      tips: [
        {
          title: "The IRS will NEVER call you to demand payment.",
          detail: "They always contact you by mail first and give you time to appeal.",
          icon: Mail,
          color: "emerald"
        },
        {
          title: "Scammers say: 'You will be arrested in 2 hours.'",
          detail: "This is designed to panic you into acting without thinking.",
          icon: UserCheck,
          color: "amber"
        },
        {
          title: "Social Security numbers cannot be 'suspended'.",
          detail: "If someone says your SSN is blocked, it's a 100% fake call.",
          icon: ShieldAlert,
          color: "emerald"
        },
        {
          title: "Real agencies do not threaten arrest over the phone.",
          detail: "Government employees are professional and follow strict procedures.",
          icon: Phone,
          color: "emerald"
        }
      ]
    },
    {
      label: "Tech support",
      header: "Tech Support Scams",
      icon: <Monitor size={24} />,
      tips: [
        {
          title: "Microsoft & Apple will NEVER call about a virus.",
          detail: "They have no way of knowing what is on your personal computer.",
          icon: Monitor,
          color: "destructive"
        },
        {
          title: "Scammers say: 'Give us remote access to fix it.'",
          detail: "They then steal your banking info or install actual malware.",
          icon: Bug,
          color: "amber"
        },
        {
          title: "Never allow remote access to anyone who called YOU.",
          detail: "Remote access gives them full control over your files and accounts.",
          icon: Ban,
          color: "destructive"
        },
        {
          title: "If a popup says 'Call Microsoft' — close the browser.",
          detail: "It is a scam popup designed to look like a system warning.",
          icon: AlertTriangle,
          color: "destructive"
        }
      ]
    },
    {
      label: "Emergency",
      header: "If You Think You're Being Scammed",
      icon: <ShieldAlert size={24} />,
      tips: [
        {
          title: "STOP — hang up or close the chat immediately.",
          detail: "The longer you stay on the line, the more pressure they apply.",
          icon: XCircle,
          color: "destructive"
        },
        {
          title: "Do NOT send money or gift cards for any reason.",
          detail: "Legitimate businesses don't use these methods for unexpected payments.",
          icon: DollarSign,
          color: "destructive"
        },
        {
          title: "Call a trusted family member before doing ANYTHING.",
          detail: "Talking it through with someone else breaks the scammer's spell.",
          icon: Phone,
          color: "emerald"
        },
        {
          title: "Report it: Call the FTC at 1-877-382-4357.",
          detail: "Reporting helps authorities track and stop these criminals.",
          icon: Megaphone,
          color: "primary"
        },
        {
          title: "You are NOT in trouble. Take a deep breath.",
          detail: "Scammers create fake urgency. You have the power to just hang up.",
          icon: Smile,
          color: "emerald"
        }
      ]
    }
  ];

  const carriers = [
    {
      name: "T-MOBILE",
      color: "bg-[#E20074]/5 border-[#E20074]/10 text-[#E20074]",
      codes: [
        { code: "#662#", action: "Activate Scam Block (free)" },
        { code: "#632#", action: "Turn Scam Block OFF" },
        { code: "#787#", action: "Check if Scam Block is ON" }
      ],
      note: "\"Scam Likely\" labels on incoming calls are automatic and free"
    },
    {
      name: "AT&T",
      color: "bg-[#00A8E0]/5 border-[#00A8E0]/10 text-[#00A8E0]",
      codes: [
        { code: "Download", action: "FREE \"AT&T ActiveArmor\" app" },
        { code: "App Settings", action: "Enable spam blocking in Call Protect" },
        { code: "*61* [number] #", action: "Block the last call received" }
      ],
      note: "AT&T ActiveArmor is the recommended way to manage spam"
    },
    {
      name: "VERIZON",
      color: "bg-[#CD040B]/5 border-[#CD040B]/10 text-[#CD040B]",
      codes: [
        { code: "Download", action: "\"Verizon Call Filter\" app (free version available)" },
        { code: "Text HELP", action: "Send to 800-922-0204 for assistance" }
      ],
      note: "Spam filter is enabled by default on most Verizon plans"
    },
    {
      name: "OTHER CARRIERS",
      color: "bg-slate-100 border-slate-200 text-slate-600",
      codes: [
        { code: "Dial 611", action: "Ask your carrier to enable spam call filtering" }
      ],
      note: "Most carriers offer free basic spam blocking upon request"
    }
  ];

  return (
    <div className="px-3 py-5 space-y-5 pb-20">
      {/* Compact Header Section */}
      <div className="px-2 space-y-1">
        <h2 className="text-2xl font-bold text-text-main tracking-tight leading-none">Scam Alerts</h2>
        <p className="text-sm text-text-muted leading-tight">
          Tap a category below to stay protected.
        </p>
      </div>

      {/* Navigation Grid - 4 Columns for 2 rows of 4 */}
      <div className="w-full max-w-[420px] mx-auto">
        <div className="grid grid-cols-4 gap-1.5">
          {sections.map((section, idx) => (
            <button 
              key={idx}
              onClick={() => scrollToSection(`scam-${idx}`)}
              className="flex items-center justify-center text-center px-1 py-2 bg-white border border-border-main rounded-xl hover:border-primary hover:text-primary transition-all shadow-sm active:scale-95 leading-tight min-h-[52px] w-full overflow-hidden"
            >
              <span className={`w-full whitespace-normal break-normal font-bold text-text-muted ${section.label.length > 9 ? 'text-[9px]' : 'text-[10px]'}`}>
                {section.label}
              </span>
            </button>
          ))}
          <button 
            key="blocking-chip"
            onClick={() => scrollToSection('block-carrier')}
            className="flex items-center justify-center text-center px-1 py-2 bg-primary-glow border border-primary-light rounded-xl hover:border-primary transition-all shadow-sm active:scale-95 leading-tight min-h-[52px] w-full overflow-hidden"
          >
            <span className="w-full whitespace-normal break-normal font-bold text-primary text-[10px]">
              Blocking
            </span>
          </button>
        </div>
      </div>

      {/* Accordion Sections */}
      <div className="space-y-3 px-1">
        {sections.map((section, sIdx) => (
          <AccordionSection 
            key={sIdx}
            id={`scam-${sIdx}`}
            title={section.header}
            icon={section.icon}
            isOpen={!!openSections[`scam-${sIdx}`]}
            onToggle={() => toggleSection(`scam-${sIdx}`)}
          >
            <div className="grid grid-cols-1 gap-4">
              {section.tips.map((tip, tIdx) => {
                let iconBgClass = "bg-primary-glow";
                let iconTextClass = "text-primary";
                
                if (tip.color === "destructive") {
                  iconBgClass = "bg-red-50";
                  iconTextClass = "text-red-600";
                } else if (tip.color === "emerald") {
                  iconBgClass = "bg-emerald-50";
                  iconTextClass = "text-emerald-600";
                } else if (tip.color === "amber") {
                  iconBgClass = "bg-accent-tint";
                  iconTextClass = "text-accent";
                }

                return (
                  <div key={tIdx} className="bg-bg-main/50 rounded-2xl p-5 border border-border-main/30">
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBgClass} ${iconTextClass}`}>
                        <tip.icon size={20} />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-text-main text-base leading-tight">{tip.title}</h4>
                        <p className="text-sm text-text-muted leading-relaxed">
                          {tip.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </AccordionSection>
        ))}

        {/* Blocking Section */}
        <div className="pt-8 space-y-4">
          <div className="flex items-center gap-3 px-1">
            <div className="p-2 bg-primary-glow rounded-xl text-primary">
              <Shield size={20} />
            </div>
            <h3 className="text-xl font-bold text-text-main">How to Block Scam Calls</h3>
          </div>

          <AccordionSection 
            id="block-carrier"
            title="Carrier Dial Codes"
            icon={<Hash size={24} />}
            isOpen={!!openSections['block-carrier']}
            onToggle={() => toggleSection('block-carrier')}
          >
            <div className="grid grid-cols-1 gap-4">
              {carriers.map((carrier, cIdx) => (
                <div key={cIdx} className={`rounded-2xl p-6 border ${carrier.color} shadow-sm relative overflow-hidden`}>
                  <h5 className="font-black text-xs mb-4 tracking-widest uppercase">{carrier.name}</h5>
                  <div className="space-y-3 mb-4">
                    {carrier.codes.map((item, iIdx) => (
                      <div key={iIdx} className="flex justify-between items-center gap-4 p-3 bg-white/60 rounded-xl border border-white/20">
                        <span className="font-mono font-bold text-sm">{item.code}</span>
                        <span className="text-[10px] font-bold text-right uppercase tracking-wide">{item.action}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] opacity-70 font-bold italic flex items-start gap-2">
                    <Info size={12} className="flex-shrink-0 mt-0.5" />
                    {carrier.note}
                  </p>
                </div>
              ))}
            </div>
          </AccordionSection>

          <AccordionSection 
            id="block-apps"
            title="Free Blocking Apps"
            icon={<Smartphone size={24} />}
            isOpen={!!openSections['block-apps']}
            onToggle={() => toggleSection('block-apps')}
          >
            <div className="grid grid-cols-1 gap-4">
              {[
                { title: "Hiya", detail: "Free app that auto-blocks known scam numbers. Available on Android and iPhone.", icon: Smartphone },
                { title: "RoboKiller", detail: "Blocks robocalls and answers them with funny messages to waste scammers' time.", icon: Zap },
                { title: "Google Phone App", detail: "On Android, go to Settings → Spam and Call Screening → turn on Filter spam calls.", icon: Phone },
                { title: "iPhone built-in", detail: "Go to Settings → Phone → Silence Unknown Callers to send unknown numbers to voicemail.", icon: Apple }
              ].map((app, aIdx) => (
                <div key={aIdx} className="bg-bg-main/50 rounded-2xl p-5 border border-border-main/30 flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary-glow text-primary rounded-xl flex items-center justify-center flex-shrink-0">
                    <app.icon size={20} />
                  </div>
                  <div>
                    <h5 className="font-bold text-text-main text-base mb-1">{app.title}</h5>
                    <p className="text-sm text-text-muted leading-relaxed">{app.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </AccordionSection>

          <AccordionSection 
            id="block-actions"
            title="Quick Actions"
            icon={<Zap size={24} />}
            isOpen={!!openSections['block-actions']}
            onToggle={() => toggleSection('block-actions')}
          >
            <div className="grid grid-cols-1 gap-4">
              {[
                { title: "Don't say 'Yes'", detail: "Scammers record you saying yes to authorize fake charges. Say 'I'm not interested' and hang up.", icon: XCircle, color: "destructive" },
                { title: "Never press any numbers", detail: "Pressing numbers confirms your line is active and adds you to more scam lists.", icon: Ban, color: "destructive" },
                { title: "You can hang up on anyone", detail: "It is not rude to hang up on a scammer. Real businesses understand.", icon: Phone, color: "emerald" },
                { title: "Add to Do Not Call Registry", detail: "Go to donotcall.gov or call 1-888-382-1222 (free, takes 31 days to take effect).", icon: CheckCircle2, color: "primary" }
              ].map((action, iIdx) => (
                <div key={iIdx} className="bg-bg-main/50 rounded-2xl p-5 border border-border-main/30 flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    action.color === 'destructive' ? 'bg-red-50 text-red-600' : 
                    action.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' : 
                    'bg-primary-glow text-primary'
                  }`}>
                    <action.icon size={20} />
                  </div>
                  <div>
                    <h5 className="font-bold text-text-main text-base mb-1">{action.title}</h5>
                    <p className="text-sm text-text-muted leading-relaxed">{action.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </AccordionSection>
        </div>
      </div>

      <div className="card-premium p-6 bg-accent-tint border-accent/20">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white rounded-2xl text-accent shadow-sm">
            <Info size={24} />
          </div>
          <div>
            <h4 className="font-bold text-text-main">Remember</h4>
            <p className="text-sm text-text-muted">You are in control. If a call feels wrong, just hang up. You don't owe anyone an explanation.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScamAlerts;
