import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ClothingModal() {
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const navigate = useNavigate();

  const handleDone = () => {
    navigate('/clothing-selection');
  };

  const handleBackdropClick = () => {
    navigate('/clothing-selection');
  };

  return (
    <div className="modal-overlay" onClick={handleBackdropClick}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">Choose a clothing item</h2>
        
        <div className="modal-section">
          <select 
            className="modal-dropdown"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="tops">Tops</option>
            <option value="bottoms">Bottoms</option>
            <option value="dresses">Dresses</option>
            <option value="outerwear">Outerwear</option>
          </select>
          
          <select 
            className="modal-dropdown"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
          >
            <option value="">Select Sub-category</option>
            <option value="scoop-neck">Scoop Neck</option>
            <option value="v-neck">V-Neck</option>
            <option value="crew-neck">Crew Neck</option>
            <option value="tank-top">Tank Top</option>
          </select>
        </div>

        <div className="modal-separator">
          <span>OR</span>
        </div>

        <div className="modal-section">
          <h3 className="upload-title">Upload existing media</h3>
          <p className="upload-description">
            Take a picture of the clothing item you want to style today.
          </p>
          <div className="upload-area-modal">
            <div className="upload-icon-modal">📷</div>
          </div>
        </div>

        <button className="modal-done-button" onClick={handleDone}>
          DONE
        </button>
      </div>
    </div>
  );
}

export default ClothingModal; 