import React, { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';

const ChatWindow = ({ messages = [], isLoading }) => {
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-window-container">
      <div className="chat-window">
        {/* Render messages */}
        {messages.map((msg, index) => (
          <ChatMessage
            key={msg.id || `msg-${index}`} // Ensure unique key
            message={msg}
          />
        ))}

        {/* Show "Bot is typing..." if loading */}
        {isLoading && (
          <ChatMessage
            key="loading-message"
            message={{
              text: 'Bot is typing...',
              id: 'loading-message',
              from: 'bot',
            }}
          />
        )}

        {/* Dummy div for auto-scroll */}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatWindow;
