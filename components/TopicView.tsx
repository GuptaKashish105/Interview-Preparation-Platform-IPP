import React, { useState } from 'react';
import { TopicContent } from '../types.ts';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  BookOpen, 
  MessageSquare, 
  Zap, 
  Lightbulb, 
  CheckCircle2, 
  Copy, 
  Check, 
  Terminal,
  Layout,
  Code2,
  Info,
  Brain,
  Sparkles
} from 'lucide-react';

interface TopicViewProps {
  content: TopicContent | null;
  isLoading: boolean;
  onBack: () => void;
}

const CodeBlock: React.FC<{ code: string }> = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  const lines = code.trim().split('\n');

  return (
    <div className="relative mt-4 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl bg-[#0d1117] w-full">
      <div className="flex items-center justify-between px-6 py-4 bg-[#161b22] border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 mr-4">
            <div className="w-3 h-3 rounded-full bg-red-500/90"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500/90"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500/90"></div>
          </div>
          <Terminal className="w-4 h-4 text-slate-500" />
          <span className="text-[11px] text-slate-400 font-mono tracking-wide">Solution.tsx</span>
        </div>
        <button
          onClick={handleCopy}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black transition-all border ${
            copied 
              ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' 
              : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 hover:bg-slate-700'
          }`}
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'COPIED' : 'COPY CODE'}
        </button>
      </div>
      
      <div className="relative flex">
        <div className="flex flex-col items-end pt-6 pb-6 w-12 bg-[#0d1117] border-r border-slate-800/60 select-none">
           {lines.map((_, i) => (
             <span key={i} className="text-[11px] text-slate-600 font-mono pr-3 leading-6 h-6">{i + 1}</span>
           ))}
        </div>
        <pre className="p-6 flex-1 text-[13px] font-mono leading-6 text-[#e6edf3] overflow-x-auto whitespace-pre scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          {code.trim()}
        </pre>
      </div>
    </div>
  );
};

const TopicView: React.FC<TopicViewProps> = ({ content, isLoading, onBack }) => {
  const [activeTab, setActiveTab] = useState<'learn' | 'interview'>('learn');
  const [isSimpleMode, setIsSimpleMode] = useState(false);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
        <div className="relative">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 border-4 border-indigo-100 border-t-indigo-600 rounded-full"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Brain className="w-8 h-8 text-indigo-600" />
          </div>
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-xl font-black text-slate-900">Synthesizing Insights</h3>
          <p className="text-slate-500 font-medium">Preparing senior-level documentation & practical examples...</p>
        </div>
      </div>
    );
  }

  if (!content) return null;

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-24">
      <motion.button 
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-all text-sm font-black uppercase tracking-widest group"
      >
        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        Back to Dashboard
      </motion.button>

      <div className="bg-white rounded-[48px] shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden">
        {/* Header Section */}
        <div className="p-10 md:p-14 pb-6">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-indigo-600 text-white text-[10px] font-black rounded-lg uppercase tracking-[0.2em] shadow-xl shadow-indigo-100">
              Interview Mastery
            </span>
            <span className="w-2 h-2 rounded-full bg-slate-200"></span>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
              Strategic Deep Dive
            </span>
          </div>
          
          <h1 className="text-5xl font-black text-slate-900 mb-10 tracking-tight leading-tight max-w-3xl">
            {content.title}
          </h1>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex p-2 bg-slate-50 rounded-[24px] w-fit border border-slate-100">
              <button 
                onClick={() => setActiveTab('learn')}
                className={`flex items-center gap-2 px-8 py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all ${
                  activeTab === 'learn' ? 'bg-white text-indigo-600 shadow-xl shadow-slate-200' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                Theory
              </button>
              <button 
                onClick={() => setActiveTab('interview')}
                className={`flex items-center gap-2 px-8 py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all ${
                  activeTab === 'interview' ? 'bg-white text-indigo-600 shadow-xl shadow-slate-200' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                Interview
              </button>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'learn' && (
                <motion.button 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={() => setIsSimpleMode(!isSimpleMode)}
                  className={`flex items-center gap-3 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all border-2 ${
                    isSimpleMode 
                      ? 'bg-amber-50 border-amber-200 text-amber-700 shadow-xl shadow-amber-100' 
                      : 'bg-white border-slate-100 text-slate-500 hover:border-indigo-200 hover:text-indigo-600'
                  }`}
                >
                  <Zap className={`w-4 h-4 ${isSimpleMode ? 'fill-amber-500' : ''}`} />
                  {isSimpleMode ? 'Advanced Mode' : 'Explain Simply'}
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-10 md:p-14 pt-4">
          <AnimatePresence mode="wait">
            {activeTab === 'learn' ? (
              <motion.div 
                key="learn-tab"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12"
              >
                <section className="space-y-8">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-2xl ${isSimpleMode ? 'bg-amber-500 shadow-amber-100' : 'bg-indigo-600 shadow-indigo-100'}`}>
                      <Lightbulb className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-slate-900">
                        {isSimpleMode ? 'The Simple Analogy' : 'Architectural Breakdown'}
                      </h3>
                      <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Core Concept Mastery</p>
                    </div>
                  </div>
                  
                  <div className={`prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-wrap p-10 rounded-[40px] border-2 text-lg font-medium ${isSimpleMode ? 'bg-amber-50/30 border-amber-100' : 'bg-slate-50/50 border-slate-100'}`}>
                    {isSimpleMode ? content.simpleExplanation : content.conceptExplainer}
                  </div>
                </section>

                {content.visualDiagram && (
                  <section className="space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-2xl shadow-emerald-100">
                        <Layout className="w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-slate-900">Visual Flow</h3>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Mental Model Visualization</p>
                      </div>
                    </div>
                    <div className="bg-slate-900 rounded-[40px] p-10 overflow-x-auto shadow-2xl border border-slate-800">
                      <pre className="text-emerald-400 font-mono text-sm leading-relaxed">
                        {content.visualDiagram}
                      </pre>
                    </div>
                  </section>
                )}

                <section className="space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-violet-600 flex items-center justify-center text-white shadow-2xl shadow-violet-100">
                      <Sparkles className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-slate-900">Senior Perspectives</h3>
                      <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Real-world Wisdom</p>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {content.seniorInsights.map((insight, idx) => (
                      <motion.div 
                        key={idx} 
                        whileHover={{ scale: 1.02 }}
                        className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/50 flex gap-5 hover:border-indigo-200 transition-all"
                      >
                        <div className="text-indigo-500 shrink-0">
                          <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <p className="text-base text-slate-600 leading-relaxed font-bold">{insight}</p>
                      </motion.div>
                    ))}
                  </div>
                </section>
              </motion.div>
            ) : (
              <motion.div 
                key="interview-tab"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-16"
              >
                <div className="p-8 bg-indigo-50 rounded-[32px] border-2 border-indigo-100 text-indigo-900 flex gap-6 items-start">
                  <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shrink-0 shadow-xl shadow-indigo-100 border border-indigo-50">
                    <Info className="w-8 h-8 text-indigo-600" />
                  </div>
                  <div className="space-y-2">
                    <p className="font-black uppercase tracking-[0.2em] text-[10px] text-indigo-400">Strategic Tip</p>
                    <p className="text-lg font-bold leading-relaxed">
                      When presenting code in an interview, always explain the <span className="text-indigo-600">Trade-offs</span>. Senior engineers are hired for their judgment, not just their syntax.
                    </p>
                  </div>
                </div>

                {content.interviewQuestions.map((iq, idx) => (
                  <div key={idx} className="space-y-10">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 rounded-[24px] bg-slate-900 text-white flex items-center justify-center font-black text-2xl shrink-0 shadow-2xl shadow-slate-200">
                        {idx + 1}
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-3xl font-black text-slate-900 leading-tight">{iq.question}</h4>
                        <p className="text-indigo-500 text-xs font-black uppercase tracking-[0.2em]">High-Probability Scenario</p>
                      </div>
                    </div>
                    
                    <div className="grid lg:grid-cols-2 gap-8 ml-0 lg:ml-22">
                      <div className="p-10 bg-slate-50 rounded-[40px] border border-slate-100 space-y-4">
                        <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Response Strategy</h5>
                        <p className="text-slate-800 text-lg leading-relaxed font-bold">{iq.answer}</p>
                      </div>
                      <div className="p-10 bg-white rounded-[40px] border-l-8 border-indigo-500 shadow-2xl shadow-indigo-50/50 space-y-4">
                        <h5 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.3em]">Engineering Impact</h5>
                        <p className="text-slate-600 text-base italic leading-relaxed font-medium">{iq.explanation}</p>
                      </div>
                    </div>

                    <div className="ml-0 lg:ml-22">
                      <div className="flex items-center gap-3 mb-4 px-2">
                        <Code2 className="w-5 h-5 text-slate-400" />
                        <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Optimized Implementation</h5>
                      </div>
                      <CodeBlock code={iq.practicalExample || "// Implementation details..."} />
                    </div>
                    {idx < content.interviewQuestions.length - 1 && <div className="border-b border-slate-100 pt-10"></div>}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex justify-center pt-8"
      >
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="bg-slate-900 hover:bg-indigo-600 text-white px-16 py-6 rounded-[32px] font-black text-lg shadow-2xl shadow-slate-300 transition-all flex items-center gap-4 group"
        >
          Complete This Milestone
          <CheckCircle2 className="w-6 h-6 group-hover:scale-125 transition-transform" />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default TopicView;
