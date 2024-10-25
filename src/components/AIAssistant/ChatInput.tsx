import React from 'react';
import { Send as SendIcon } from 'lucide-react';

interface ChatInputProps {
  message: string;
  setMessage: (message: string) => void;
  handleSend: (e: React.FormEvent) => void;
  isDisabled: boolean;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
  message,
  setMessage,
  handleSend,
  isDisabled,
  isLoading
}) => {
  return (
    <form onSubmit={handleSend} className="flex gap-2">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 bg-black/50 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={isLoading ? 'Loading model...' : 'Ask me anything...'}
        disabled={isDisabled}
      />
      <button 
        type="submit" 
        className="p-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
        disabled={isDisabled || !message.trim()}
      >
        <SendIcon className="w-6 h-6" />
      </button>
    </form>
  );
};

export default ChatInput;