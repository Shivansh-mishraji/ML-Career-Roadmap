import React, { useState, useEffect, useRef } from 'react';
import { Send, Key, Bot, User, Loader2, Search, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { generateRAGResponse, generateLocalResponse } from '../utils/ai';

const AIAssistant = () => {
  const [apiKey, setApiKey] = useState('');
  const [isKeySaved, setIsKeySaved] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! I am your ML Career Guide. Ask me anything about the curriculum.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const savedKey = localStorage.getItem('gemini-api-key');
    if (savedKey && savedKey.length > 5) {
      setApiKey(savedKey);
      setIsKeySaved(true);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSaveKey = () => {
    if (apiKey.trim().length > 10) {
      localStorage.setItem('gemini-api-key', apiKey);
      setIsKeySaved(true);
      setMessages([...messages, { sender: 'bot', text: '**[SYSTEM]** Upgraded to Gemini AI. You now have full conversational abilities.' }]);
    }
  };

  const clearKey = () => {
    localStorage.removeItem('gemini-api-key');
    setApiKey('');
    setIsKeySaved(false);
    setMessages([...messages, { sender: 'bot', text: '**[SYSTEM]** Disconnected Gemini API. Falling back to Local Search Mode.' }]);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    const newMessages = [...messages, { sender: 'user', text: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      let responseText = '';
      if (isKeySaved) {
        // Use Real AI
        const historyForAI = newMessages.filter(m => !m.text.includes('[SYSTEM]')).slice(1, -1); 
        responseText = await generateRAGResponse(apiKey, userMessage, historyForAI);
      } else {
        // Use Local Simulated Bot
        responseText = await generateLocalResponse(userMessage);
      }
      setMessages([...newMessages, { sender: 'bot', text: responseText }]);
    } catch (error) {
      setMessages([...newMessages, { sender: 'bot', text: `**Error:** ${error.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 6rem)', maxWidth: '900px', margin: '0 auto' }}>
      
      {/* Header & Settings */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
        <div>
          <h1 className="gradient-text mono" style={{ fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
            <Bot size={28} /> {isKeySaved ? 'Gemini_AI_Core' : 'Local_Search_Bot'}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {isKeySaved ? <><Sparkles size={14} color="var(--accent-primary)"/> Smart Conversational RAG Mode</> : <><Search size={14} /> Exact Keyword Search Mode</>}
          </p>
        </div>
        
        {/* API Key Toggle Section */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
          {isKeySaved ? (
            <button onClick={clearKey} className="btn-outline" style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem', borderColor: 'var(--danger)', color: 'var(--danger)' }}>
              Disconnect API Key
            </button>
          ) : (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', padding: '0.3rem 0.8rem', borderRadius: 'var(--radius-sm)' }}>
                <Key size={14} color="var(--text-muted)" />
                <input 
                  type="password" 
                  placeholder="Enter Gemini API Key..." 
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', outline: 'none', fontSize: '0.8rem', fontFamily: 'Fira Code', width: '180px' }}
                />
              </div>
              <button onClick={handleSaveKey} className="btn-primary" style={{ padding: '0.3rem 0.8rem', fontSize: '0.8rem' }}>
                Upgrade
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Chat History */}
      <div className="glass-card-premium" style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '1.5rem' }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ display: 'flex', gap: '1rem', flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: msg.sender === 'user' ? 'var(--bg-tertiary)' : 'var(--accent-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: `1px solid ${msg.sender === 'user' ? 'var(--border-color)' : 'var(--accent-primary)'}` }}>
              {msg.sender === 'user' ? <User size={18} /> : <Bot size={18} color="var(--accent-primary)" />}
            </div>
            <div style={{ 
              background: msg.sender === 'user' ? 'var(--bg-tertiary)' : 'transparent',
              border: msg.sender === 'user' ? '1px solid var(--border-color)' : 'none',
              padding: msg.sender === 'user' ? '1rem' : '0 0.5rem',
              borderRadius: 'var(--radius-md)',
              maxWidth: '80%',
              color: 'var(--text-primary)',
              lineHeight: '1.6'
            }}>
              {msg.sender === 'user' ? (
                msg.text
              ) : (
                <div style={{ fontSize: '0.95rem' }}>
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div style={{ display: 'flex', gap: '1rem', flexDirection: 'row' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--accent-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid var(--accent-primary)' }}>
              <Bot size={18} color="var(--accent-primary)" />
            </div>
            <div style={{ padding: '0 0.5rem', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center' }}>
              <Loader2 size={18} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <form onSubmit={handleSend} className="glass-card-premium" style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isKeySaved ? "Ask Gemini anything about the curriculum..." : "Search curriculum keywords (e.g., 'Docker', 'NLP')..."}
          disabled={isLoading}
          style={{ flex: 1, background: 'transparent', border: 'none', color: 'var(--text-primary)', outline: 'none', fontSize: '1rem' }}
        />
        <button type="submit" disabled={isLoading || !input.trim()} className="btn-primary" style={{ padding: '0.6rem', borderRadius: 'var(--radius-sm)' }}>
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default AIAssistant;
