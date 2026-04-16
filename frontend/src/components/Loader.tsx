import React from 'react';
import { motion } from 'motion/react';
import { Loader2 } from 'lucide-react';

export const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-in fade-in zoom-in duration-500">
      <div className="relative mb-6">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-slate-100 border-t-primary rounded-full"
        />
        <Loader2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-primary animate-pulse" />
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-2">Generating your presentation...</h3>
      <p className="text-slate-500 font-medium">Our AI is researching and designing your slides.</p>
    </div>
  );
};
