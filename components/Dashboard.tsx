import React from 'react';
import { UserProgress } from '../types.ts';
import { motion } from 'motion/react';
import { CheckCircle2, Circle, ArrowRight, Share2, Linkedin, Trophy, Calendar, Sparkles } from 'lucide-react';

interface DashboardProps {
  progress: UserProgress;
  onSelectTopic: (topic: { title: string; description: string }) => void;
  onCompleteDay: (day: number) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ progress, onSelectTopic, onCompleteDay }) => {
  const currentDayData = progress.roadmap?.find(r => r.day === progress.currentDay);
  const isCompleted = progress.completedDays.includes(progress.currentDay);
  
  const completionPercentage = Math.round((progress.completedDays.length / 30) * 100);

  if (!currentDayData) return null;

  const handleShareLinkedIn = () => {
    const text = `I'm on Day ${progress.currentDay} of my 30-day Interview Preparation journey for ${progress.topics.join(', ')}! 🚀\n\nJoin me in mastering technical interviews with AI-powered roadmaps. #InterviewPrep #SoftwareEngineering #CareerGrowth`;
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid lg:grid-cols-3 gap-8"
      >
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-3 text-indigo-600 font-black text-[10px] uppercase tracking-[0.3em]">
            <span className="w-12 h-[2px] bg-indigo-600"></span>
            Day {progress.currentDay} of 30
          </div>
          <h1 className="text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
            One Step <br />
            <span className="text-gradient">Closer to Mastery.</span>
          </h1>
          <p className="text-slate-500 text-xl font-medium max-w-xl leading-relaxed">
            Master today's high-impact topics to sharpen your edge for the next big interview. Consistency is the key to engineering excellence.
          </p>
        </div>

        <div className="glass p-8 rounded-[40px] flex flex-col justify-between relative overflow-hidden group border-2 border-white shadow-2xl shadow-slate-200">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-1000"></div>
          <div className="relative z-10 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Training Progress</span>
              <div className="p-2 bg-amber-50 rounded-xl">
                <Trophy className="w-5 h-5 text-amber-500" />
              </div>
            </div>
            <div>
              <div className="text-5xl font-black text-slate-900 mb-3">{completionPercentage}%</div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden p-0.5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${completionPercentage}%` }}
                  className="h-full bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full shadow-[0_0_10px_rgba(79,70,229,0.4)]"
                />
              </div>
            </div>
          </div>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleShareLinkedIn}
            className="mt-8 flex items-center justify-center gap-3 py-4 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-2xl shadow-slate-300"
          >
            <Linkedin className="w-4 h-4" />
            Share Progress
          </motion.button>
        </div>
      </motion.div>

      {/* Today's Topics */}
      <div className="grid md:grid-cols-2 gap-8">
        {currentDayData.topics.map((topic, idx) => (
          <motion.div
            key={topic.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -8 }}
            className="group relative bg-white p-8 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-indigo-100 transition-all cursor-pointer"
            onClick={() => onSelectTopic(topic)}
          >
            <div className="absolute top-8 right-8 w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-lg uppercase tracking-widest">
                  {topic.category}
                </span>
                <span className="px-3 py-1 bg-slate-50 text-slate-500 text-[10px] font-black rounded-lg uppercase tracking-widest">
                  {topic.level}
                </span>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{topic.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 font-medium">{topic.description}</p>
              </div>
              <div className="pt-4 flex items-center gap-2 text-indigo-600 text-xs font-black uppercase tracking-widest">
                Start Deep Dive
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Action Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 glass rounded-[40px]"
      >
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${isCompleted ? 'bg-emerald-100 text-emerald-600' : 'bg-indigo-100 text-indigo-600'}`}>
            {isCompleted ? <CheckCircle2 className="w-8 h-8" /> : <Calendar className="w-8 h-8" />}
          </div>
          <div>
            <h4 className="font-black text-slate-900 text-lg">{isCompleted ? 'Day Completed!' : 'Ready to wrap up?'}</h4>
            <p className="text-slate-500 text-sm font-medium">Marking this day as complete updates your 30-day roadmap.</p>
          </div>
        </div>
        
        <button
          onClick={() => onCompleteDay(progress.currentDay)}
          disabled={isCompleted}
          className={`px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl ${
            isCompleted 
              ? 'bg-emerald-50 text-emerald-600 cursor-default shadow-none' 
              : 'bg-slate-900 text-white hover:bg-indigo-600 shadow-indigo-100 active:scale-95'
          }`}
        >
          {isCompleted ? 'Day Finished' : 'Complete Day'}
        </button>
      </motion.div>

      {/* Upcoming Milestones */}
      <div className="space-y-6">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] px-2">Upcoming Milestones</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => {
            const nextItem = progress.roadmap?.find(r => r.day === progress.currentDay + i);
            if (!nextItem) return null;
            return (
              <motion.div 
                key={i} 
                whileHover={{ y: -4 }}
                className="flex items-center gap-4 bg-white p-5 rounded-[24px] border border-slate-100 opacity-60 hover:opacity-100 transition-all shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 font-black text-sm shrink-0">
                  {nextItem.day}
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-slate-800 truncate">{nextItem.topics[0].title}</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider truncate">{nextItem.topics[0].category}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
