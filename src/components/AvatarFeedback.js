import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AvatarFeedback() {
  const [selectedIssues, setSelectedIssues] = useState([]);
  const navigate = useNavigate();

  const avatarIssues = ['Skin tone', 'Body shape', 'Overall fit', 'It just feels off'];

  const handleMenuClick = () => {
    navigate('/menu');
  };

  const handleIssueToggle = (issue) => {
    setSelectedIssues(prev => 
      prev.includes(issue) 
        ? prev.filter(i => i !== issue)
        : [...prev, issue]
    );
  };

  const handleAdditionalFilters = () => {
    navigate('/filters');
  };

  const handleRegenerate = () => {
    console.log('Selected avatar issues:', selectedIssues);
    navigate('/outfit-generation');
  };

  return (
    <div className="avatar-feedback-container">
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
        <h2 className="feedback-title">What part of the avatar feels inaccurate?</h2>
        <p className="feedback-subtitle">(Select all that apply)</p>
        
        <div className="issue-selection">
          {avatarIssues.map((issue) => (
            <button
              key={issue}
              className={`issue-button ${selectedIssues.includes(issue) ? 'selected' : ''}`}
              onClick={() => handleIssueToggle(issue)}
            >
              {issue}
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

export default AvatarFeedback; 