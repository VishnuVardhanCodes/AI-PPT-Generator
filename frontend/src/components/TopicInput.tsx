import React from 'react';
import { motion } from 'motion/react';
import { LayoutGrid, Sparkles, Wand2 } from 'lucide-react';

interface TopicInputProps {
  topic: string;
  setTopic: (t: string) => void;
  slideCount: number;
  setSlideCount: (n: number) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

export const TopicInput: React.FC<TopicInputProps> = ({ 
  topic, 
  setTopic, 
  slideCount, 
  setSlideCount, 
  onGenerate,
  isLoading
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-3xl mx-auto p-12 glass-card relative overflow-hidden group"
    >
      {/* Subtle shine effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      <div className="space-y-10 relative z-10">
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Presentation Topic</label>
          </div>
          <div className="relative group/input">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. The Future of Quantum Computing..."
              className="w-full px-8 py-5 rounded-[1.5rem] glass-input text-xl text-white font-medium"
            />
            <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2 text-slate-500 group-focus-within/input:text-primary transition-colors">
              <kbd className="hidden md:block text-[10px] font-bold px-2 py-1 bg-white/5 rounded border border-white/10 uppercase tracking-widest text-slate-600">Enter</kbd>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-end">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <LayoutGrid className="w-4 h-4 text-primary" />
              <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Total Slides</label>
            </div>
            <div className="flex gap-3 p-2 bg-white/5 border border-white/10 rounded-2xl">
              {[5, 10, 15].map((count) => (
                <button
                  key={count}
                  onClick={() => setSlideCount(count)}
                  className={`flex-1 py-3 px-6 rounded-xl text-sm font-bold transition-all duration-300 ${
                    slideCount === count 
                      ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-100' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5 scale-95 hover:scale-100'
                  }`}
                >
                  {count} <span className="hidden sm:inline">Slides</span>
                </button>
              ))}
            </div>
          </div>

          <div className="w-full md:w-auto">
             <button
              onClick={onGenerate}
              disabled={isLoading || !topic.trim()}
              className="btn-premium w-full group/btn"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-3 border-white/20 border-t-white rounded-full animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  <span>Generate Magic</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
