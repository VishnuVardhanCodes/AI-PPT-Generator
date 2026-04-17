/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Header } from './components/Header';
import { TopicInput } from './components/TopicInput';
import { ProgressBar } from './components/ProgressBar';
import { Loader } from './components/Loader';
import { SlidePreview } from './components/SlidePreview';
import { Workflow } from './components/Workflow';
import { generatePresentationContent, SlideContent } from './services/groqService';
import { fetchSlideImage } from './services/imageService';
import { generatePptFile } from './services/pptService';
import { AlertCircle, RefreshCw, Presentation, Sparkles, Wand2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type FullSlide = SlideContent & { imageUrl: string };

export default function App() {
  const [topic, setTopic] = useState('');
  const [slideCount, setSlideCount] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [error, setError] = useState<string | null>(null);
  const [slides, setSlides] = useState<FullSlide[]>([]);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;

    setIsLoading(true);
    setError(null);
    setSlides([]);
    
    try {
      setCurrentStep(0);
      const content = await generatePresentationContent(topic, slideCount);
      
      setCurrentStep(1);
      const imagePromises = content.map(async (slide) => {
        const imageUrl = await fetchSlideImage(slide.imageKeyword || slide.heading);
        return { ...slide, imageUrl };
      });
      
      const results = await Promise.all(imagePromises);
      setCurrentStep(3);
      setSlides(results);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An unexpected error occurred. Please check your API keys.');
      setCurrentStep(-1);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    if (slides.length === 0) return;
    setIsDownloading(true);
    try {
      await generatePptFile(slides, topic);
    } catch (err: any) {
      console.error(err);
      setError('Failed to generate PPT file. ' + err.message);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleReset = () => {
    setSlides([]);
    setCurrentStep(-1);
    setError(null);
  };

  return (
    <div className="min-h-screen relative selection:bg-primary/30">
      {/* Animated Background Layers */}
      <div className="fixed inset-0 bg-[#030712] -z-20" />
      <div className="fixed inset-0 bg-animate opacity-30 -z-10" />
      
      <Header />

      <main className="container mx-auto px-6 pb-32">
        <AnimatePresence mode="wait">
          {!slides.length && !isLoading && !error && (
            <motion.div
              key="input"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
            >
              <TopicInput 
                topic={topic}
                setTopic={setTopic}
                slideCount={slideCount}
                setSlideCount={setSlideCount}
                onGenerate={handleGenerate}
                isLoading={isLoading}
              />
              <Workflow />
            </motion.div>
          )}

          {isLoading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="py-20"
            >
              <ProgressBar currentStep={currentStep} />
              <Loader />
            </motion.div>
          )}

          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto mt-12 p-12 glass-card border-red-500/20 text-center"
            >
              <div className="flex flex-col items-center gap-6">
                <div className="p-4 bg-red-500/10 rounded-full">
                  <AlertCircle className="w-12 h-12 text-red-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">Generation Failed</h3>
                  <p className="text-slate-400 font-medium leading-relaxed">{error}</p>
                </div>
                <button 
                  onClick={handleReset}
                  className="mt-4 px-8 py-4 bg-red-500 text-white font-bold rounded-2xl hover:bg-red-600 transition-all flex items-center justify-center gap-3 shadow-lg shadow-red-500/20"
                >
                  <RefreshCw className="w-5 h-5" />
                  Try Again Now
                </button>
              </div>
            </motion.div>
          )}

          {slides.length > 0 && !isLoading && (
            <motion.div
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-20"
            >
              <SlidePreview 
                slides={slides} 
                topic={topic} 
                onDownload={handleDownload}
                isDownloading={isDownloading}
              />
              
              <div className="flex justify-center">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="glass-card p-1 items-center overflow-hidden border-white/5"
                >
                  <button 
                    onClick={handleReset}
                    className="flex items-center gap-3 px-10 py-5 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-bold transition-all uppercase tracking-[0.2em] text-xs rounded-[1.5rem] group"
                  >
                    <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                    Create New Presentation
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="py-20 text-center space-y-4 border-t border-white/5 bg-black/20 backdrop-blur-sm">
        <div className="flex justify-center gap-6 mb-8 opacity-50">
           <Presentation className="w-5 h-5" />
           <Sparkles className="w-5 h-5" />
           <Wand2 className="w-5 h-5" />
        </div>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">
          © {new Date().getFullYear()} AI PPT Generator — Future of Content
        </p>
        <div className="flex justify-center gap-4 text-slate-600 text-[10px] font-black uppercase tracking-widest">
          <span>Powered by Groq Llama 3.3</span>
          <span className="w-1 h-1 bg-slate-800 rounded-full mt-1" />
          <span>Unsplash API</span>
        </div>
      </footer>
    </div>
  );
}
