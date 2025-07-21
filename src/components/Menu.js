import React from 'react';
import { useNavigate } from 'react-router-dom';

function Menu() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/dashboard');
  };

  const handleSignOut = () => {
    navigate('/');
  };

  return (
    <div className="menu-overlay">
      <div className="menu-background" onClick={handleBack}></div>
      <div className="menu-content">
        {/* User Info Section */}
        <div className="user-section">
          <div className="user-info">
            <div className="user-details">
              <h3 className="user-name">Shubhi Srivastava</h3>
              <p className="user-email">shubhisriv1998@gmail.com</p>
            </div>
            <div className="user-avatar">
              <div className="avatar-placeholder"></div>
            </div>
          </div>
          <hr className="menu-divider" />
        </div>

        {/* Menu Items */}
        <div className="menu-items">
          <div className="menu-item" onClick={() => navigate('/dashboard')}>
            Home
          </div>
          <hr className="menu-divider" />
          
          <div className="menu-item" onClick={() => navigate('/personal-info')}>
            My Profile
          </div>
          <hr className="menu-divider" />
          
          <div className="menu-item">
            Saved outfits
          </div>
          <hr className="menu-divider" />
          
          <div className="menu-item">
            Edit preferences
          </div>
          <hr className="menu-divider" />
          
          <div className="menu-item">
            FAQs
          </div>
          <hr className="menu-divider" />
        </div>

        {/* Sign Out Button */}
        <div className="menu-bottom">
          <button className="sign-out-button" onClick={handleSignOut}>
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Menu; 