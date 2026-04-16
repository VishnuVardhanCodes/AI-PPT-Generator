import React from 'react';
import { motion } from 'motion/react';

interface ProgressBarProps {
  currentStep: number;
}

const steps = [
  "Generating content",
  "Fetching images",
  "Building PPT",
  "Ready!"
];

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="max-w-2xl mx-auto my-12 px-4">
      <div className="relative h-3 bg-slate-200 rounded-full overflow-hidden mb-8">
        <motion.div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-accent"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        {steps.map((step, idx) => (
          <div key={idx} className="flex flex-col items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${
              idx <= currentStep 
                ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                : 'bg-slate-100 text-slate-400'
            }`}>
              {idx + 1}
            </div>
            <span className={`text-[10px] md:text-xs font-bold uppercase tracking-wider text-center transition-all duration-500 ${
              idx <= currentStep ? 'text-primary' : 'text-slate-400'
            }`}>
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
