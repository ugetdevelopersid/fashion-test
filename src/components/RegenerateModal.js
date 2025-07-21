import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegenerateModal() {
  const [selectedOption, setSelectedOption] = useState('new-recommendations');
  const navigate = useNavigate();

  const handleRegenerate = () => {
    if (selectedOption === 'body-type') {
      navigate('/avatar-feedback');
    } else if (selectedOption === 'specific-part') {
      navigate('/outfit-feedback');
    } else {
      // Generate new recommendations
      navigate('/outfit-generation');
    }
  };

  const handleBackdropClick = () => {
    navigate('/outfit-generation');
  };

  return (
    <div className="modal-overlay" onClick={handleBackdropClick}>
      <div className="modal-content regenerate-modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">What would you like to change?</h2>
        
        <div className="radio-options">
          <div className="radio-option">
            <input 
              type="radio" 
              id="body-type" 
              name="change-option" 
              value="body-type"
              checked={selectedOption === 'body-type'}
              onChange={(e) => setSelectedOption(e.target.value)}
            />
            <label htmlFor="body-type">Avatar does not depict my body type accurately</label>
          </div>
          
          <div className="radio-option">
            <input 
              type="radio" 
              id="specific-part" 
              name="change-option" 
              value="specific-part"
              checked={selectedOption === 'specific-part'}
              onChange={(e) => setSelectedOption(e.target.value)}
            />
            <label htmlFor="specific-part">I want to change a specific part of the outfit</label>
          </div>
          
          <div className="radio-option">
            <input 
              type="radio" 
              id="new-recommendations" 
              name="change-option" 
              value="new-recommendations"
              checked={selectedOption === 'new-recommendations'}
              onChange={(e) => setSelectedOption(e.target.value)}
            />
            <label htmlFor="new-recommendations">I just want new recommendations</label>
          </div>
        </div>

        <button className="modal-regenerate-button" onClick={handleRegenerate}>
          REGENERATE
        </button>
      </div>
    </div>
  );
}

export default RegenerateModal; 