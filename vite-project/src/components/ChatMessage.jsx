import React from 'react';
import { Bot, User, AlertCircle } from 'lucide-react';

const ChatMessage = ({ message }) => {
  if (!message || !message.text) return null;

  const isBot = message.from === 'bot'; // Use the from field
  const messageClass = isBot ? 'bot-message' : 'user-message';

  const messageDate = message.timestamp ? new Date(message.timestamp) : new Date();
  const isValidDate = !isNaN(messageDate);

  return (
    <div className={`message-container ${messageClass}`}>
      <div className="message-inner">
        <div className="message-avatar">
          {isBot ? <Bot size={24} /> : <User size={24} />}
        </div>
        <div className="message-content">
          <div
            className={`message-bubble ${message.isError ? 'message-error' : ''}`}
          >
            {message.isError && (
              <AlertCircle size={16} className="inline mr-2 mb-1" />
            )}
            {message.text}
          </div>
          {isValidDate && (
            <span className="message-timestamp">
              {messageDate.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              })}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
