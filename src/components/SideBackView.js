import React from 'react';
import { useNavigate } from 'react-router-dom';
import PersistentBackButton from './PersistentBackButton';

function SideBackView() {
  const navigate = useNavigate();

  const handleMenuClick = () => {
    navigate('/menu');
  };

  const handleRegenerate = () => {
    navigate('/outfit-generation');
  };

  return (
    <div className="side-back-view-container">
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
        {/* Views Container */}
        <div className="views-container">
          {/* Back View */}
          <div className="view-card">
            <div className="view-title">Back View</div>
            <div className="view-image">
              <div className="preview-text">BACK VIEW PREVIEW</div>
            </div>
          </div>

          {/* Side View */}
          <div className="view-card">
            <div className="view-title">Side View</div>
            <div className="view-image">
              <div className="preview-text">SIDE VIEW PREVIEW</div>
            </div>
          </div>
        </div>

        {/* Action Section */}
        <div className="view-actions">
          <button className="action-button primary" onClick={handleRegenerate}>
            REGENERATE
          </button>
        </div>
      </div>
    </div>
  );
}

export default SideBackView; 