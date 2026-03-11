import React from 'react';
import { RoadmapItem } from '../types.ts';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  Lock, 
  ChevronRight, 
  RefreshCw, 
  Trash2, 
  Layout, 
  Target,
  Award
} from 'lucide-react';

interface SidebarProps {
  roadmap: RoadmapItem[];
  completedDays: number[];
  currentDay: number;
  topics?: string[];
  onSelectDay: (day: number) => void;
  onChangePath: () => void;
  onReset: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ roadmap, completedDays, currentDay, topics, onSelectDay, onChangePath, onReset }) => {
  const lastCompleted = completedDays.length > 0 ? Math.max(...completedDays) : 0;

  return (
    <aside className="w-80 bg-white border-r border-slate-100 hidden lg:flex flex-col h-screen sticky top-0">
      {/* Brand Section */}
      <div className="p-8 border-b border-slate-50">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-xl flex items-center justify-center text-white shadow-xl shadow-indigo-100">
            <Target className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">InterviewAI</h1>
        </div>
        <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Accelerator Platform</p>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {/* Topics Section */}
        {topics && topics.length > 0 && (
          <div className="p-6 border-b border-slate-50">
            <h3 className="px-2 mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Target Stack</h3>
            <div className="flex flex-wrap gap-2 px-2">
              {topics.map((topic, i) => (
                <span key={i} className="px-3 py-1 bg-slate-50 text-slate-600 text-[10px] rounded-lg font-bold border border-slate-100">
                  {topic}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Roadmap Section */}
        <nav className="p-6 space-y-2">
          <h3 className="px-2 mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">30-Day Roadmap</h3>
          {roadmap.map((item, idx) => {
            const isCompleted = completedDays.includes(item.day);
            const isCurrent = item.day === currentDay;
            const isLocked = item.day > lastCompleted + 1;
            
            return (
              <motion.button 
                key={item.day}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.02 }}
                disabled={isLocked}
                onClick={() => onSelectDay(item.day)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl text-sm transition-all text-left group relative ${
                  isCurrent 
                    ? 'bg-slate-900 text-white shadow-2xl shadow-slate-200' 
                    : isLocked
                      ? 'opacity-30 cursor-not-allowed'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {isCurrent && (
                  <motion.div 
                    layoutId="active-sidebar-item"
                    className="absolute inset-0 bg-slate-900 rounded-2xl -z-10"
                  />
                )}
                
                <div className={`w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center text-xs font-black transition-all ${
                  isCurrent 
                    ? 'bg-indigo-600 text-white' 
                    : isCompleted 
                      ? 'bg-emerald-100 text-emerald-600' 
                      : isLocked
                        ? 'bg-slate-100 text-slate-300'
                        : 'bg-slate-50 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600'
                }`}>
                  {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : item.day}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="font-black truncate">Day {item.day}</div>
                  {!isLocked && (
                    <div className={`text-[10px] truncate ${isCurrent ? 'text-slate-400' : 'text-slate-400'}`}>
                      {item.topics[0].title}
                    </div>
                  )}
                </div>

                {isLocked ? (
                  <Lock className="w-3 h-3 text-slate-300" />
                ) : (
                  <ChevronRight className={`w-4 h-4 transition-transform ${isCurrent ? 'text-indigo-400' : 'text-slate-300 group-hover:translate-x-1'}`} />
                )}
              </motion.button>
            );
          })}
        </nav>
      </div>

      {/* Footer Actions */}
      <div className="p-6 border-t border-slate-50 space-y-3">
        <div className="p-4 bg-indigo-50 rounded-2xl mb-4 flex items-center gap-3">
          <Award className="w-8 h-8 text-indigo-600" />
          <div>
            <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Next Milestone</div>
            <div className="text-xs font-black text-indigo-900">Day 10 Certificate</div>
          </div>
        </div>

        <button 
          onClick={onChangePath}
          className="w-full flex items-center gap-3 px-4 py-3 text-xs font-black text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all uppercase tracking-widest"
        >
          <RefreshCw className="w-4 h-4" />
          Change Path
        </button>
        <button 
          onClick={onReset}
          className="w-full flex items-center gap-3 px-4 py-3 text-xs font-black text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all uppercase tracking-widest"
        >
          <Trash2 className="w-4 h-4" />
          Reset Progress
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
