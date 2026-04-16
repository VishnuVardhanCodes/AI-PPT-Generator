import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

interface ProgressBarProps {
  currentStep: number;
}

const steps = [
  "Deep Thinking",
  "Curating Media",
  "Assembling Deck",
  "Finishing Touches"
];

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="max-w-3xl mx-auto my-16 px-4">
      <div className="relative h-2 bg-white/5 rounded-full overflow-hidden mb-12 border border-white/5">
        <motion.div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary via-primary-dark to-accent shadow-[0_0_20px_rgba(99,102,241,0.5)]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "circOut" }}
        />
      </div>
      
      <div className="grid grid-cols-4 gap-4">
        {steps.map((step, idx) => {
          const isCompleted = idx < currentStep;
          const isActive = idx === currentStep;
          const isPending = idx > currentStep;

          return (
            <div key={idx} className="flex flex-col items-center gap-4 relative">
              <motion.div 
                animate={{ 
                  scale: isActive ? 1.2 : 1,
                  opacity: isPending ? 0.3 : 1
                }}
                className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-700 ${
                  isCompleted 
                    ? 'bg-primary text-white' 
                    : isActive
                      ? 'bg-white text-primary shadow-2xl shadow-primary/40'
                      : 'bg-white/5 text-slate-600 border border-white/10'
                }`}
              >
                {isCompleted ? (
                   <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <span className="text-xs font-black">{idx + 1}</span>
                )}
              </motion.div>
              <span className={`text-[10px] font-black uppercase tracking-[0.2em] text-center transition-all duration-700 ${
                isActive ? 'text-white' : isCompleted ? 'text-primary' : 'text-slate-700'
              }`}>
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
