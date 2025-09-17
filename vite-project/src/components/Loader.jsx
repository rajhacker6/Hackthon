  import React from 'react';

  const Loader = () => {
    return (
      <div className="message-container bot">
        <div className="message-inner">
          
          {/* Placeholder avatar */}
          <div className="message-avatar">
            <div
              style={{
                width: '20px',
                height: '20px',
                background: '#ccc',
                borderRadius: '50%',
              }}
            />
          </div>

          {/* Typing indicator */}
          <div className="message-content">
            <div className="message-bubble">
              <div className="typing-indicator">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  };

  export default Loader;
