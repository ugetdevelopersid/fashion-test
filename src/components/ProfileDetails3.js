import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatabaseService from '../services/databaseService';
import PersistentBackButton from './PersistentBackButton';

function ProfileDetails3() {
  const [formData, setFormData] = useState({
    personalStyle: [],
    brandsPreferred: '',
    additionalInfo: ''
  });
  const [isSaving, setIsSaving] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(true);
  const [showStyleDropdown, setShowStyleDropdown] = useState(false);

  // Load existing user data on component mount
  useEffect(() => {
    const loadExistingData = () => {
      try {
        const existingData = localStorage.getItem('userData');
        if (existingData) {
          const userData = JSON.parse(existingData);
          
          // Pre-fill form with existing data
          const preFilledData = {
            personalStyle: userData.personalStyle || [],
            brandsPreferred: userData.brandsPreferred || '',
            additionalInfo: userData.additionalInfo || ''
          };
          
          setFormData(preFilledData);
          console.log('✅ Loaded existing user data for ProfileDetails3:', preFilledData);
        }
      } catch (error) {
        console.error('Error loading existing data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadExistingData();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.custom-dropdown')) {
        setShowStyleDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);



  const navigate = useNavigate();

  // Personal style options
  const personalStyles = [
    'Casual & Comfortable',
    'Professional & Business',
    'Trendy & Fashion-Forward',
    'Classic & Timeless',
    'Minimalist & Clean',
    'Bohemian & Free-Spirited',
    'Edgy & Alternative',
    'Romantic & Feminine',
    'Sporty & Athletic',
    'Vintage & Retro',
    'Glamorous & Elegant',
    'Eclectic & Mix-and-Match'
  ];

  const handleChange = (e) => {
    const updatedFormData = {
      ...formData,
      [e.target.name]: e.target.value
    };
    
    setFormData(updatedFormData);
    
    // Save to localStorage immediately to preserve data when navigating back
    try {
      const existingData = localStorage.getItem('userData');
      const userData = existingData ? JSON.parse(existingData) : {};
      const updatedUserData = {
        ...userData,
        ...updatedFormData
      };
      localStorage.setItem('userData', JSON.stringify(updatedUserData));
      console.log('✅ Profile data auto-saved to localStorage:', updatedFormData);
    } catch (error) {
      console.error('Error auto-saving profile data:', error);
    }
  };

  const handleStyleToggle = (style) => {
    const currentStyles = formData.personalStyle;
    let updatedStyles;
    
    if (currentStyles.includes(style)) {
      // Remove style if already selected
      updatedStyles = currentStyles.filter(s => s !== style);
    } else {
      // Add style if not selected
      updatedStyles = [...currentStyles, style];
    }
    
    const updatedFormData = {
      ...formData,
      personalStyle: updatedStyles
    };
    
    setFormData(updatedFormData);
    
    // Save to localStorage immediately to preserve data when navigating back
    try {
      const existingData = localStorage.getItem('userData');
      const userData = existingData ? JSON.parse(existingData) : {};
      const updatedUserData = {
        ...userData,
        ...updatedFormData
      };
      localStorage.setItem('userData', JSON.stringify(updatedUserData));
      console.log('✅ Personal style data auto-saved to localStorage:', updatedFormData);
    } catch (error) {
      console.error('Error auto-saving personal style data:', error);
    }
  };

  const handleBack = () => {
    navigate('/profile-details-2');
  };

  const handleFinish = async (e) => {
    e.preventDefault();
    
    if (formData.personalStyle.length > 0) {
      setIsSaving(true);
      
      try {
        // Get user data from localStorage
        const userData = localStorage.getItem('userData');
        const user = userData ? JSON.parse(userData) : {};
        
        // Combine all profile data
        const profileData = {
          ...user,
          ...formData,
          profileCompleted: true,
          completedAt: new Date().toISOString()
        };

        // Save to localStorage first
        localStorage.setItem('userData', JSON.stringify(profileData));
        console.log('✅ ProfileDetails3 data saved to localStorage:', profileData);

        // Save to database
        const result = await DatabaseService.saveProfileData(profileData);
        
        if (result.success) {
          console.log('Profile setup completed and saved to database:', profileData);
          alert('Profile setup completed successfully!');
          navigate('/dashboard');
        } else {
          console.error('Failed to save to database:', result.error);
          alert('Profile setup completed, but there was an issue saving to the database. Please try again later.');
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Error during profile completion:', error);
        alert('Profile setup completed, but there was an issue saving to the database. Please try again later.');
        navigate('/dashboard');
      } finally {
        setIsSaving(false);
      }
    } else {
      alert('Please select at least one personal style');
    }
  };

  return (
    <div className="container">
      {/* Persistent Back Button */}
      <PersistentBackButton destination="/profile-details-2" />
      
      {/* Progress Bar */}
      <div className="progress-container">
        <div className="progress-bar" data-progress="90">
          <div className="progress-step completed">
            <div className="progress-step-number">1</div>
            <div className="progress-step-label">Welcome</div>
          </div>
          <div className="progress-step completed">
            <div className="progress-step-number">2</div>
            <div className="progress-step-label">Personal Info</div>
          </div>
          <div className="progress-step completed">
            <div className="progress-step-number">3</div>
            <div className="progress-step-label">Basic Info</div>
          </div>
          <div className="progress-step completed">
            <div className="progress-step-number">4</div>
            <div className="progress-step-label">Appearance</div>
          </div>
          <div className="progress-step active">
            <div className="progress-step-number">5</div>
            <div className="progress-step-label">Preferences</div>
          </div>
        </div>
      </div>

      <div className="form-container">
        <h1 className="title">User Preferences</h1>
        <p style={{ textAlign: 'center', marginBottom: '30px', color: '#666' }}>Tell us about your style preferences</p>
        
        <form onSubmit={handleFinish}>
          <div className="input-group">
            <label>Personal Style * (Select all that apply)</label>
            <div className="custom-dropdown" style={{ position: 'relative' }}>
              <div 
                className="dropdown-display" 
                onClick={() => setShowStyleDropdown(!showStyleDropdown)}
                style={{
                  padding: '12px 15px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '6px',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  minHeight: '20px'
                }}
              >
                {formData.personalStyle.length > 0 ? (
                  <span style={{ fontSize: '14px' }}>
                    {formData.personalStyle.length === 1 
                      ? formData.personalStyle[0]
                      : `${formData.personalStyle.length} styles selected`
                    }
                  </span>
                ) : (
                  <span style={{ color: '#999', fontSize: '14px' }}>Select your personal styles</span>
                )}
                <span style={{ fontSize: '12px' }}>▼</span>
              </div>
              {showStyleDropdown && (
                <div 
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '0',
                    right: '0',
                    backgroundColor: 'white',
                    border: '1px solid #e0e0e0',
                    borderRadius: '6px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    zIndex: 1000,
                    maxHeight: '250px',
                    overflowY: 'auto'
                  }}
                >
                  {formData.personalStyle.length > 0 && (
                    <div style={{ 
                      padding: '12px 15px', 
                      borderBottom: '1px solid #f0f0f0',
                      backgroundColor: '#f8f9fa',
                      fontSize: '12px',
                      color: '#666'
                    }}>
                      Selected: {formData.personalStyle.join(', ')}
                    </div>
                  )}
                  {personalStyles.map((style, index) => (
                    <label
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '12px 15px',
                        cursor: 'pointer',
                        borderBottom: index < personalStyles.length - 1 ? '1px solid #f0f0f0' : 'none',
                        backgroundColor: formData.personalStyle.includes(style) ? '#f0f8ff' : 'transparent',
                        transition: 'background-color 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        if (!formData.personalStyle.includes(style)) {
                          e.target.style.backgroundColor = '#f8f9fa';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!formData.personalStyle.includes(style)) {
                          e.target.style.backgroundColor = 'transparent';
                        }
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={formData.personalStyle.includes(style)}
                        onChange={() => handleStyleToggle(style)}
                        style={{
                          marginRight: '10px',
                          transform: 'scale(1.1)',
                          accentColor: '#007bff'
                        }}
                      />
                      <span style={{ fontSize: '14px', userSelect: 'none' }}>{style}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="input-group">
            <label>Brands Preferred/Owned</label>
            <textarea
              className="form-field"
              name="brandsPreferred"
              value={formData.brandsPreferred}
              onChange={handleChange}
              placeholder="List your favorite brands or brands you own (e.g., Nike, Zara, H&M, etc.)&#10;&#10;Help us understand your brand preferences and budget range"
              rows="4"
              style={{
                resize: 'vertical',
                minHeight: '100px',
                fontFamily: 'inherit',
                fontSize: '14px',
                padding: '12px 15px',
                border: '1px solid #e0e0e0',
                borderRadius: '6px',
                width: '100%',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div className="input-group">
            <label>Additional Information About Yourself</label>
            <textarea
              className="form-field"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              placeholder="Tell us anything else that might help us style you better (lifestyle, profession, occasions you dress for, etc.)&#10;&#10;Share your lifestyle, profession, or any specific styling needs"
              rows="5"
              style={{
                resize: 'vertical',
                minHeight: '120px',
                fontFamily: 'inherit',
                fontSize: '14px',
                padding: '12px 15px',
                border: '1px solid #e0e0e0',
                borderRadius: '6px',
                width: '100%',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div className="button-group">
            <button type="button" className="btn btn-back" onClick={handleBack}>
              ← BACK
            </button>
            <button type="submit" className="btn btn-next" disabled={isSaving}>
              {isSaving ? 'SAVING...' : 'FINISH SETUP'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileDetails3; 