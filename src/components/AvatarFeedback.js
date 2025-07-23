import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PersistentBackButton from './PersistentBackButton';

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



  const handleRegenerate = () => {
    console.log('Selected avatar issues:', selectedIssues);
    navigate('/outfit-generation');
  };

  return (
    <div className="avatar-feedback-container">
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
          <div className="section-title">What part of the avatar feels inaccurate?</div>
          <p className="feedback-subtitle">(Select all that apply)</p>
          
          <div className="issue-selection">
            {avatarIssues.map((issue) => (
              <button
                key={issue}
                className={`selection-button ${selectedIssues.includes(issue) ? 'selected' : ''}`}
                onClick={() => handleIssueToggle(issue)}
              >
                {issue}
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

export default AvatarFeedback; 