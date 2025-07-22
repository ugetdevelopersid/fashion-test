import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PersistentBackButton from './PersistentBackButton';

function OutfitGeneration() {
  const [rating, setRating] = useState(null);
  const [showProfileViews, setShowProfileViews] = useState(false);
  const [currentTab, setCurrentTab] = useState('back');
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbackData, setFeedbackData] = useState({
    outfitStyle: false,
    colorCombination: false,
    fitAccuracy: false,
    occasionMatch: false,
    overallAppeal: false,
    additionalComments: ''
  });
  const [showThankYou, setShowThankYou] = useState(false);
  const [showGeneratedImage, setShowGeneratedImage] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({
    'User Preferences': false,
    'Outfit Preferences': false
  });
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();

  // Category structure
  const categories = {
    'User Preferences': ['Colour Group', 'Fabric Type', 'Fit', 'Pattern', 'Personal Style-Archetypes', 'Notes'],
    'Outfit Preferences': ['Top', 'Bottom', 'Dress', 'Outerwear', 'Shoes', 'Accessory', 'Brand Preferences']
  };

  const toggleCategoryExpansion = (category) => {
    // Close all other categories when opening a new one
    const newExpandedCategories = {
      'User Preferences': false,
      'Outfit Preferences': false
    };
    
    // Toggle the selected category
    newExpandedCategories[category] = !expandedCategories[category];
    setExpandedCategories(newExpandedCategories);
  };

  const handleSubCategoryClick = (subCategory) => {
    setSelectedSubCategory(subCategory);
  };

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

  const handleRating = (value) => {
    setRating(value);
  };

  const handleSubmitRating = () => {
    console.log('Rating submitted:', rating);
    // Here you would typically save the rating to a database
  };

  const handleViewToggle = (tab) => {
    setCurrentTab(tab);
  };

  const handleProfileViewsToggle = () => {
    setShowProfileViews(!showProfileViews);
  };

  const handleFeedbackToggle = () => {
    setShowFeedbackForm(!showFeedbackForm);
  };

  const handleFeedbackChange = (field, value) => {
    setFeedbackData({
      ...feedbackData,
      [field]: value
    });
  };

  const handleSubmitFeedback = () => {
    console.log('Feedback submitted:', feedbackData);
    // Here you would typically save the feedback to a database
    setShowFeedbackForm(false);
    setShowThankYou(true);
    
    // Hide thank you message after 3 seconds
    setTimeout(() => {
      setShowThankYou(false);
    }, 3000);
  };

  const handleGenerateClick = () => {
    setIsGenerating(true);
    
    // Simulate generation delay
    setTimeout(() => {
      setIsGenerating(false);
      setShowGeneratedImage(true);
    }, 2000);
  };

  const handleRegenerate = () => {
    console.log('Regenerating outfit');
    // Here you would typically trigger the regeneration process
  };

  const handleMorePreferences = () => {
    navigate('/filters');
  };

  const handleBackToCategorySelection = () => {
    setShowGeneratedImage(false);
  };

  return (
    <div className="outfit-container">
      {/* Persistent Back Button */}
      <PersistentBackButton destination="/dashboard" />
      
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

      {!showGeneratedImage ? (
        // Category Selection Step
        <div className="category-selection-container">
          <div className="categories-panel">
            {Object.entries(categories).map(([category, subCategories]) => (
              <div key={category} className="category-section">
                <div 
                  className="category-header dropdown-header" 
                  onClick={() => toggleCategoryExpansion(category)}
                >
                  <span>{category}</span>
                  <span className="dropdown-arrow">{expandedCategories[category] ? '▲' : '▼'}</span>
                </div>
                {expandedCategories[category] && (
                  <div className="category-items">
                    {subCategories.map((subCategory, index) => (
                      <div key={index}>
                        <button
                          className={`subcategory-button ${selectedSubCategory === subCategory ? 'active' : ''}`}
                          onClick={() => handleSubCategoryClick(subCategory)}
                        >
                          {subCategory}
                        </button>
                        {index < subCategories.length - 1 && <hr className="subcategory-divider" />}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="category-selection-actions">
            <button 
              className={`generate-button ${isGenerating ? 'generating' : ''}`}
              onClick={handleGenerateClick}
              disabled={!selectedSubCategory || isGenerating}
            >
              {isGenerating ? 'GENERATING...' : 'GENERATE'}
            </button>
            <button className="more-preferences-button" onClick={handleMorePreferences}>
              More Preferences
            </button>
          </div>
        </div>
      ) : (
        // Generated Image Step
        <>
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
          
          {/* View Toggle Buttons */}
          <div className="view-buttons">
            <button 
              className={`view-button ${currentTab === 'back' ? 'active' : ''}`}
              onClick={() => handleViewToggle('back')}
            >
              Back View
            </button>
            <button 
              className={`view-button ${currentTab === 'front' ? 'active' : ''}`}
              onClick={() => handleViewToggle('front')}
            >
              Front View
            </button>
            <button 
              className={`view-button ${currentTab === 'side' ? 'active' : ''}`}
              onClick={() => handleViewToggle('side')}
            >
              Side View
            </button>
          </div>
          
          {/* Rating Section */}
          <div className="rating-section">
            <div className="rating-title">How would you rate this outfit?</div>
            <div className="rating-slider-container">
              <input 
                type="range" 
                min="1" 
                max="5" 
                value={rating || 3} 
                onChange={(e) => handleRating(parseInt(e.target.value))}
                className="rating-slider"
              />
              <div className="slider-labels">
                <span>Not great</span>
                <span>Perfect</span>
              </div>
            </div>
            <button className="submit-button" onClick={handleSubmitRating}>
              SUBMIT
            </button>
          </div>
          
          {/* Action Buttons */}
          <div className="action-buttons">
            <button className="generate-button" onClick={handleProfileViewsToggle}>
              {showProfileViews ? 'HIDE PROFILE VIEWS' : 'SHOW PROFILE VIEWS'}
            </button>
            <button className="regenerate-button" onClick={handleRegenerate}>
              REGENERATE
            </button>
            <button className="generate-button" onClick={handleFeedbackToggle}>
              GIVE FEEDBACK
            </button>
            <button className="generate-button" onClick={handleBackToCategorySelection}>
              BACK TO CATEGORY SELECTION
            </button>
          </div>
          
          {/* Feedback Form Modal */}
          {showFeedbackForm && (
            <div className="modal-overlay">
              <div className="modal-content">
                <div className="modal-title">What do you think of this outfit?</div>
                <div className="modal-section">
                  <div className="radio-options">
                    <div className="radio-option">
                      <input 
                        type="checkbox" 
                        id="outfitStyle" 
                        checked={feedbackData.outfitStyle}
                        onChange={(e) => handleFeedbackChange('outfitStyle', e.target.checked)}
                      />
                      <label htmlFor="outfitStyle">The outfit style matches my preferences</label>
                    </div>
                    <div className="radio-option">
                      <input 
                        type="checkbox" 
                        id="colorCombination" 
                        checked={feedbackData.colorCombination}
                        onChange={(e) => handleFeedbackChange('colorCombination', e.target.checked)}
                      />
                      <label htmlFor="colorCombination">The color combination works well</label>
                    </div>
                    <div className="radio-option">
                      <input 
                        type="checkbox" 
                        id="fitAccuracy" 
                        checked={feedbackData.fitAccuracy}
                        onChange={(e) => handleFeedbackChange('fitAccuracy', e.target.checked)}
                      />
                      <label htmlFor="fitAccuracy">The fit appears accurate for my body type</label>
                    </div>
                    <div className="radio-option">
                      <input 
                        type="checkbox" 
                        id="occasionMatch" 
                        checked={feedbackData.occasionMatch}
                        onChange={(e) => handleFeedbackChange('occasionMatch', e.target.checked)}
                      />
                      <label htmlFor="occasionMatch">This outfit is appropriate for my intended occasion</label>
                    </div>
                    <div className="radio-option">
                      <input 
                        type="checkbox" 
                        id="overallAppeal" 
                        checked={feedbackData.overallAppeal}
                        onChange={(e) => handleFeedbackChange('overallAppeal', e.target.checked)}
                      />
                      <label htmlFor="overallAppeal">Overall, I like this outfit</label>
                    </div>
                  </div>
                  <div className="input-group">
                    <textarea 
                      placeholder="Additional comments..."
                      value={feedbackData.additionalComments}
                      onChange={(e) => handleFeedbackChange('additionalComments', e.target.value)}
                      rows={4}
                      className="input-field"
                    />
                  </div>
                </div>
                <button className="modal-regenerate-button" onClick={handleSubmitFeedback}>
                  SUBMIT FEEDBACK
                </button>
              </div>
            </div>
          )}
          
          {/* Thank You Message */}
          {showThankYou && (
            <div className="modal-overlay">
              <div className="modal-content">
                <div className="modal-title">Thank You!</div>
                <p style={{ textAlign: 'center', margin: '20px 0' }}>
                  Your feedback helps us improve our outfit recommendations.
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default OutfitGeneration; 