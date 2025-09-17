import React from 'react';
import ChatHeader from '../components/ChatHeader';
import ChatWindow from '../components/ChatWindow';
import ChatInput from '../components/ChatInput';
import { useChat } from '../hooks/useChat';
import '../Floating.css';

const Home = ({ onClose }) => {
  const { messages, isLoading, error, sendMessage, clearMessages } = useChat();

  // Handle Settings button click
  const handleSettings = () => {
    console.log('Settings clicked');
  };

  // Handle Close button click
  const handleCloseHome = () => {
    if (onClose) {
      onClose(); // Tell parent (Icon.js) to hide Home and show icon
    }
  };

  return (
    <div className="chat-container">
      {/* Chat Header */}
      <ChatHeader
        onSettings={handleSettings}
        onClear={clearMessages}
        onClose={handleCloseHome}
      />

      {/* Chat messages window */}
      <ChatWindow messages={messages} isLoading={isLoading} />

      {/* Chat Input */}
      <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />

      {/* Error display if any */}
      {error && <div className="message-error">{error}</div>}
    </div>
  );
};

export default Home;
