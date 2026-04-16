import React from 'react';
import { motion } from 'motion/react';
import { Loader2, Sparkles } from 'lucide-react';

export const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="relative mb-10">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 border-2 border-white/5 border-t-primary rounded-full shadow-[0_0_40px_rgba(99,102,241,0.2)]"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-8 h-8 text-primary" />
          </motion.div>
        </div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-3"
      >
        <h3 className="text-3xl font-black text-white uppercase tracking-tighter">
          Architecting your <span className="text-primary italic">Vision</span>
        </h3>
        <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px]">
          Synthesizing data · Curating assets · Designing layout
        </p>
      </motion.div>

      {/* Pulsing glow background */}
      <div className="absolute w-64 h-64 bg-primary/5 blur-[100px] rounded-full -z-10" />
    </div>
  );
};
