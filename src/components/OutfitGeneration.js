import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function OutfitGeneration() {
  const [rating, setRating] = useState(5);
  const [currentView, setCurrentView] = useState('side');
  const navigate = useNavigate();

  const handleMenuClick = () => {
    navigate('/menu');
  };

  const handlePreviousImage = () => {
    // Navigate to previous generated image
    console.log('Previous image');
  };

  const handleNextImage = () => {
    // Navigate to next generated image
    console.log('Next image');
  };

  const handleGenerateSideBack = () => {
    console.log('Generate side and back profile');
  };

  const handleRegenerateOutfits = () => {
    navigate('/regenerate-modal');
  };

  const handleSubmitRating = () => {
    console.log('Rating submitted:', rating);
    // Here you would typically save the rating
  };

  return (
    <div className="outfit-container">
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
          <button className="nav-arrow left" onClick={handlePreviousImage}>
            ←
          </button>
          <div className="image-preview">
            <div className="preview-text">GENERATED IMAGE PREVIEW</div>
          </div>
          <button className="nav-arrow right" onClick={handleNextImage}>
            →
          </button>
        </div>
      </div>

      {/* View Buttons */}
      <div className="view-buttons">
        <button 
          className={`view-button ${currentView === 'front' ? 'active' : ''}`}
          onClick={() => setCurrentView('front')}
        >
          front
        </button>
        <button 
          className={`view-button ${currentView === 'side' ? 'active' : ''}`}
          onClick={() => setCurrentView('side')}
        >
          side
        </button>
        <button 
          className={`view-button ${currentView === 'back' ? 'active' : ''}`}
          onClick={() => setCurrentView('back')}
        >
          back
        </button>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button className="generate-button" onClick={handleGenerateSideBack}>
          Generate Side and Back Profile
        </button>
        <button className="regenerate-button" onClick={handleRegenerateOutfits}>
          REGENERATE OUTFITS
        </button>
      </div>

      {/* Rating Section */}
      <div className="rating-section">
        <h3 className="rating-title">How much would you rate these recommendations?</h3>
        <div className="rating-slider-container">
          <input
            type="range"
            min="1"
            max="10"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="rating-slider"
          />
          <div className="slider-labels">
            <span>1</span>
            <span>10</span>
          </div>
        </div>
        <button className="submit-button" onClick={handleSubmitRating}>
          SUBMIT
        </button>
      </div>
    </div>
  );
}

export default OutfitGeneration; 