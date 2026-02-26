import React from 'react';

const FBSafety: React.FC = () => {
  const sections = [
    {
      header: "🚨 Fake App Ads on Your Timeline",
      tips: [
        {
          title: "Fake Virus Warnings",
          detail: "If an ad says your phone is slow or has a virus — it's a SCAM. Facebook cannot scan your phone.",
          icon: "🚨",
          color: "destructive"
        },
        {
          title: "Fake Cleaner Apps",
          detail: "Cleaner apps advertised on Facebook are almost never real. Do NOT tap 'Install' or 'Download' on any ad.",
          icon: "🧹",
          color: "destructive"
        },
        {
          title: "Official Stores Only",
          detail: "Legitimate apps are only downloaded from the official Google Play Store or Apple App Store — never from a Facebook ad link.",
          icon: "🛡️",
          color: "primary"
        },
        {
          title: "Urgent Language",
          detail: "If an ad uses urgent language like 'Your device is infected!' or 'Clean NOW!' — close it immediately.",
          icon: "⚠️",
          color: "destructive"
        }
      ]
    },
    {
      header: "⚠️ How to Spot a Scam Ad",
      tips: [
        {
          title: "Investigate Ads",
          detail: "Tap the three dots (•••) in the top right corner of any ad and select 'Why am I seeing this ad?' to investigate.",
          icon: "🔍",
          color: "primary"
        },
        {
          title: "Disabled Comments",
          detail: "Check if the ad has comments disabled. Scammers hide comments so real victims can't warn others.",
          icon: "💬",
          color: "destructive"
        },
        {
          title: "Red Flags",
          detail: "Poor spelling, all-caps urgent messages, and deals too good to be true are major red flags.",
          icon: "🚩",
          color: "destructive"
        },
        {
          title: "Fake Logos",
          detail: "Scam ads often fake logos of trusted brands like Google, Samsung, or Apple — do not trust logos alone.",
          icon: "🎭",
          color: "destructive"
        }
      ]
    },
    {
      header: "🛑 What To Do If You See a Suspicious Ad",
      tips: [
        {
          title: "Report the Ad",
          detail: "Tap the three dots (•••) on the ad → select 'Report Ad' → choose 'Scam or Fraud'. This protects others.",
          icon: "📢",
          color: "primary"
        },
        {
          title: "Don't Interact",
          detail: "Do NOT click, share, or comment on the ad — even commenting can spread it to your friends.",
          icon: "🛑",
          color: "destructive"
        },
        {
          title: "Ask for Help",
          detail: "Screenshot the ad and show it to a trusted family member or our app's App Checker tab before doing anything.",
          icon: "📸",
          color: "primary"
        },
        {
          title: "Damage Control",
          detail: "If you already tapped a suspicious link, do not enter any personal info and close the browser immediately.",
          icon: "🛡️",
          color: "destructive"
        }
      ]
    },
    {
      header: "🔒 Fake Facebook Groups",
      tips: [
        {
          title: "Fake Registration",
          detail: "Scammers create fake groups for seniors that ask you to download an outside app to 'register.' These apps steal your information.",
          icon: "🎣",
          color: "destructive"
        },
        {
          title: "No Outside Apps",
          detail: "Real community groups never require you to download an outside app to join.",
          icon: "🛡️",
          color: "emerald-600"
        },
        {
          title: "Suspicious Links",
          detail: "If someone in a group sends you a download link via Messenger — do NOT open it.",
          icon: "🔗",
          color: "destructive"
        }
      ]
    },
    {
      header: "✅ Safe Facebook Habits",
      tips: [
        {
          title: "Official Stores",
          detail: "Only download apps from the Google Play Store or Apple App Store.",
          icon: "✅",
          color: "emerald-600"
        },
        {
          title: "Keep Passwords Secret",
          detail: "Never give your Facebook password to anyone — including anyone claiming to be Facebook Support.",
          icon: "🔑",
          color: "destructive"
        },
        {
          title: "Login Alerts",
          detail: "Turn on Login Alerts: Settings → Security and Login → Get alerts about unrecognized logins.",
          icon: "🔔",
          color: "emerald-600"
        },
        {
          title: "Verify with Friends",
          detail: "If a friend's account sends you a strange link, call them directly — their account may be hacked.",
          icon: "📞",
          color: "primary"
        }
      ]
    }
  ];

  return (
    <div className="p-6 md:p-10">
      <h2 className="text-2xl md:text-[28px] font-bold mb-2 text-text-main">Facebook Safety</h2>
      <p className="mb-8 md:mb-10 text-text-muted text-sm md:text-base font-medium">Learn how to spot scams and stay safe on Facebook.</p>

      <div className="space-y-12 md:space-y-16">
        {sections.map((section, sIdx) => (
          <section key={sIdx}>
            <h3 className="text-xl md:text-2xl font-bold text-text-main mb-6">
              {section.header}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {section.tips.map((tip, tIdx) => {
                // Determine color classes based on the tip's color property
                let bgClass = "bg-white";
                let iconBgClass = "bg-primary/10";
                let iconTextClass = "text-primary";
                
                if (tip.color === "destructive") {
                  iconBgClass = "bg-destructive/10";
                  iconTextClass = "text-destructive";
                } else if (tip.color === "emerald-600") {
                  iconBgClass = "bg-emerald-600/10";
                  iconTextClass = "text-emerald-600";
                } else if (tip.color === "secondary") {
                  iconBgClass = "bg-secondary/10";
                  iconTextClass = "text-secondary-dark";
                }

                return (
                  <div key={tIdx} className="p-6 md:p-8 bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.06)] border border-border-main hover:bg-bg-main transition-all group">
                    <div className="flex items-center gap-4 mb-3 md:mb-4">
                      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-xl md:text-2xl flex-shrink-0 group-hover:scale-110 transition-transform ${iconBgClass} ${iconTextClass}`}>
                        {tip.icon}
                      </div>
                      <h4 className="font-bold text-text-main text-base md:text-lg">{tip.title}</h4>
                    </div>
                    <p className="text-sm md:text-base text-text-muted leading-relaxed font-medium">
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

