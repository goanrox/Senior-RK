import React from 'react';
import { 
  AlertCircle, 
  ShieldAlert, 
  Download, 
  ShieldCheck, 
  AlertTriangle, 
  Search, 
  MessageSquare, 
  Flag, 
  Megaphone, 
  XCircle, 
  Camera, 
  Users, 
  Link, 
  CheckCircle2, 
  Key, 
  Bell, 
  Phone,
  Info,
  Zap,
  Shield
} from 'lucide-react';

const FBSafety: React.FC = () => {
  const sections = [
    {
      header: "Fake App Ads on Your Timeline",
      icon: <Megaphone className="text-rose-500" />,
      tips: [
        {
          title: "Fake Virus Warnings",
          detail: "If an ad says your phone is slow or has a virus — it's a SCAM. Facebook cannot scan your phone.",
          icon: AlertCircle,
          color: "destructive"
        },
        {
          title: "Fake Cleaner Apps",
          detail: "Cleaner apps advertised on Facebook are almost never real. Do NOT tap 'Install' or 'Download' on any ad.",
          icon: Zap,
          color: "destructive"
        },
        {
          title: "Official Stores Only",
          detail: "Legitimate apps are only downloaded from the official Google Play Store or Apple App Store — never from a Facebook ad link.",
          icon: ShieldCheck,
          color: "primary"
        },
        {
          title: "Urgent Language",
          detail: "If an ad uses urgent language like 'Your device is infected!' or 'Clean NOW!' — close it immediately.",
          icon: AlertTriangle,
          color: "destructive"
        }
      ]
    },
    {
      header: "How to Spot a Scam Ad",
      icon: <Search className="text-blue-500" />,
      tips: [
        {
          title: "Investigate Ads",
          detail: "Tap the three dots (•••) in the top right corner of any ad and select 'Why am I seeing this ad?' to investigate.",
          icon: Search,
          color: "primary"
        },
        {
          title: "Disabled Comments",
          detail: "Check if the ad has comments disabled. Scammers hide comments so real victims can't warn others.",
          icon: MessageSquare,
          color: "destructive"
        },
        {
          title: "Red Flags",
          detail: "Poor spelling, all-caps urgent messages, and deals too good to be true are major red flags.",
          icon: Flag,
          color: "destructive"
        },
        {
          title: "Fake Logos",
          detail: "Scam ads often fake logos of trusted brands like Google, Samsung, or Apple — do not trust logos alone.",
          icon: ShieldAlert,
          color: "destructive"
        }
      ]
    },
    {
      header: "What To Do If You See a Suspicious Ad",
      icon: <Shield className="text-amber-500" />,
      tips: [
        {
          title: "Report the Ad",
          detail: "Tap the three dots (•••) on the ad → select 'Report Ad' → choose 'Scam or Fraud'. This protects others.",
          icon: Megaphone,
          color: "primary"
        },
        {
          title: "Don't Interact",
          detail: "Do NOT click, share, or comment on the ad — even commenting can spread it to your friends.",
          icon: XCircle,
          color: "destructive"
        },
        {
          title: "Ask for Help",
          detail: "Screenshot the ad and show it to a trusted family member or our app's App Checker tab before doing anything.",
          icon: Camera,
          color: "primary"
        },
        {
          title: "Damage Control",
          detail: "If you already tapped a suspicious link, do not enter any personal info and close the browser immediately.",
          icon: ShieldCheck,
          color: "destructive"
        }
      ]
    },
    {
      header: "Fake Facebook Groups",
      icon: <Users className="text-indigo-500" />,
      tips: [
        {
          title: "Fake Registration",
          detail: "Scammers create fake groups for seniors that ask you to download an outside app to 'register.' These apps steal your information.",
          icon: ShieldAlert,
          color: "destructive"
        },
        {
          title: "No Outside Apps",
          detail: "Real community groups never require you to download an outside app to join.",
          icon: ShieldCheck,
          color: "emerald"
        },
        {
          title: "Suspicious Links",
          detail: "If someone in a group sends you a download link via Messenger — do NOT open it.",
          icon: Link,
          color: "destructive"
        }
      ]
    },
    {
      header: "Safe Facebook Habits",
      icon: <CheckCircle2 className="text-emerald-500" />,
      tips: [
        {
          title: "Official Stores",
          detail: "Only download apps from the Google Play Store or Apple App Store.",
          icon: CheckCircle2,
          color: "emerald"
        },
        {
          title: "Keep Passwords Secret",
          detail: "Never give your Facebook password to anyone — including anyone claiming to be Facebook Support.",
          icon: Key,
          color: "destructive"
        },
        {
          title: "Turn on Login Alerts",
          detail: "Go to Settings → Security and Login → Get alerts about unrecognized logins.",
          icon: Bell,
          color: "emerald"
        },
        {
          title: "Verify with Friends",
          detail: "If a friend's account sends you a strange link, call them directly — their account may be hacked.",
          icon: Phone,
          color: "primary"
        }
      ]
    }
  ];

  return (
    <div className="p-6 md:p-10 space-y-16">
      <div className="space-y-2">
        <h2 className="text-2xl md:text-[32px] font-bold text-text-main">Facebook Safety</h2>
        <p className="text-text-muted text-lg font-medium">Learn how to spot scams and stay safe on Facebook.</p>
      </div>

      <div className="space-y-16">
        {sections.map((section, sIdx) => (
          <section key={sIdx} className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white rounded-2xl shadow-sm border border-border-main">
                {section.icon}
              </div>
              <h3 className="text-2xl font-bold text-text-main">
                {section.header}
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {section.tips.map((tip, tIdx) => {
                let iconBgClass = "bg-primary/10";
                let iconTextClass = "text-primary";
                
                if (tip.color === "destructive") {
                  iconBgClass = "bg-rose-50";
                  iconTextClass = "text-rose-600";
                } else if (tip.color === "emerald") {
                  iconBgClass = "bg-emerald-50";
                  iconTextClass = "text-emerald-600";
                }

                return (
                  <div key={tIdx} className="card-premium p-8 bg-white border border-border-main hover:shadow-lg transition-all group">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform ${iconBgClass} ${iconTextClass}`}>
                        <tip.icon size={24} />
                      </div>
                      <h4 className="font-bold text-text-main text-lg leading-tight">{tip.title}</h4>
                    </div>
                    <p className="text-base text-text-muted leading-relaxed font-medium">
                      {tip.detail}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default FBSafety;

