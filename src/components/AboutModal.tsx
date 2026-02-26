
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#1A3B4A]/60 backdrop-blur-sm"
          />
          
          {/* Modal Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-surface rounded-[2rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-border-main"
          >
            {/* Header */}
            <div className="p-6 md:p-8 border-b border-border-main flex justify-between items-center bg-surface-muted">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-primary rounded-lg md:rounded-xl flex items-center justify-center">
                  <span className="text-white font-black text-base md:text-xl">R</span>
                </div>
                <h2 className="text-xl md:text-2xl font-extrabold text-text-main">About RescueKit</h2>
              </div>
              <button 
                onClick={onClose}
                className="w-8 h-8 md:w-10 md:h-10 rounded-full hover:bg-surface-muted flex items-center justify-center transition-colors text-text-muted hover:text-text-main"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="p-6 md:p-8 overflow-y-auto space-y-6 md:space-y-8">
              <section>
                <h3 className="text-lg md:text-xl font-bold text-text-main mb-2 md:mb-3">Our Mission</h3>
                <p className="text-sm md:text-base text-text-muted leading-relaxed">
                  The Senior Android Rescue Kit was created with one goal: to make technology less frustrating for older adults. We believe that everyone deserves a phone that works smoothly, without being bombarded by confusing ads or slowed down by unnecessary apps.
                </p>
              </section>

              <section className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                <div className="p-4 md:p-5 bg-primary/10 rounded-xl md:rounded-2xl border border-primary/20">
                  <div className="text-xl md:text-2xl mb-1 md:mb-2">📖</div>
                  <h4 className="font-bold text-sm md:text-base text-primary mb-0.5 md:mb-1">Step-by-Step Guides</h4>
                  <p className="text-xs text-text-muted">Clear instructions tailored to your specific phone brand.</p>
                </div>
                <div className="p-4 md:p-5 bg-emerald-500/10 rounded-xl md:rounded-2xl border border-emerald-500/20">
                  <div className="text-xl md:text-2xl mb-1 md:mb-2">🛡️</div>
                  <h4 className="font-bold text-sm md:text-base text-emerald-500 mb-0.5 md:mb-1">Ad Blocking</h4>
                  <p className="text-xs text-text-muted">Simple ways to stop annoying pop-ups without installing new apps.</p>
                </div>
                <div className="p-4 md:p-5 bg-amber-500/10 rounded-xl md:rounded-2xl border border-amber-500/20">
                  <div className="text-xl md:text-2xl mb-1 md:mb-2">🔍</div>
                  <h4 className="font-bold text-sm md:text-base text-amber-500 mb-0.5 md:mb-1">App Safety Check</h4>
                  <p className="text-xs text-text-muted">Instantly find out if an app is safe or if it's slowing you down.</p>
                </div>
                <div className="p-4 md:p-5 bg-rose-500/10 rounded-xl md:rounded-2xl border border-rose-500/20">
                  <div className="text-xl md:text-2xl mb-1 md:mb-2">⚡</div>
                  <h4 className="font-bold text-sm md:text-base text-rose-500 mb-0.5 md:mb-1">Performance Tips</h4>
                  <p className="text-xs text-text-muted">Easy habits to keep your device running like new.</p>
                </div>
              </section>

              <section>
                <h3 className="text-lg md:text-xl font-bold text-text-main mb-2 md:mb-3">How It Helps</h3>
                <ul className="space-y-2 md:space-y-3">
                  <li className="flex items-start gap-2 md:gap-3 text-xs md:text-sm text-text-muted">
                    <span className="text-primary font-bold">•</span>
                    <span><strong className="text-text-main">Simplifies Complexity:</strong> We translate "tech-speak" into plain English.</span>
                  </li>
                  <li className="flex items-start gap-2 md:gap-3 text-xs md:text-sm text-text-muted">
                    <span className="text-primary font-bold">•</span>
                    <span><strong className="text-text-main">Empowers Users:</strong> Learn how to manage your own device settings safely.</span>
                  </li>
                  <li className="flex items-start gap-2 md:gap-3 text-xs md:text-sm text-text-muted">
                    <span className="text-primary font-bold">•</span>
                    <span><strong className="text-text-main">Protects Privacy:</strong> We show you how to block trackers and avoid scammy apps.</span>
                  </li>
                </ul>
              </section>
            </div>

            {/* Footer */}
            <div className="p-6 md:p-8 bg-surface-muted border-t border-border-main text-center">
              <button 
                onClick={onClose}
                className="bg-primary text-white px-8 md:px-10 py-3 md:py-4 rounded-full font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all active:scale-95 text-sm md:text-base"
              >
                Got it, thanks!
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AboutModal;

