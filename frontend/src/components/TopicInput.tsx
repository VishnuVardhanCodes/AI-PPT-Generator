import React from 'react';
import { motion } from 'motion/react';
import { LayoutGrid, Sparkles } from 'lucide-react';

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
      className="max-w-3xl mx-auto p-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20"
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">Presentation Topic</label>
          <div className="relative">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter your presentation topic..."
              className="w-full px-6 py-4 rounded-2xl border-2 border-slate-100 focus:border-primary focus:ring-0 outline-none text-lg transition-all"
            />
            <Sparkles className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">Slide Count</label>
            <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 rounded-2xl">
              {[5, 10, 15].map((count) => (
                <button
                  key={count}
                  onClick={() => setSlideCount(count)}
                  className={`py-2.5 px-4 rounded-xl text-sm font-bold transition-all ${
                    slideCount === count 
                      ? 'bg-white text-primary shadow-sm' 
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {count} Slides
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-end flex-initial">
             <button
              onClick={onGenerate}
              disabled={isLoading || !topic.trim()}
              className="btn-gradient w-full md:w-auto flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating...
                </span>
              ) : (
                <>
                  <LayoutGrid className="w-5 h-5" />
                  🎯 Generate Presentation
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
