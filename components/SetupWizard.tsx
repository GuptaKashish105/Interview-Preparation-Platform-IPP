
import React, { useState } from 'react';
import { UserLevel } from '../types.ts';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Rocket, Target, Brain, ArrowRight, CheckCircle2 } from 'lucide-react';

interface SetupWizardProps {
  onStart: (topics: string[], level: UserLevel) => void;
  initialTopics?: string[];
  initialLevel?: UserLevel;
}

const SetupWizard: React.FC<SetupWizardProps> = ({ onStart, initialTopics, initialLevel }) => {
  const [topics, setTopics] = useState(
    initialTopics && initialTopics.length > 0 
      ? initialTopics.join(', ') 
      : "JavaScript, React, TypeScript, Node.js, Next.js, Micro Frontends"
  );
  const [level, setLevel] = useState<UserLevel>(initialLevel || UserLevel.MID_LEVEL);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const topicList = topics.split(',').map(t => t.trim()).filter(t => t.length > 0);
    if (topicList.length === 0) {
      alert("Please enter at least one topic.");
      return;
    }
    onStart(topicList, level);
  };

  return (
    <div className="flex-1 flex items-center justify-center p-6 md:p-12 bg-grid min-h-screen">
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-10"
        >
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl text-white text-3xl font-black shadow-2xl shadow-indigo-200"
          >
            S
          </motion.div>
          
          <div className="space-y-6">
            <h1 className="text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
              Crack Your Next <br />
              <span className="text-gradient">Dream Interview.</span>
            </h1>
            <p className="text-slate-500 text-xl leading-relaxed max-w-lg">
              Stop learning randomly. Get a personalized 30-day interview roadmap tailored to your level and tech stack.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-5 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all"
            >
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
                <Target className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-800 text-base">Interview Focused</h4>
              <p className="text-sm text-slate-500 mt-1">Every topic is selected for its high probability in technical rounds.</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-5 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all"
            >
              <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-4">
                <Brain className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-800 text-base">Level Specific</h4>
              <p className="text-sm text-slate-500 mt-1">Curriculum adjusts based on whether you're a Fresher or Senior.</p>
            </motion.div>
          </div>

          <div className="flex items-center gap-4 text-slate-400 text-sm font-medium">
            <div className="flex -space-x-2">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                  <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="user" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
            <span>Joined by 10,000+ engineers this month</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <form onSubmit={handleSubmit} className="glass p-8 md:p-12 rounded-[48px] shadow-2xl border border-white/40 space-y-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Sparkles className="w-24 h-24 text-indigo-600" />
            </div>

            <div className="space-y-6">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                Select Your Career Stage
              </label>
              <div className="grid grid-cols-3 gap-4">
                {Object.values(UserLevel).map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLevel(l)}
                    className={`py-5 px-2 rounded-2xl text-xs font-black transition-all border-2 relative overflow-hidden ${
                      level === l 
                        ? 'bg-slate-900 border-slate-900 text-white shadow-2xl' 
                        : 'bg-slate-50 border-slate-100 text-slate-500 hover:border-indigo-200'
                    }`}
                  >
                    {level === l && (
                      <motion.div 
                        layoutId="active-level"
                        className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 opacity-10"
                      />
                    )}
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <label htmlFor="topics" className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                Target Technologies
              </label>
              <div className="relative">
                <textarea
                  id="topics"
                  rows={3}
                  value={topics}
                  onChange={(e) => setTopics(e.target.value)}
                  placeholder="e.g. React, Node.js, System Design"
                  className="w-full p-6 bg-slate-50 border-2 border-slate-100 rounded-[32px] focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-slate-700 font-bold placeholder:text-slate-300 resize-none"
                />
                <div className="absolute bottom-4 right-6 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                  {topics.split(',').length} Topics
                </div>
              </div>
              <p className="text-[10px] text-slate-400 font-bold italic px-2">
                Separate with commas. We'll build your plan around these.
              </p>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-6 rounded-[32px] font-black text-xl shadow-2xl shadow-indigo-200 transition-all flex items-center justify-center gap-4 group"
            >
              Generate Interview Roadmap
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </motion.button>
            
            <div className="flex items-center justify-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                AI-Powered
              </div>
              <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                30-Day Plan
              </div>
            </div>
          </form>
        </motion.div>
      </div>
      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(-5%); animation-timing-function: cubic-bezier(0.8,0,1,1); }
          50% { transform: none; animation-timing-function: cubic-bezier(0,0,0.2,1); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite;
        }
      `}</style>
    </div>
  );
};

export default SetupWizard;
