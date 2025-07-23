import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Menu() {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Get user data from localStorage or use default
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      setUserName(`${user.firstName || 'User'} ${user.lastName || ''}`.trim());
      setUserEmail(user.email || 'user@example.com');
    } else {
      setUserName('User');
      setUserEmail('user@example.com');
    }
  }, []);

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
              <h3 className="user-name">{userName}</h3>
              <p className="user-email">{userEmail}</p>
            </div>
            <div className="user-avatar">
              <div className="avatar-placeholder"></div>
            </div>
          </div>
          <hr className="menu-divider" />
        </div>

        {/* Menu Items - Simplified to essential tabs only */}
        <div className="menu-items">
          <div className="menu-item" onClick={() => navigate('/dashboard')}>
            Home
          </div>
          <hr className="menu-divider" />
          
          <div className="menu-item" onClick={() => navigate('/personal-info')}>
            User Information
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