import React from 'react';
import { Bot, X, Settings } from 'lucide-react';
import '../ChatHeader.css';

const ChatHeader = ({ onSettings, onClear, onClose }) => {

  const handleSettings = () => {
    if (onSettings) {
      onSettings();
    } else {
      alert('Settings clicked!');
    }
  };

  const handleClear = () => {
    if (onClear) {
      onClear();
    } else {
      alert('Clear clicked!');
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      alert('Close clicked!');
    }
  };

  return (
    <div className="chat-header">
      <div className="chat-header-content">
        <div className="chat-header-avatar">
          <Bot size={24} />
        </div>
        <div className="chat-header-info">
          <h1>IGRIS</h1>
          <p>Just Ask</p>
        </div>
      </div>

      <div className="chat-header-actions">
        <button
          onClick={handleSettings}
          className="header-btn"
          aria-label="Settings"
        >
          <Settings size={20} />
        </button>

        <button
          onClick={handleClose}
          className="header-btn"
          aria-label="Close Home"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
