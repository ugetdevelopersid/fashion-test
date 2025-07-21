import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

  const handleAdditionalFilters = () => {
    navigate('/filters');
  };

  const handleRegenerate = () => {
    console.log('Selected parts to change:', selectedParts);
    navigate('/outfit-generation');
  };

  return (
    <div className="outfit-feedback-container">
      {/* Header */}
      <div className="outfit-header">
        <div className="brand">STYLLA</div>
        <button className="menu-button" onClick={handleMenuClick}>
          <div className="hamburger">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>

      {/* Image Preview Section */}
      <div className="image-preview-section">
        <div className="preview-container">
          <button className="nav-arrow left">
            ←
          </button>
          <div className="image-preview">
            <div className="preview-text">GENERATED IMAGE PREVIEW</div>
          </div>
          <button className="nav-arrow right">
            →
          </button>
        </div>
      </div>

      {/* Feedback Modal */}
      <div className="feedback-modal">
        <h2 className="feedback-title">What part of the outfit would you like to change?</h2>
        <p className="feedback-subtitle">(Select all that apply)</p>
        
        <div className="part-selection">
          {outfitParts.map((part) => (
            <button
              key={part}
              className={`part-button ${selectedParts.includes(part) ? 'selected' : ''}`}
              onClick={() => handlePartToggle(part)}
            >
              {part}
            </button>
          ))}
        </div>

        <div className="feedback-actions">
          <button className="filters-button" onClick={handleAdditionalFilters}>
            Additional Filters
          </button>
          <button className="regenerate-button" onClick={handleRegenerate}>
            REGENERATE
          </button>
        </div>
      </div>
    </div>
  );
}

export default OutfitFeedback; 