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
import { generatePresentationContent, SlideContent } from './services/groqService';
import { fetchSlideImage } from './services/imageService';
import { generatePptFile } from './services/pptService';
import { AlertCircle, RefreshCw } from 'lucide-react';
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
      // Step 1: Generating content (Groq)
      setCurrentStep(0);
      const content = await generatePresentationContent(topic, slideCount);
      
      // Step 2: Fetching images (Unsplash)
      setCurrentStep(1);
      const fullSlides: FullSlide[] = [];
      
      // Process images in parallel
      const imagePromises = content.map(async (slide) => {
        const imageUrl = await fetchSlideImage(slide.imageKeyword || slide.heading);
        return { ...slide, imageUrl };
      });
      
      const results = await Promise.all(imagePromises);
      fullSlides.push(...results);
      
      // Step 3: Building PPT (Preparing data)
      setCurrentStep(2);
      setSlides(fullSlides);
      
      // Step 4: Ready!
      setCurrentStep(3);
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
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-from),_transparent_80%),radial-gradient(circle_at_bottom_left,_var(--tw-gradient-to),_transparent_80%)] from-primary/5 to-accent/5 overflow-x-hidden">
      <Header />

      <main className="container mx-auto px-4 pb-20">
        <AnimatePresence mode="wait">
          {!slides.length && !isLoading && !error && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <TopicInput 
                topic={topic}
                setTopic={setTopic}
                slideCount={slideCount}
                setSlideCount={setSlideCount}
                onGenerate={handleGenerate}
                isLoading={isLoading}
              />
            </motion.div>
          )}

          {isLoading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-12"
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
              className="max-w-2xl mx-auto mt-12 p-8 bg-red-50 border border-red-100 rounded-3xl"
            >
              <div className="flex items-start gap-4 text-red-600 mb-6">
                <AlertCircle className="w-8 h-8 shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Oops! Something went wrong</h3>
                  <p className="font-medium opacity-90">{error}</p>
                </div>
              </div>
              <button 
                onClick={handleReset}
                className="w-full py-4 bg-red-600 text-white font-bold rounded-2xl hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                Try Again
              </button>
            </motion.div>
          )}

          {slides.length > 0 && !isLoading && (
            <motion.div
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <SlidePreview 
                slides={slides} 
                topic={topic} 
                onDownload={handleDownload}
                isDownloading={isDownloading}
              />
              
              <div className="flex justify-center mt-12">
                <button 
                  onClick={handleReset}
                  className="flex items-center gap-2 text-slate-400 hover:text-primary font-bold transition-colors uppercase tracking-widest text-sm"
                >
                  <RefreshCw className="w-4 h-4" />
                  Generate Another One
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="py-12 text-center text-slate-400 text-sm font-medium">
        <p>© {new Date().getFullYear()} AI PPT Generator. All rights reserved.</p>
        <p className="mt-1">Powered by Groq & Unsplash</p>
      </footer>
    </div>
  );
}
