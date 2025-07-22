import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatabaseService from '../services/databaseService';
import PersistentBackButton from './PersistentBackButton';

function ProfileDetails2() {
  const [formData, setFormData] = useState({
    skinTone: '', hairLength: '', hairColor: ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  const handleSkinToneSelect = (tone) => {
    setFormData({
      ...formData,
      skinTone: tone
    });
  };

  const handleHairColorSelect = (color) => {
    setFormData({
      ...formData,
      hairColor: color
    });
  };

  const handleBack = () => {
    navigate('/profile-details-1');
  };

  const handleFinish = async (e) => {
    e.preventDefault();
    
    if (formData.skinTone && formData.hairLength && formData.hairColor) {
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
        </div>
        <p className="step-description">
          Last step! Tell us about your appearance to help us create personalized outfit recommendations.
        </p>
      </div>

      <div className="form-container">
        <h1 className="title">Appearance Details</h1>
        <p style={{ textAlign: 'center', marginBottom: '30px', color: '#666' }}>Tell us about your appearance</p>
        
        <form onSubmit={handleFinish}>
          <div className="input-group">
            <label>What's your skin tone?</label>
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>Fitzpatrick Scale:</p>
            <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
              {skinTones.map((tone, index) => (
                <button
                  key={index} type="button" onClick={() => handleSkinToneSelect(tone.type)}
                  style={{
                    width: '80px', height: '40px', borderRadius: '6px',
                    backgroundColor: tone.color, border: formData.skinTone === tone.type ? '3px solid #007bff' : '2px solid #e0e0e0',
                    cursor: 'pointer', position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: tone.color === '#FFDBB4' || tone.color === '#EDB98A' ? '#333' : '#fff',
                    textShadow: tone.color === '#FFDBB4' || tone.color === '#EDB98A' ? 'none' : '0px 0px 2px rgba(0,0,0,0.5)'
                  }}
                >
                  {formData.skinTone === tone.type && (
                    <div style={{
                      position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                      width: '12px', height: '12px', backgroundColor: '#007bff', borderRadius: '50%',
                      border: '2px solid white'
                    }}></div>
                  )}
                  {tone.type}
                </button>
              ))}
            </div>
            {formData.skinTone && (
              <p style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>
                Selected: {formData.skinTone}
              </p>
            )}
          </div>

          <div className="input-group">
            <label>Hair Color</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginTop: '8px' }}>
              {hairColors.map((color, index) => (
                <button
                  key={index} type="button" onClick={() => handleHairColorSelect(color.name)}
                  style={{
                    width: '100%', height: '40px', borderRadius: '6px',
                    backgroundColor: color.color,
                    color: color.color === '#FFD54F' || color.color === '#FAFAFA' ? '#333' : '#fff',
                    border: formData.hairColor === color.name ? '3px solid #007bff' : '2px solid #e0e0e0',
                    cursor: 'pointer',
                    fontSize: '12px', 
                    fontWeight: 'bold',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    textShadow: color.color === '#FFD54F' || color.color === '#FAFAFA' ? 'none' : '0px 0px 2px rgba(0,0,0,0.5)'
                  }}
                >
                  {formData.hairColor === color.name && (
                    <div style={{
                      position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                      width: '12px', height: '12px', backgroundColor: '#007bff', borderRadius: '50%',
                      border: '2px solid white'
                    }}></div>
                  )}
                  {color.name}
                </button>
              ))}
            </div>
            {formData.hairColor && (
              <p style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>
                Selected: {formData.hairColor}
              </p>
            )}
          </div>

          <div className="input-group">
            <label>Hair length</label>
            <select name="hairLength" className="input-field" value={formData.hairLength} onChange={handleChange} required>
              <option value="">Select hair length</option>
              {hairLengths.map((length, index) => (
                <option key={index} value={length}>{length}</option>
              ))}
            </select>
          </div>

          <div className="button-group">
            <button type="button" className="btn btn-back" onClick={handleBack}>
              ← BACK
            </button>
            <button type="submit" className="btn btn-next" disabled={isSaving}>
              {isSaving ? 'SAVING...' : 'FINISH'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileDetails2; 