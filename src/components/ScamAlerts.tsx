import React from 'react';

const ScamAlerts: React.FC = () => {
  const sections = [
    {
      header: "📞 Fake Amazon & Online Store Calls",
      tips: [
        {
          title: "Amazon will NEVER call you about a suspicious order or charge.",
          detail: "If someone calls claiming to be Amazon — hang up immediately.",
          icon: "📞",
          color: "destructive"
        },
        {
          title: "Scammers say: 'Your account has been charged $399. Press 1 to cancel.'",
          detail: "This is 100% fake. Amazon does not call customers.",
          icon: "⚠️",
          color: "amber-600"
        },
        {
          title: "Never give your Amazon password, credit card number, or verification code to anyone who calls you.",
          detail: "Legitimate companies will never ask for this information over the phone.",
          icon: "🔑",
          color: "destructive"
        },
        {
          title: "If worried, hang up and call Amazon yourself at 1-888-280-4331.",
          detail: "Always use official contact numbers you find yourself.",
          icon: "🛡️",
          color: "emerald-600"
        }
      ]
    },
    {
      header: "🏦 Fake Bank & Credit Card Calls",
      tips: [
        {
          title: "Your real bank will NEVER ask for your full card number, PIN, or online banking password over the phone.",
          detail: "Banks already have this information and will never ask you to 'verify' it this way.",
          icon: "🏦",
          color: "destructive"
        },
        {
          title: "Scammers say: 'We detected fraud on your account. We need to verify your card number to protect you.'",
          detail: "This is the scam itself. They are trying to steal your card details.",
          icon: "💳",
          color: "amber-600"
        },
        {
          title: "If someone calls claiming to be your bank, hang up and call the number on the BACK of your debit or credit card.",
          detail: "This ensures you are actually talking to your bank.",
          icon: "📞",
          color: "emerald-600"
        },
        {
          title: "Real banks never ask you to transfer money to a 'safe account' to protect it from fraud.",
          detail: "That IS the fraud. Once you transfer the money, it's gone.",
          icon: "🛑",
          color: "destructive"
        }
      ]
    },
    {
      header: "🎁 Gift Card Scams",
      tips: [
        {
          title: "NO government agency, bank, Amazon, Apple, or any legitimate company will EVER ask you to pay with gift cards. Ever.",
          detail: "Gift cards are for gifts, not for payments or fees.",
          icon: "🎁",
          color: "destructive"
        },
        {
          title: "If someone tells you to buy Google Play, Apple, Target, or Walmart gift cards to pay a fine, fee, or debt — it is a scam.",
          detail: "Legitimate businesses do not accept other companies' gift cards as payment.",
          icon: "⚠️",
          color: "amber-600"
        },
        {
          title: "Scammers say: 'Buy $500 in gift cards and read us the numbers on the back.'",
          detail: "Once you read those numbers, the money is gone forever and cannot be traced.",
          icon: "💸",
          color: "amber-600"
        },
        {
          title: "The IRS, Social Security, Medicare, and utilities NEVER accept gift cards as payment.",
          detail: "Anyone asking for payment via gift card is a criminal.",
          icon: "👮",
          color: "destructive"
        }
      ]
    },
    {
      header: "₿ Bitcoin & Crypto ATM Scams",
      tips: [
        {
          title: "No government agency or legitimate company will ever ask you to send Bitcoin or use a Bitcoin ATM to pay anything.",
          detail: "Cryptocurrency is a favorite tool for scammers because it's irreversible.",
          icon: "₿",
          color: "destructive"
        },
        {
          title: "Scammers direct you to a Bitcoin ATM and stay on the phone while you deposit cash.",
          detail: "Once sent, the money cannot be recovered. They use pressure to keep you from thinking.",
          icon: "🏧",
          color: "destructive"
        },
        {
          title: "Common fake reasons: 'Pay your bail', 'Avoid arrest warrant', 'Protect your savings from hackers.'",
          detail: "All of these reasons are fake and designed to create panic.",
          icon: "🚨",
          color: "destructive"
        },
        {
          title: "If someone tells you to use a Bitcoin ATM for any reason, hang up and call a trusted family member immediately.",
          detail: "Getting a second opinion will help you see the scam.",
          icon: "👨‍👩‍👧‍👦",
          color: "emerald-600"
        }
      ]
    },
    {
      header: "👮 Fake Government & IRS Calls",
      tips: [
        {
          title: "The IRS will NEVER call you to demand immediate payment.",
          detail: "They always contact you by mail first and give you time to appeal.",
          icon: "✉️",
          color: "emerald-600"
        },
        {
          title: "Scammers say: 'You owe back taxes and will be arrested in 2 hours if you don't pay now.'",
          detail: "This is designed to panic you into acting without thinking.",
          icon: "👮",
          color: "amber-600"
        },
        {
          title: "Social Security will never suspend your Social Security number or call to demand money.",
          detail: "Your SSN cannot be 'suspended' or 'blocked'.",
          icon: "🆔",
          color: "emerald-600"
        },
        {
          title: "If you get a threatening government call, hang up. Real agencies do not threaten arrest over the phone.",
          detail: "Government employees are professional and follow strict procedures.",
          icon: "📞",
          color: "emerald-600"
        }
      ]
    },
    {
      header: "💻 Tech Support Scams",
      tips: [
        {
          title: "Microsoft, Apple, and Google will NEVER call you to say your computer has a virus.",
          detail: "They have no way of knowing what is happening on your personal computer.",
          icon: "💻",
          color: "destructive"
        },
        {
          title: "Scammers say: 'We detected a virus on your computer. Give us remote access to fix it.'",
          detail: "They then steal your banking info or install actual malware.",
          icon: "🦠",
          color: "amber-600"
        },
        {
          title: "Never allow anyone who called YOU to access your computer remotely — not for any reason.",
          detail: "Remote access gives them full control over your files and accounts.",
          icon: "🛑",
          color: "destructive"
        },
        {
          title: "If a popup appears saying 'Call Microsoft at 1-800-XXX-XXXX' — close the browser.",
          detail: "It is a scam popup designed to look like a system warning.",
          icon: "⚠️",
          color: "destructive"
        }
      ]
    },
    {
      header: "🚨 If You Think You're Being Scammed",
      tips: [
        {
          title: "STOP — hang up or close the conversation immediately.",
          detail: "The longer you stay on the line, the more pressure they can apply.",
          icon: "🛑",
          color: "destructive"
        },
        {
          title: "Do NOT send money, gift cards, wire transfers, or crypto for any reason to someone who contacted you first.",
          detail: "Legitimate businesses don't use these methods for unexpected payments.",
          icon: "💸",
          color: "destructive"
        },
        {
          title: "Call a trusted family member before doing ANYTHING with money.",
          detail: "Talking it through with someone else often breaks the scammer's spell.",
          icon: "📞",
          color: "emerald-600"
        },
        {
          title: "Report it: Call the FTC at 1-877-382-4357 or go to reportfraud.ftc.gov",
          detail: "Reporting helps authorities track and stop these criminals.",
          icon: "📢",
          color: "primary"
        },
        {
          title: "You are NOT in trouble. Scammers create fake urgency to stop you from thinking clearly.",
          detail: "Take a breath. You have the power to just hang up.",
          icon: "🧘",
          color: "emerald-600"
        }
      ]
    }
  ];

  const carriers = [
    {
      name: "T-MOBILE",
      color: "bg-[#E20074]/10 border-[#E20074]/20 text-[#E20074]",
      codes: [
        { code: "#662#", action: "Activate Scam Block (free)" },
        { code: "#632#", action: "Turn Scam Block OFF" },
        { code: "#787#", action: "Check if Scam Block is ON" }
      ],
      note: "\"Scam Likely\" labels on incoming calls are automatic and free"
    },
    {
      name: "AT&T",
      color: "bg-[#00A8E0]/10 border-[#00A8E0]/20 text-[#00A8E0]",
      codes: [
        { code: "Download", action: "FREE \"AT&T ActiveArmor\" app" },
        { code: "App Settings", action: "Enable spam blocking in Call Protect" },
        { code: "*61* [number] #", action: "Block the last call received" }
      ],
      note: "AT&T ActiveArmor is the recommended way to manage spam"
    },
    {
      name: "VERIZON",
      color: "bg-[#CD040B]/10 border-[#CD040B]/20 text-[#CD040B]",
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
    <div className="p-6 md:p-10">
      <h2 className="text-2xl md:text-[28px] font-bold mb-2 text-text-main">Scam Alerts</h2>
      <p className="mb-8 md:mb-10 text-text-muted text-sm md:text-base font-medium">Protect yourself from common phone and online scams.</p>

      <div className="space-y-12 md:space-y-16">
        {sections.map((section, sIdx) => (
          <section key={sIdx}>
            <h3 className="text-xl md:text-2xl font-bold text-text-main mb-6">
              {section.header}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {section.tips.map((tip, tIdx) => {
                let iconBgClass = "bg-primary/10";
                let iconTextClass = "text-primary";
                
                if (tip.color === "destructive") {
                  iconBgClass = "bg-destructive/10";
                  iconTextClass = "text-destructive";
                } else if (tip.color === "emerald-600") {
                  iconBgClass = "bg-emerald-600/10";
                  iconTextClass = "text-emerald-600";
                } else if (tip.color === "amber-600") {
                  iconBgClass = "bg-amber-600/10";
                  iconTextClass = "text-amber-600";
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

        <section>
          <h3 className="text-xl md:text-2xl font-bold text-text-main mb-6">
            📵 How to Block Scam Calls on Your Phone
          </h3>
          
          <div className="mb-10">
            <h4 className="text-lg font-bold text-text-muted uppercase tracking-widest text-xs mb-6">Dial Codes by Carrier (Free)</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {carriers.map((carrier, cIdx) => (
                <div key={cIdx} className={`p-6 md:p-8 rounded-2xl border ${carrier.color} shadow-sm`}>
                  <h5 className="font-black text-sm mb-4 tracking-widest">{carrier.name}</h5>
                  <div className="space-y-3 mb-4">
                    {carrier.codes.map((item, iIdx) => (
                      <div key={iIdx} className="flex justify-between items-center gap-4">
                        <span className="font-mono font-bold bg-white/50 px-2 py-1 rounded text-sm">{item.code}</span>
                        <span className="text-xs md:text-sm font-bold text-right">{item.action}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] md:text-xs opacity-80 font-bold italic">
                    {carrier.note}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-10">
            <h4 className="text-lg font-bold text-text-muted uppercase tracking-widest text-xs mb-6">Free Apps to Block Scam Calls</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {[
                { title: "Hiya", detail: "Free app that auto-blocks known scam numbers. Available on Android and iPhone.", icon: "📱" },
                { title: "RoboKiller", detail: "Blocks robocalls and answers them with funny messages to waste scammers' time.", icon: "🤖" },
                { title: "Google Phone App", detail: "On Android, go to Settings → Spam and Call Screening → turn on Filter spam calls.", icon: "📞" },
                { title: "iPhone built-in", detail: "Go to Settings → Phone → Silence Unknown Callers to send unknown numbers to voicemail.", icon: "🍎" }
              ].map((app, aIdx) => (
                <div key={aIdx} className="p-6 bg-white rounded-2xl border border-border-main shadow-sm flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                    {app.icon}
                  </div>
                  <div>
                    <h5 className="font-bold text-text-main mb-1">{app.title}</h5>
                    <p className="text-sm text-text-muted font-medium leading-relaxed">{app.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold text-text-muted uppercase tracking-widest text-xs mb-6">⚡ Quick Actions During a Suspicious Call</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {[
                { title: "Don't say 'Yes'", detail: "Scammers record you saying yes to authorize fake charges. Say 'I'm not interested' and hang up.", icon: "🚫", color: "destructive" },
                { title: "Never press 1 or any number", detail: "Pressing numbers confirms your line is active and adds you to more scam lists.", icon: "🔢", color: "destructive" },
                { title: "You can hang up on anyone", detail: "It is not rude to hang up on a scammer. Real businesses understand.", icon: "☎️", color: "emerald-600" },
                { title: "Add to Do Not Call Registry", detail: "Go to donotcall.gov or call 1-888-382-1222 (free, takes 31 days to take effect).", icon: "📝", color: "primary" }
              ].map((action, iIdx) => (
                <div key={iIdx} className="p-6 bg-white rounded-2xl border border-border-main shadow-sm flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${
                    action.color === 'destructive' ? 'bg-destructive/10 text-destructive' : 
                    action.color === 'emerald-600' ? 'bg-emerald-600/10 text-emerald-600' : 
                    'bg-primary/10 text-primary'
                  }`}>
                    {action.icon}
                  </div>
                  <div>
                    <h5 className="font-bold text-text-main mb-1">{action.title}</h5>
                    <p className="text-sm text-text-muted font-medium leading-relaxed">{action.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ScamAlerts;
