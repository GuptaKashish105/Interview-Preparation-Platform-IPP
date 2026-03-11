
import React, { useState, useEffect } from 'react';
import './index.css';
import { AppStatus, UserProgress, TopicContent, UserLevel } from './types.ts';
import { generatePersonalizedRoadmap, generateTopicDeepDive } from './services/geminiService.ts';
import { Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import Sidebar from './components/Sidebar.tsx';
import Header from './components/Header.tsx';
import Dashboard from './components/Dashboard.tsx';
import TopicView from './components/TopicView.tsx';
import SetupWizard from './components/SetupWizard.tsx';

const App: React.FC = () => {
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [currentDay, setCurrentDay] = useState<number>(1);
  const [progress, setProgress] = useState<UserProgress>({
    completedDays: [],
    startDate: new Date().toISOString(),
    currentDay: 1,
    roadmap: null,
    topics: []
  });
  const [selectedTopic, setSelectedTopic] = useState<{ title: string; description: string } | null>(null);
  const [topicContent, setTopicContent] = useState<TopicContent | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('senior_path_progress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setProgress(parsed);
        setCurrentDay(parsed.currentDay || 1);
        setStatus(AppStatus.READY);
      } catch (e) {
        console.error("Failed to load progress:", e);
      }
    }
  }, []);

  const saveProgress = (newProgress: UserProgress) => {
    localStorage.setItem('senior_path_progress', JSON.stringify(newProgress));
    setProgress(newProgress);
  };

  const handleStartRoadmap = async (topics: string[], level: UserLevel) => {
    setStatus(AppStatus.GENERATING_ROADMAP);
    try {
      const roadmap = await generatePersonalizedRoadmap(level, topics);
      const newProgress: UserProgress = {
        completedDays: [],
        startDate: new Date().toISOString(),
        currentDay: 1,
        roadmap,
        topics,
        level
      };
      saveProgress(newProgress);
      setCurrentDay(1);
      setStatus(AppStatus.READY);
    } catch (err) {
      console.error(err);
      setStatus(AppStatus.IDLE);
    }
  };

  const handleSelectTopic = async (topic: { title: string; description: string }) => {
    setSelectedTopic(topic);
    setTopicContent(null);
    setStatus(AppStatus.LOADING_TOPIC);
    try {
      const content = await generateTopicDeepDive(topic.title, topic.description);
      setTopicContent(content);
      setStatus(AppStatus.READY);
    } catch (err) {
      console.error(err);
      setStatus(AppStatus.READY);
    }
  };

  const markDayComplete = (day: number) => {
    if (progress.completedDays.includes(day)) return;
    const newProgress = {
      ...progress,
      completedDays: [...progress.completedDays, day],
      currentDay: day < 30 ? day + 1 : day
    };
    saveProgress(newProgress);
    if (day < 30) {
      setCurrentDay(day + 1);
    }
  };

  const changePath = () => {
    setStatus(AppStatus.IDLE);
    setSelectedTopic(null);
  };

  const resetProgress = () => {
    if (window.confirm("This will permanently delete your current progress. Continue?")) {
      localStorage.removeItem('senior_path_progress');
      setProgress({
        completedDays: [],
        startDate: new Date().toISOString(),
        currentDay: 1,
        roadmap: null,
        topics: []
      });
      setCurrentDay(1);
      setSelectedTopic(null);
      setStatus(AppStatus.IDLE);
    }
  };

  const handleSelectDay = (day: number) => {
    const lastCompleted = progress.completedDays.length > 0 ? Math.max(...progress.completedDays) : 0;
    if (day <= lastCompleted + 1) {
      setCurrentDay(day);
      setSelectedTopic(null);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans">
      {status === AppStatus.IDLE ? (
        <SetupWizard 
          onStart={handleStartRoadmap} 
          initialTopics={progress.topics} 
          initialLevel={progress.level}
        />
      ) : status === AppStatus.GENERATING_ROADMAP ? (
        <div className="flex-1 flex flex-col items-center justify-center space-y-8 bg-grid">
          <div className="relative">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="w-24 h-24 border-4 border-indigo-100 border-t-indigo-600 rounded-full shadow-2xl shadow-indigo-100"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-indigo-600 animate-pulse" />
            </div>
          </div>
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Architecting Your Journey</h2>
            <p className="text-slate-500 font-medium max-w-sm mx-auto">
              Our AI is curating a high-impact, 30-day interview roadmap tailored specifically for your career stage.
            </p>
          </div>
          <div className="flex gap-2">
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                className="w-2 h-2 bg-indigo-600 rounded-full"
              />
            ))}
          </div>
        </div>
      ) : (
        <>
          <Sidebar 
            roadmap={progress.roadmap || []} 
            completedDays={progress.completedDays}
            currentDay={currentDay}
            topics={progress.topics}
            onSelectDay={handleSelectDay}
            onChangePath={changePath}
            onReset={resetProgress}
          />
          <main className="flex-1 flex flex-col overflow-hidden">
            <Header currentDay={currentDay} level={progress.level} onChangePath={changePath} />
            <div className="flex-1 overflow-y-auto p-4 md:p-8">
              {selectedTopic ? (
                <TopicView 
                  content={topicContent} 
                  isLoading={status === AppStatus.LOADING_TOPIC}
                  onBack={() => setSelectedTopic(null)}
                />
              ) : (
                <Dashboard 
                  progress={{...progress, currentDay}} 
                  onSelectTopic={handleSelectTopic} 
                  onCompleteDay={markDayComplete}
                />
              )}
            </div>
          </main>
        </>
      )}
    </div>
  );
};

export default App;
