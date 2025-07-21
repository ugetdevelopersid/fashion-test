import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ClothingSelection() {
  const [occasion, setOccasion] = useState('Formal Wear');
  const navigate = useNavigate();

  const handleMenuClick = () => {
    navigate('/menu');
  };

  const handleAddItem = () => {
    navigate('/clothing-modal');
  };

  const handleModifyOccasion = () => {
    // This would typically open a dropdown or modal
    console.log('Modify occasion clicked');
  };

  const handleAdditionalFilters = () => {
    navigate('/filters');
  };

  const handleShowRecommendations = () => {
    navigate('/outfit-generation');
  };

  return (
    <div className="container">
      <div className="clothing-container">
        {/* Header */}
        <div className="clothing-header">
          <div className="brand">STYLLA</div>
          <button className="menu-button" onClick={handleMenuClick}>
            <div className="hamburger">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>

        {/* Selected Clothing Items Section */}
        <div className="selection-section">
          <h3 className="section-title">Selected clothing items:</h3>
          <div className="selected-items">
            <div className="item-checkbox">
              <input type="checkbox" checked readOnly />
              <span>Top, Scoop neck</span>
            </div>
            <button className="add-item-button" onClick={handleAddItem}>
              <span>+</span> Add item
            </button>
          </div>
        </div>

        {/* Occasion Section */}
        <div className="selection-section">
          <h3 className="section-title">Occasion: {occasion}</h3>
          <button className="modify-button" onClick={handleModifyOccasion}>
            Modify selection
            <span className="dropdown-arrow">▼</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button className="filters-button" onClick={handleAdditionalFilters}>
            Additional Filters
          </button>
          <button className="recommendations-button" onClick={handleShowRecommendations}>
            SHOW RECOMMENDATIONS
          </button>
        </div>
      </div>
    </div>
  );
}

export default ClothingSelection; 