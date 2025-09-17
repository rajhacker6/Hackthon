import React, { useState } from 'react';
import Home from './pages/Home';
import './App.css';
import './icon.css';

function Icon() {
  const [showHome, setShowHome] = useState(false); // Controls rendering of Home component

  return (
    <div className="app">
      <div className="app-content">
        <div className="app-left">
          {/* Show icon button only if Home is not visible */}
          {!showHome && (
            <button
              className="icon-button"
              onClick={() => setShowHome(true)}
            >
              <img src="/images.png" alt="icon" />
            </button>
          )}
        </div>
      </div>

      {/* Render Home component when showHome is true */}
      {showHome && (
        <Home
          onClose={() => setShowHome(false)} // Pass function to hide Home
        />
      )}
    </div>
  );
}

export default Icon;
