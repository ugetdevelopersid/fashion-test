import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Filters() {
  const [selectedCategory, setSelectedCategory] = useState('Colour Group');
  const navigate = useNavigate();

  const categories = [
    'Colour Group',
    'Fabric Type',
    'Fit',
    'Pattern',
    'Weather',
    'Suggestions'
  ];

  const suggestedOptions = [
    'Option 1',
    'Option 2',
    'Option 3'
  ];

  const allOptions = [
    'Option 1',
    'Option 2',
    'Option 3',
    'Option 4',
    'Option 5'
  ];

  const handleBack = () => {
    navigate('/clothing-selection');
  };

  const handleApply = () => {
    navigate('/clothing-selection');
  };

  const handleClearAll = () => {
    setSelectedCategory('Colour Group');
  };

  return (
    <div className="filters-container">
      {/* Header */}
      <div className="filters-header">
        <button className="back-button" onClick={handleBack}>
          ← BACK
        </button>
      </div>

      <div className="filters-content">
        {/* Left Panel - Categories */}
        <div className="categories-panel">
          {categories.map((category, index) => (
            <div key={index}>
              <button
                className={`category-button ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
              {index < categories.length - 1 && <hr className="category-divider" />}
            </div>
          ))}
        </div>

        {/* Right Panel - Options */}
        <div className="options-panel">
          <div className="options-section">
            <h4 className="options-title">Suggested For You</h4>
            {suggestedOptions.map((option, index) => (
              <div key={index} className="option-item">
                {option}
              </div>
            ))}
          </div>

          <div className="options-section">
            <h4 className="options-title">All {selectedCategory}s</h4>
            {allOptions.map((option, index) => (
              <div key={index} className="option-item">
                {option}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="filters-actions">
        <button className="apply-button" onClick={handleApply}>
          APPLY
        </button>
        <button className="clear-button" onClick={handleClearAll}>
          CLEAR ALL
        </button>
      </div>
    </div>
  );
}

export default Filters; 