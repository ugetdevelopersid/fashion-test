import React from 'react';
import { useNavigate } from 'react-router-dom';

function PersistentBackButton({ destination, onClick }) {
  const navigate = useNavigate();
  
  const handleBack = () => {
    if (onClick) {
      onClick();
    } else if (destination) {
      navigate(destination);
    } else {
      navigate(-1); // Default: go back one step in history
    }
  };
  
  return (
    <button 
      className="persistent-back-btn" 
      onClick={handleBack}
      aria-label="Go back"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
      </svg>
    </button>
  );
}

export default PersistentBackButton; 