import { GoogleGenerativeAI } from '@google/generative-ai';
import Fuse from 'fuse.js';
import { roadmapData } from '../data/roadmapData';

// Generate a flat list of topics and descriptions for Fuse.js
const flatRoadmap = [];
roadmapData.forEach(level => {
  level.topics.forEach(topic => {
    flatRoadmap.push({
      level: `Level ${level.level}`,
      title: topic.title,
      details: topic.details.join('\n')
    });
  });
  level.actionItems.forEach(action => {
    flatRoadmap.push({
      level: `Level ${level.level}`,
      title: 'Action Item & Verification',
      details: action
    });
  });
});

const fuse = new Fuse(flatRoadmap, {
  keys: ['title', 'details', 'level'],
  threshold: 0.4,
  includeScore: true
});

export const generateLocalResponse = async (userMessage) => {
  // Simulate network delay for effect
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const results = fuse.search(userMessage);
  
  if (results.length > 0) {
    const bestMatch = results[0].item;
    return `**[Local Search Result]**\n\nI found this in **${bestMatch.level} - ${bestMatch.title}**:\n\n${bestMatch.details.split('\n').map(d => `- ${d}`).join('\n')}\n\n*(Note: This is a local search result. Enter a Gemini API key for true conversational AI).*`;
  }
  
  return "**[Local Search Result]**\n\nI couldn't find a direct match for that in the Roadmap Curriculum. Try asking about specific topics like 'Linear Regression', 'FastAPI', or 'Docker'. \n\n*(Note: Local search requires exact topic keywords. Connect a Gemini API key for smarter AI).*";
};

export const generateRAGResponse = async (apiKey, userMessage, chatHistory) => {
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const systemPrompt = `You are a helpful AI Career Guide for Machine Learning. 
    You have access to the user's ML Career Roadmap curriculum below. 
    Always answer the user's questions strictly based on this curriculum. If they ask something outside of ML/Data Science, politely decline.
    Format your answers in clean Markdown with code blocks if necessary.
    
    CURRICULUM DATA:
    ${JSON.stringify(roadmapData, null, 2)}`;

    const formattedHistory = chatHistory.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: systemPrompt }]
        },
        {
          role: 'model',
          parts: [{ text: 'Understood. I will act as the ML Career Guide based strictly on the provided roadmap data.' }]
        },
        ...formattedHistory
      ]
    });

    const result = await chat.sendMessage(userMessage);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("AI Error:", error);
    throw new Error(error.message || "Failed to generate response. Please check your API key.");
  }
};
