import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PersistentBackButton from './PersistentBackButton';

function OutfitFeedback() {
  const [selectedParts, setSelectedParts] = useState([]);
  const navigate = useNavigate();

  const outfitParts = ['Bottoms', 'Layering', 'Accessories', 'Footwear'];

  const handleMenuClick = () => {
    navigate('/menu');
  };

  const handlePartToggle = (part) => {
    setSelectedParts(prev => 
      prev.includes(part) 
        ? prev.filter(p => p !== part)
        : [...prev, part]
    );
  };



  const handleRegenerate = () => {
    console.log('Selected parts to change:', selectedParts);
    navigate('/outfit-generation');
  };

  return (
    <div className="outfit-feedback-container">
      {/* Persistent Back Button */}
      <PersistentBackButton destination="/outfit-generation" />
      
      {/* Header */}
      <div className="dashboard-header">
        <div className="brand">STYLLA</div>
        <button className="menu-button" onClick={handleMenuClick}>
          <div className="hamburger">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Image Preview Section */}
        <div className="image-preview-card">
          <div className="preview-container">
            <div className="image-preview">
              <div className="preview-text">GENERATED IMAGE PREVIEW</div>
            </div>
          </div>
        </div>

        {/* Feedback Section */}
        <div className="feedback-section">
          <div className="section-title">What part of the outfit would you like to change?</div>
          <p className="feedback-subtitle">(Select all that apply)</p>
          
          <div className="part-selection">
            {outfitParts.map((part) => (
              <button
                key={part}
                className={`selection-button ${selectedParts.includes(part) ? 'selected' : ''}`}
                onClick={() => handlePartToggle(part)}
              >
                {part}
              </button>
            ))}
          </div>

          <div className="feedback-actions">
            <button className="action-button primary" onClick={handleRegenerate}>
              REGENERATE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OutfitFeedback; 