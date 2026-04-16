import React from 'react';
import { motion } from 'motion/react';
import { SlideContent } from '../services/groqService';
import { Download, Layout } from 'lucide-react';

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
      className="max-w-7xl mx-auto px-4 py-20"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">📄 Slide Previews</h2>
          <p className="text-slate-500 font-medium font-mono text-sm uppercase tracking-widest">
            {slides.length} SLIDES GENERATED FOR: {topic}
          </p>
        </div>
        
        <button
          onClick={onDownload}
          disabled={isDownloading}
          className="btn-gradient flex items-center justify-center gap-3 py-4"
        >
          {isDownloading ? (
             <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Download className="w-5 h-5" />
          )}
          <span className="text-lg uppercase tracking-wider">Download Presentation</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {slides.map((slide, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all overflow-hidden border border-slate-100"
          >
            <div className="bg-primary h-8 flex items-center px-4 bg-gradient-to-r from-primary to-primary/80">
              <span className="text-[10px] uppercase font-bold text-white tracking-widest flex items-center gap-2">
                <Layout className="w-3 h-3" />
                Slide {idx + 1}
              </span>
            </div>
            
            <div className="p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4 uppercase line-clamp-2 min-h-[3.5rem]">
                {slide.heading}
              </h3>
              
              <div className="space-y-3 mb-6">
                {slide.bulletPoints.map((bullet, bIdx) => (
                  <div key={bIdx} className="flex gap-3 text-sm text-slate-600">
                    <span className="text-primary font-bold">•</span>
                    <p className="flex-1">{bullet}</p>
                  </div>
                ))}
              </div>

              <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shadow-inner">
                <img 
                  src={slide.imageUrl} 
                  alt={slide.heading}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
