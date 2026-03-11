
export interface RoadmapItem {
  day: number;
  topics: {
    title: string;
    description: string;
    level: 'Senior' | 'Lead';
    category: string;
  }[];
}

export interface TopicContent {
  title: string;
  conceptExplainer: string;
  simpleExplanation: string;
  visualDiagram: string;
  seniorInsights: string[];
  interviewQuestions: {
    question: string;
    answer: string;
    explanation: string;
    practicalExample?: string;
  }[];
}

export enum UserLevel {
  FRESHER = 'Fresher',
  MID_LEVEL = 'Mid-level',
  SENIOR = 'Senior'
}

export interface UserProgress {
  completedDays: number[];
  startDate: string;
  currentDay: number;
  roadmap: RoadmapItem[] | null;
  topics?: string[];
  level?: UserLevel;
}

export enum AppStatus {
  IDLE = 'IDLE',
  GENERATING_ROADMAP = 'GENERATING_ROADMAP',
  READY = 'READY',
  LOADING_TOPIC = 'LOADING_TOPIC'
}
