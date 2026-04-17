import React from 'react';
import { motion } from 'motion/react';
import { Type, Brain, Image as ImageIcon, Download, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: <Type className="w-6 h-6" />,
    title: "Insightful Input",
    desc: "Provide any topic or concept you want to present.",
    color: "from-blue-500 to-cyan-400"
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: "AI Generation",
    desc: "Llama 3.3 crafts professional, structured slide content.",
    color: "from-purple-500 to-indigo-400"
  },
  {
    icon: <ImageIcon className="w-6 h-6" />,
    title: "Visual Magic",
    desc: "Unsplash API automatically finds semantic images for every slide.",
    color: "from-pink-500 to-rose-400"
  },
  {
    icon: <Download className="w-6 h-6" />,
    title: "Instant Export",
    desc: "Download your professional PPT file, ready to present.",
    color: "from-amber-500 to-orange-400"
  }
];

export const Workflow: React.FC = () => {
  return (
    <section className="mt-32 relative py-20">
      <div className="text-center mb-20">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tight"
        >
          The <span className="text-primary italic">Workflow</span> of Tomorrow
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-slate-500 uppercase tracking-[0.3em] text-[10px] font-bold"
        >
          From concept to completion in seconds
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
        {/* Animated Connecting Line (Desktop) */}
        <div className="hidden md:block absolute top-[50px] left-[10%] right-[10%] h-[2px] -z-10">
          <svg className="w-full h-full" preserveAspectRatio="none">
            <motion.path
              d="M 0 1 H 1000"
              stroke="url(#line-gradient)"
              strokeWidth="2"
              fill="none"
              strokeDasharray="10 10"
              initial={{ strokeDashoffset: 100 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <defs>
              <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="50%" stopColor="rgba(99, 102, 241, 0.3)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="relative group"
          >
            <div className="flex flex-col items-center text-center space-y-6">
              <div className={`w-24 h-24 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center relative group-hover:border-primary/50 transition-all duration-500 group-hover:-translate-y-2`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500`} />
                <div className={`text-slate-400 group-hover:text-white transition-colors duration-500`}>
                  {step.icon}
                </div>
                
                {/* Step Number Badge */}
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#030712] border border-white/10 flex items-center justify-center text-[10px] font-black text-primary">
                  0{idx + 1}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium px-4">
                  {step.desc}
                </p>
              </div>

              {idx < steps.length - 1 && (
                <div className="md:hidden py-4 text-white/5">
                  <ArrowRight className="w-6 h-6 rotate-90" />
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-64 bg-primary/5 blur-[120px] -z-20 rounded-full" />
    </section>
  );
};
