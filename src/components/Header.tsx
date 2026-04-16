import React from 'react';
import { motion } from 'motion/react';
import { Presentation } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-12 px-4"
    >
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="bg-primary p-3 rounded-2xl shadow-lg">
          <Presentation className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
          🎓 AI PPT Generator
        </h1>
      </div>
      <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
        Generate professional presentations using AI in seconds. 
        Just enter your topic and let the AI do the rest.
      </p>
    </motion.header>
  );
};
