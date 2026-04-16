# InterviewAI - 30-Day Interview Accelerator

InterviewAI is a premium, AI-powered interview preparation platform designed to help software engineers crack top-tier technical interviews. It generates a personalized 30-day roadmap based on your career stage and target technology stack.

---

## 🔗 Live Demo

👉 [https://interview-preparation-platform-ipp.vercel.app/](https://interview-preparation-platform-ipp.vercel.app/)

---

## 🚀 Features

- **Personalized Roadmaps**: AI-generated 30-day plans tailored for Freshers, Mid-level, and Senior engineers.
- **Deep-Dive Learning**: Comprehensive theory, simple analogies, and visual flow diagrams for every topic.
- **Interview Mastery**: High-probability interview questions with strategic response guides and optimized code solutions.
- **Progress Tracking**: Visual progress indicators and milestone tracking to keep you motivated.
- **Social Sharing**: One-click sharing of your progress to LinkedIn to build your professional brand.
- **Premium UI**: A modern, fluid interface built with React, Tailwind CSS, and Framer Motion.

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion (motion/react)
- **Icons**: Lucide React
- **AI Engine**: Google Gemini 3.1 Flash

## 📦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Gemini API Key from [Google AI Studio](https://aistudio.google.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd interview-ai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add your Gemini API key:
   ```env
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## 🚀 Deployment

### Vercel

1. Push your code to a GitHub repository.
2. Connect your repository to [Vercel](https://vercel.com/).
3. Add `VITE_GEMINI_API_KEY` to your Vercel Environment Variables.
4. Deploy!

## 📄 License

MIT
