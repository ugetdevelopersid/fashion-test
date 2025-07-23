import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// DatabaseService import removed as it's not used in this component
import PersistentBackButton from './PersistentBackButton';

function ProfileDetails2() {
  const [formData, setFormData] = useState({
    skinTone: '', hairLength: '', hairColor: ''
  });
  const [isSaving, setIsSaving] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(true);
  const [showHairLengthDropdown, setShowHairLengthDropdown] = useState(false);

  // Load existing user data on component mount
  useEffect(() => {
    const loadExistingData = () => {
      try {
        const existingData = localStorage.getItem('userData');
        if (existingData) {
          const userData = JSON.parse(existingData);
          
          // Pre-fill form with existing data
          const preFilledData = {
            skinTone: userData.skinTone || '',
            hairLength: userData.hairLength || '',
            hairColor: userData.hairColor || ''
          };
          
          setFormData(preFilledData);
          console.log('✅ Loaded existing user data for ProfileDetails2:', preFilledData);
        }
      } catch (error) {
        console.error('Error loading existing data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadExistingData();
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.custom-dropdown')) {
        setShowHairLengthDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const navigate = useNavigate();

  // Skin tone options with Fitzpatrick scale
  const skinTones = [
    { type: 'Type I', color: '#FFDBB4', description: 'Very light, always burns, never tans' },
    { type: 'Type II', color: '#EDB98A', description: 'Light, usually burns, tans minimally' },
    { type: 'Type III', color: '#D08B5B', description: 'Light to medium, sometimes burns, tans uniformly' },
    { type: 'Type IV', color: '#AE5D34', description: 'Medium, rarely burns, tans easily' },
    { type: 'Type V', color: '#8D4A43', description: 'Medium to dark, very rarely burns, tans very easily' },
    { type: 'Type VI', color: '#5C3836', description: 'Dark, never burns, tans very easily' }
  ];

  // Hair length options - optimized by popularity
  const hairLengths = [
    'Medium (Shoulder Length)',
    'Long (Chest Length)',
    'Short (Bob)',
    'Very Long (Waist Length)',
    'Very Short (Pixie)',
    'Extra Long (Hip Length)'
  ];

  // Hair color options - optimized by popularity - removed Strawberry Blonde
  const hairColors = [
    { name: 'Medium Brown', color: '#5D4037' },
    { name: 'Black', color: '#000000' },
    { name: 'Blonde', color: '#FFD54F' },
    { name: 'Brown', color: '#8D6E63' },
    { name: 'Red', color: '#D32F2F' },
    { name: 'Gray', color: '#9E9E9E' },
    { name: 'Auburn', color: '#8D4E37' },
    { name: 'White', color: '#FAFAFA' }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };



  const handleBack = () => {
    navigate('/profile-details-1');
  };

  const handleNext = async (e) => {
    e.preventDefault();
    
    if (formData.skinTone && formData.hairLength && formData.hairColor) {
      setIsSaving(true);
      
      try {
        // Get user data from localStorage
        const userData = localStorage.getItem('userData');
        const user = userData ? JSON.parse(userData) : {};
        
        // Update user data with appearance details
        const updatedData = {
          ...user,
          ...formData
        };

        // Save updated data to localStorage
        localStorage.setItem('userData', JSON.stringify(updatedData));
        console.log('✅ Saved appearance details to localStorage:', updatedData);
        
        navigate('/profile-details-3');
      } catch (error) {
        console.error('Error saving appearance details:', error);
        alert('There was an issue saving your data. Please try again.');
      } finally {
        setIsSaving(false);
      }
    } else {
      alert('Please fill in all required fields');
    }
  };

  return (
    <div className="container">
      {/* Persistent Back Button */}
      <PersistentBackButton destination="/profile-details-1" />
      
      {/* Progress Bar */}
      <div className="progress-container">
        <div className="progress-bar" data-progress="75">
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
          <div className="progress-step active">
            <div className="progress-step-number">4</div>
            <div className="progress-step-label">Appearance</div>
          </div>
          <div className="progress-step">
            <div className="progress-step-number">5</div>
            <div className="progress-step-label">Preferences</div>
          </div>
        </div>
      </div>

      <div className="form-container">
        <h1 className="title">Appearance Details</h1>
        <p style={{ textAlign: 'center', marginBottom: '30px', color: '#666' }}>Tell us about your appearance</p>
        
        <form onSubmit={handleNext}>
          <div className="input-group">
            <label>What's your skin tone?</label>
            <div style={{ marginTop: '15px' }}>
              <div style={{ 
                display: 'flex', 
                gap: '4px', 
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                {skinTones.map((tone, index) => (
                  <div
                    key={index}
                    onClick={() => setFormData({ ...formData, skinTone: tone.type })}
                    style={{
                      width: '60px',
                      height: '40px',
                      backgroundColor: tone.color,
                      cursor: 'pointer',
                      border: formData.skinTone === tone.type ? '3px solid #333' : '2px solid #ddd',
                      borderRadius: '6px',
                      transition: 'all 0.2s ease',
                      boxShadow: formData.skinTone === tone.type ? '0 2px 8px rgba(0,0,0,0.3)' : '0 1px 3px rgba(0,0,0,0.1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = formData.skinTone === tone.type ? '0 2px 8px rgba(0,0,0,0.3)' : '0 1px 3px rgba(0,0,0,0.1)';
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="input-group">
            <label>Hair Color</label>
            <div style={{ marginTop: '15px' }}>
              <div style={{ 
                display: 'flex', 
                gap: '4px', 
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                {hairColors.map((color, index) => (
                  <div
                    key={index}
                    onClick={() => setFormData({ ...formData, hairColor: color.name })}
                    style={{
                      width: '60px',
                      height: '40px',
                      backgroundColor: color.color,
                      cursor: 'pointer',
                      border: formData.hairColor === color.name ? '3px solid #333' : '2px solid #ddd',
                      borderRadius: '6px',
                      transition: 'all 0.2s ease',
                      boxShadow: formData.hairColor === color.name ? '0 2px 8px rgba(0,0,0,0.3)' : '0 1px 3px rgba(0,0,0,0.1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = formData.hairColor === color.name ? '0 2px 8px rgba(0,0,0,0.3)' : '0 1px 3px rgba(0,0,0,0.1)';
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="input-group">
            <label>Hair length</label>
            <div className="custom-dropdown" style={{ position: 'relative' }}>
              <select
                className="dropdown-field"
                name="hairLength"
                value={formData.hairLength}
                onChange={handleChange}
                required
                style={{ display: 'none' }}
              >
                <option value="">Select hair length</option>
                {hairLengths.map((length, index) => (
                  <option key={index} value={length}>{length}</option>
                ))}
              </select>
              <div 
                className="dropdown-display" 
                onClick={() => setShowHairLengthDropdown(!showHairLengthDropdown)}
                style={{
                  padding: '12px 15px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '6px',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                {formData.hairLength ? (
                  <span>{formData.hairLength}</span>
                ) : (
                  <span style={{ color: '#999' }}>Select hair length</span>
                )}
                <span style={{ fontSize: '12px' }}>▼</span>
              </div>
              {showHairLengthDropdown && (
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
                    maxHeight: '200px',
                    overflowY: 'auto'
                  }}
                >
                  {hairLengths.map((length, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setFormData({ ...formData, hairLength: length });
                        setShowHairLengthDropdown(false);
                      }}
                      style={{
                        padding: '12px 15px',
                        cursor: 'pointer',
                        borderBottom: index < hairLengths.length - 1 ? '1px solid #f0f0f0' : 'none',
                        backgroundColor: formData.hairLength === length ? '#f8f9fa' : 'transparent'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = formData.hairLength === length ? '#f8f9fa' : 'transparent'}
                    >
                      <span style={{ fontSize: '14px' }}>{length}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="button-group">
            <button type="button" className="btn btn-back" onClick={handleBack}>
              ← BACK
            </button>
            <button type="submit" className="btn btn-next" disabled={isSaving}>
              {isSaving ? 'SAVING...' : 'NEXT →'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileDetails2; 