
import { GoogleGenAI, Type } from "@google/genai";
import { RoadmapItem, TopicContent, UserLevel } from "../types.ts";

const getApiKey = () => {
  try {
    return process.env.API_KEY || '';
  } catch {
    return (window as any).process?.env?.API_KEY || '';
  }
};

export const generatePersonalizedRoadmap = async (level: UserLevel, stack: string[]): Promise<RoadmapItem[]> => {
  const ai = new GoogleGenAI({ apiKey: getApiKey() });
  const topicsString = stack.join(', ');
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `As an expert technical interview coach, create a 30-day interview preparation curriculum for a ${level} software engineer.
    The primary focus areas are: ${topicsString}.
    
    CRITICAL FOCUS: This roadmap must be 100% focused on cracking top-tier technical interviews. 
    Each day must bring the candidate "one step closer to cracking the interview".
    
    LEVEL-SPECIFIC GUIDANCE:
    - If level is "Fresher": Focus heavily on Data Structures, Algorithms, Core Language Fundamentals, and basic problem-solving.
    - If level is "Mid-level": Focus on Practical Implementation, Design Patterns, API Design, Testing, and Performance Optimization.
    - If level is "Senior": Focus on System Design, Scalability, Distributed Systems, Leadership, and Complex Architectural Trade-offs.
    
    Each day must have 1-2 distinct topics that are frequently asked in interviews for a ${level} level.
    The roadmap should transition from fundamental interview questions to complex scenarios relevant to a ${level}.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            day: { type: Type.INTEGER },
            topics: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING, description: "Focus on why this is important for interviews" },
                  level: { type: Type.STRING },
                  category: { type: Type.STRING }
                },
                required: ['title', 'description', 'level', 'category']
              }
            }
          },
          required: ['day', 'topics']
        }
      }
    }
  });

  try {
    const text = response.text.trim();
    return JSON.parse(text);
  } catch (e) {
    console.error("Failed to parse roadmap", e);
    return [];
  }
};

export const generateTopicDeepDive = async (topicTitle: string, description: string): Promise<TopicContent> => {
  const ai = new GoogleGenAI({ apiKey: getApiKey() });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Provide a Senior-level deep dive into: "${topicTitle}". 
    Context: ${description}.
    
    You must provide:
    1. A detailed technical explanation (conceptExplainer).
    2. A "Simple Mode" version (simpleExplanation): Explain in simple words with simple real-world examples. Use less theory and more practical analogies.
    3. A visual representation (visualDiagram): Create a clear ASCII-style diagram or structured text flow that visualizes how the concept works.
    4. 3 high-level interview questions.
    
    IMPORTANT: For each interview question, provide a "practicalExample". 
    This MUST be a well-formatted, indented code snippet with multiple lines and proper whitespace using modern coding standards. 
    Use newlines (\\n) for line breaks. Do not return minified or single-line code.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          conceptExplainer: { type: Type.STRING, description: "Detailed technical explanation" },
          simpleExplanation: { type: Type.STRING, description: "Simple explanation with real-world examples and analogies" },
          visualDiagram: { type: Type.STRING, description: "ASCII or structured text diagram visualizing the concept" },
          seniorInsights: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "Advanced tips" 
          },
          interviewQuestions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                question: { type: Type.STRING },
                answer: { type: Type.STRING },
                explanation: { type: Type.STRING },
                practicalExample: { type: Type.STRING, description: "A multi-line, properly indented code snippet with newlines" }
              },
              required: ['question', 'answer', 'explanation', 'practicalExample']
            }
          }
        },
        required: ['title', 'conceptExplainer', 'simpleExplanation', 'visualDiagram', 'seniorInsights', 'interviewQuestions']
      }
    }
  });

  try {
    const text = response.text.trim();
    return JSON.parse(text);
  } catch (e) {
    console.error("Failed to parse topic deep dive", e);
    throw new Error("Failed to generate content");
  }
};
