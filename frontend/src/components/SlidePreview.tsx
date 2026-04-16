import React from 'react';
import { motion } from 'motion/react';
import { SlideContent } from '../services/groqService';
import { Download, Layout, Target } from 'lucide-react';

interface SlidePreviewProps {
  slides: (SlideContent & { imageUrl: string })[];
  topic: string;
  onDownload: () => void;
  isDownloading: boolean;
}

export const SlidePreview: React.FC<SlidePreviewProps> = ({ slides, topic, onDownload, isDownloading }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 px-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-1 bg-primary rounded-full" />
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-primary">Master Deck Generated</h2>
          </div>
          <h3 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Review your <span className="text-gradient">Presentation</span>
          </h3>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
            TOPIC: {topic}
          </p>
        </div>
        
        <button
          onClick={onDownload}
          disabled={isDownloading}
          className="btn-premium py-5 group/dl"
        >
          {isDownloading ? (
             <div className="w-6 h-6 border-3 border-white/20 border-t-white rounded-full animate-spin" />
          ) : (
            <Download className="w-6 h-6 group-hover:translate-y-1 transition-transform" />
          )}
          <span className="text-lg font-black uppercase tracking-wider">Download .PPTX File</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-4">
        {slides.map((slide, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
            className="group relative glass-card !rounded-[2.5rem] overflow-hidden border-white/5 hover:border-primary/30 transition-all duration-500"
          >
            <div className="absolute top-6 right-6 z-20">
               <span className="badge !text-white !bg-primary/20 !border-primary/20 backdrop-blur-md">
                 SLIDE {idx + 1}
               </span>
            </div>

            <div className="relative aspect-[16/10] overflow-hidden bg-slate-900 shadow-2xl">
              <img 
                src={slide.imageUrl} 
                alt={slide.heading}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-60 group-hover:opacity-100 transition-opacity"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
            </div>
            
            <div className="p-10 space-y-6">
              <h4 className="text-xl font-black text-white leading-tight uppercase tracking-wide group-hover:text-primary transition-colors">
                {slide.heading}
              </h4>
              
              <div className="space-y-4">
                {slide.bulletPoints.map((bullet, bIdx) => (
                  <div key={bIdx} className="flex gap-4 text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0 shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
                    <p className="font-medium leading-relaxed">{bullet}</p>
                  </div>
                ))}
              </div>

              <div className="pt-6 flex items-center justify-between border-t border-white/5">
                <div className="flex items-center gap-2 text-slate-600 text-[10px] font-bold uppercase tracking-widest">
                  <Target className="w-3 h-3" />
                  {slide.imageKeyword}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
