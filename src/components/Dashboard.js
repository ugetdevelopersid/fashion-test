import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [selectedOption, setSelectedOption] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [uploadOption, setUploadOption] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = () => {
    navigate('/menu');
  };

  const handleStartGenerating = () => {
    navigate('/clothing-selection');
  };

  return (
    <div className="container">
      <div className="dashboard-container">
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

        {/* Welcome Message */}
        <div className="welcome-message">
          Welcome back, Shubhi!
        </div>

        {/* Main Content */}
        <div className="dashboard-content">
          {/* Top Section */}
          <div className="section">
            <select 
              className="dropdown-field"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value="">Select one to start</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>

          {/* Middle Section */}
          <div className="section">
            <div className="section-header">
              <input 
                type="radio" 
                id="clothing" 
                name="option" 
                checked={!uploadOption}
                onChange={() => setUploadOption(false)}
              />
              <label htmlFor="clothing">Choose a clothing item</label>
            </div>
            <div className="dropdown-group">
              <select 
                className="dropdown-field"
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
                className="dropdown-field"
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
          </div>

          {/* Bottom Section */}
          <div className="section">
            <div className="section-header">
              <input 
                type="radio" 
                id="upload" 
                name="option" 
                checked={uploadOption}
                onChange={() => setUploadOption(true)}
              />
              <label htmlFor="upload">Upload existing media</label>
            </div>
            <p className="upload-description">
              Take a picture of the clothing item you want to style today.
            </p>
            <div className="upload-area">
              <div className="upload-icon">📷</div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button className="start-button" onClick={handleStartGenerating}>
          START GENERATING
        </button>
      </div>
    </div>
  );
}

export default Dashboard; 