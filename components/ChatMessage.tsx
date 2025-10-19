
import React from 'react';
import { ChatMessage as ChatMessageType } from '../types';
import { UserCircleIcon, SparklesIcon } from './icons/HeroIcons';

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';

  return (
    <div className={`flex items-start gap-3 my-4 ${isUser ? 'justify-end' : ''}`}>
      {!isUser && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white">
          <SparklesIcon className="w-6 h-6" />
        </div>
      )}
      <div
        className={`max-w-xl p-4 rounded-xl shadow-md ${
          isUser
            ? 'bg-primary-600 text-white rounded-br-none'
            : 'bg-white text-slate-700 rounded-bl-none'
        }`}
      >
        <p className="text-sm leading-relaxed">{message.text}</p>
      </div>
       {isUser && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
          <UserCircleIcon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
