
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Heart, 
  BookOpen, 
  ShieldCheck, 
  Search, 
  Zap, 
  CheckCircle2, 
  Users,
  Smartphone,
  Info
} from 'lucide-react';

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
            className="absolute inset-0 bg-text-main/60 backdrop-blur-md"
          />
          
          {/* Modal Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-border-main"
          >
            {/* Header */}
            <div className="p-8 border-b border-border-main flex justify-between items-center bg-bg-main/50 backdrop-blur-sm sticky top-0 z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                  <span className="text-white font-black text-2xl">R</span>
                </div>
                <div className="space-y-0.5">
                  <h2 className="text-2xl font-bold text-text-main">About RescueKit</h2>
                  <p className="text-xs font-bold uppercase tracking-widest text-primary">Our Mission & Values</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="w-12 h-12 rounded-2xl bg-bg-main border border-border-main flex items-center justify-center transition-all text-text-muted hover:text-text-main hover:shadow-sm active:scale-95"
              >
                <X size={24} />
              </button>
            </div>

            {/* Body */}
            <div className="p-8 md:p-10 overflow-y-auto space-y-12">
              <section className="space-y-4">
                <div className="flex items-center gap-3 text-primary">
                  <Heart size={24} fill="currentColor" className="opacity-20" />
                  <h3 className="text-xl font-bold text-text-main">Our Mission</h3>
                </div>
                <p className="text-lg text-text-muted leading-relaxed font-medium">
                  RescueKit was created with one goal: to make technology less frustrating for older adults. We believe that everyone deserves a phone that works smoothly, without being bombarded by confusing ads or slowed down by unnecessary apps.
                </p>
              </section>

              <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="card-premium p-6 bg-primary/5 border-primary/10 space-y-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm">
                    <BookOpen size={24} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-text-main">Step-by-Step Guides</h4>
                    <p className="text-sm text-text-muted font-medium">Clear instructions tailored to your specific phone brand.</p>
                  </div>
                </div>
                <div className="card-premium p-6 bg-emerald-50 border-emerald-100 space-y-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm">
                    <ShieldCheck size={24} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-text-main">Ad Blocking</h4>
                    <p className="text-sm text-text-muted font-medium">Simple ways to stop annoying pop-ups without installing new apps.</p>
                  </div>
                </div>
                <div className="card-premium p-6 bg-amber-50 border-amber-100 space-y-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-amber-600 shadow-sm">
                    <Search size={24} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-text-main">App Safety Check</h4>
                    <p className="text-sm text-text-muted font-medium">Instantly find out if an app is safe or if it's slowing you down.</p>
                  </div>
                </div>
                <div className="card-premium p-6 bg-purple-50 border-purple-100 space-y-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-purple-600 shadow-sm">
                    <Zap size={24} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-text-main">Performance Tips</h4>
                    <p className="text-sm text-text-muted font-medium">Easy habits to keep your device running like new.</p>
                  </div>
                </div>
              </section>

              <section className="space-y-6">
                <div className="flex items-center gap-3 text-primary">
                  <CheckCircle2 size={24} className="opacity-40" />
                  <h3 className="text-xl font-bold text-text-main">How It Helps</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-bg-main border border-border-main/50">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-primary shadow-sm flex-shrink-0">
                      <Info size={16} />
                    </div>
                    <p className="text-base text-text-muted font-medium leading-relaxed">
                      <strong className="text-text-main block mb-1">Simplifies Complexity</strong>
                      We translate "tech-speak" into plain English that anyone can understand.
                    </p>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-bg-main border border-border-main/50">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-primary shadow-sm flex-shrink-0">
                      <Users size={16} />
                    </div>
                    <p className="text-base text-text-muted font-medium leading-relaxed">
                      <strong className="text-text-main block mb-1">Empowers Users</strong>
                      Learn how to manage your own device settings safely and confidently.
                    </p>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-bg-main border border-border-main/50">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-primary shadow-sm flex-shrink-0">
                      <Smartphone size={16} />
                    </div>
                    <p className="text-base text-text-muted font-medium leading-relaxed">
                      <strong className="text-text-main block mb-1">Protects Privacy</strong>
                      We show you how to block trackers and avoid scammy apps effectively.
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* Footer */}
            <div className="p-8 bg-bg-main/50 backdrop-blur-sm border-t border-border-main text-center sticky bottom-0 z-10">
              <button 
                onClick={onClose}
                className="btn-tactile btn-primary px-12 py-4 text-lg shadow-xl shadow-primary/20"
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

