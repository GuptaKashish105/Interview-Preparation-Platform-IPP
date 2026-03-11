import React from 'react';
import { motion } from 'motion/react';
import { 
  Settings, 
  User, 
  ChevronLeft, 
  Layout, 
  Sparkles,
  Share2,
  Linkedin
} from 'lucide-react';

interface HeaderProps {
  currentDay: number;
  level?: string;
  onChangePath: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentDay, level, onChangePath }) => {
  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-6 md:px-10 sticky top-0 z-30">
      <div className="flex items-center gap-6">
        <button 
          onClick={onChangePath}
          className="lg:hidden p-2.5 hover:bg-slate-100 rounded-xl text-slate-500 transition-all"
          title="Change Path"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <h2 className="text-sm font-black text-slate-900 tracking-tight leading-none mb-1">Training Session</h2>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-indigo-600 text-white text-[9px] font-black rounded uppercase tracking-widest shadow-lg shadow-indigo-100">
                Day {currentDay}
              </span>
              {level && (
                <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[9px] font-black rounded uppercase tracking-widest">
                  {level}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onChangePath}
          className="hidden md:flex items-center gap-2 px-4 py-2 text-[10px] font-black text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all uppercase tracking-widest border border-transparent hover:border-indigo-100"
        >
          <Settings className="w-4 h-4" />
          Configure Path
        </motion.button>

        <div className="h-8 w-[1px] bg-slate-100 hidden sm:block mx-2"></div>

        <div className="hidden sm:flex flex-col items-end mr-2">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Session</span>
          <span className="text-xs font-black text-slate-900 flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            Live AI Coach
          </span>
        </div>

        <motion.div 
          whileHover={{ scale: 1.1 }}
          className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-xl shadow-slate-200 cursor-pointer overflow-hidden border-2 border-white"
        >
          <img src="https://picsum.photos/seed/me/100/100" alt="profile" referrerPolicy="no-referrer" />
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
