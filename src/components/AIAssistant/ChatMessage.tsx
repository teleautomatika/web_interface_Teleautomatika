import React from 'react';
import { Bot } from 'lucide-react';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ role, content }) => {
  return (
    <div className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[80%] p-4 rounded-xl ${
        role === 'user' 
          ? 'bg-blue-500/20 ml-4' 
          : 'bg-white/5 mr-4'
      }`}>
        {role === 'assistant' && (
          <Bot className="w-6 h-6 mb-2 text-blue-400" />
        )}
        <p className="text-sm leading-relaxed whitespace-pre-line">{content}</p>
      </div>
    </div>
  );
};

export default ChatMessage;