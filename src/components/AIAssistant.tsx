import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send as SendIcon, Brain, Loader } from 'lucide-react';
import AIModel from './AIAssistant/AIModel';

const AIAssistant = () => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [chat, setChat] = useState([
    { 
      role: 'assistant', 
      content: `Hello! I'm your AI banking assistant. I can help you with:

• Understanding market trends
• Portfolio analysis
• Risk assessment
• Investment strategies
• Market research
• Financial planning

How can I assist you today?`
    }
  ]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isTyping) return;

    const userMessage = message;
    setMessage('');
    setChat(prev => [...prev, { role: 'user', content: userMessage }]);
    
    setIsTyping(true);
    try {
      const model = AIModel.getInstance();
      const response = await model.generate(userMessage);
      
      setChat(prev => [...prev, { 
        role: 'assistant', 
        content: response.trim()
      }]);
    } catch (error) {
      console.error('Failed to generate response:', error);
      setChat(prev => [...prev, {
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again.'
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-full bg-white/5 rounded-xl border border-white/10 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Brain className="w-6 h-6 text-blue-400" />
          <h2 className="text-2xl font-light">AI Assistant</h2>
        </div>
      </div>
      
      <div className="flex flex-col h-[calc(100%-8rem)]">
        <div className="flex-1 overflow-auto space-y-4 mb-4 pr-2">
          {chat.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-xl ${
                msg.role === 'user' 
                  ? 'bg-blue-500/20 ml-4' 
                  : 'bg-white/5 mr-4'
              }`}>
                {msg.role === 'assistant' && (
                  <Bot className="w-6 h-6 mb-2 text-blue-400" />
                )}
                <p className="text-sm leading-relaxed whitespace-pre-line">{msg.content}</p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white/5 rounded-xl p-4 mr-4">
                <div className="flex items-center gap-2">
                  <Bot className="w-6 h-6 text-blue-400" />
                  <Loader className="w-4 h-4 animate-spin" />
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <form onSubmit={handleSend} className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 bg-black/50 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ask me anything..."
          />
          <button 
            type="submit" 
            className="p-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
            disabled={isTyping || !message.trim()}
          >
            <SendIcon className="w-6 h-6" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIAssistant;