import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PersistentBackButton from './PersistentBackButton';

function ProfileDetails1() {
  const [formData, setFormData] = useState({
    gender: '',
    ageRange: '',
    heightFeet: '',
    heightInches: '',
    bust: '',
    waist: '',
    hips: ''
  });
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
            gender: userData.gender || '',
            ageRange: userData.ageRange || '',
            heightFeet: userData.heightFeet || userData.height?.split("'")[0] || '',
            heightInches: userData.heightInches || userData.height?.split("'")[1]?.replace('"', '') || '',
            bust: userData.bust || '',
            waist: userData.waist || '',
            hips: userData.hips || ''
          };
          
          setFormData(preFilledData);
          console.log('✅ Loaded existing user data:', preFilledData);
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

  const ageRanges = [
    'Young Adult (20-29)',
    'Adult (30-39)',
    'Middle Age (40-49)',
    'Teen (13-19)',
    'Senior (50+)'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleGenderSelect = (gender) => {
    setFormData({
      ...formData,
      gender: gender
    });
  };

  const handleBack = () => {
    navigate('/personal-info');
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (formData.gender && formData.ageRange && formData.heightFeet && formData.heightInches && formData.bust && formData.waist && formData.hips) {
      // Get existing user data from localStorage
      const existingData = localStorage.getItem('userData');
      const userData = existingData ? JSON.parse(existingData) : {};
      
      // Combine with new form data
      const updatedUserData = {
        ...userData,
        ...formData,
        // Add calculated height in inches
        height: `${formData.heightFeet}'${formData.heightInches}"`,
        heightInches: parseInt(formData.heightFeet) * 12 + parseInt(formData.heightInches)
      };
      
      // Save to localStorage
      localStorage.setItem('userData', JSON.stringify(updatedUserData));
      
      console.log('✅ ProfileDetails1 data saved to localStorage:', updatedUserData);
      navigate('/profile-details-2');
    }
  };

  // Get measurement labels based on gender
  const getMeasurementLabels = () => {
    if (formData.gender === 'Female') {
      return ['Bust', 'Waist', 'Hip'];
    } else {
      return ['Chest', 'Waist', 'Hip'];
    }
  };

  const measurementLabels = getMeasurementLabels();

  return (
    <div className="container">
      {/* Persistent Back Button */}
      <PersistentBackButton destination="/personal-info" />
      
      {/* Progress Bar */}
      <div className="progress-container">
        <div className="progress-bar" data-progress="50">
          <div className="progress-step completed">
            <div className="progress-step-number">1</div>
            <div className="progress-step-label">Welcome</div>
          </div>
          <div className="progress-step completed">
            <div className="progress-step-number">2</div>
            <div className="progress-step-label">Personal Info</div>
          </div>
          <div className="progress-step active">
            <div className="progress-step-number">3</div>
            <div className="progress-step-label">Basic Info</div>
          </div>
          <div className="progress-step">
            <div className="progress-step-number">4</div>
            <div className="progress-step-label">Appearance</div>
          </div>
        </div>
        <p className="step-description">
          Tell us about your physical characteristics so we can provide accurate outfit recommendations.
        </p>
      </div>

      <div className="form-container">
        <h1 className="title">Basic Information</h1>
        <p style={{ textAlign: 'center', marginBottom: '30px', color: '#666' }}>Tell us about yourself</p>
        
        <form onSubmit={handleNext}>
          <div className="input-group">
            <label>Gender</label>
            <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
              <button
                type="button"
                style={{
                  flex: 1,
                  padding: '12px',
                  border: formData.gender === 'Male' ? '2px solid #555' : '1px solid #e0e0e0',
                  borderRadius: '6px',
                  background: formData.gender === 'Male' ? '#555' : 'white',
                  color: formData.gender === 'Male' ? 'white' : '#333',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}
                onClick={() => handleGenderSelect('Male')}
              >
                Male
              </button>
              <button
                type="button"
                style={{
                  flex: 1,
                  padding: '12px',
                  border: formData.gender === 'Female' ? '2px solid #555' : '1px solid #e0e0e0',
                  borderRadius: '6px',
                  background: formData.gender === 'Female' ? '#555' : 'white',
                  color: formData.gender === 'Female' ? 'white' : '#333',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}
                onClick={() => handleGenderSelect('Female')}
              >
                Female
              </button>
              <button
                type="button"
                style={{
                  flex: 1,
                  padding: '12px',
                  border: formData.gender === 'Other' ? '2px solid #555' : '1px solid #e0e0e0',
                  borderRadius: '6px',
                  background: formData.gender === 'Other' ? '#555' : 'white',
                  color: formData.gender === 'Other' ? 'white' : '#333',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}
                onClick={() => handleGenderSelect('Other')}
              >
                Other
              </button>
            </div>
          </div>
          
          <div className="input-group">
            <label>Age Range</label>
            <div style={{ position: 'relative', marginTop: '8px' }}>
              <select
                name="ageRange"
                className="input-field"
                value={formData.ageRange}
                onChange={handleChange}
                required
                style={{ 
                  width: '100%',
                  padding: '12px 15px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '6px',
                  fontSize: '16px',
                  background: 'white',
                  color: '#333',
                  appearance: 'none',
                  backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.4-12.8z%22/%3E%3C/svg%3E")',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 8px center',
                  backgroundSize: '12px auto',
                  paddingRight: '30px'
                }}
              >
                <option value="">Select age range</option>
                {ageRanges.map((range, index) => (
                  <option key={index} value={range}>{range}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="input-group">
            <label>Height (feet & inches)</label>
            <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <input
                  type="number"
                  name="heightFeet"
                  className="input-field"
                  placeholder=""
                  value={formData.heightFeet}
                  onChange={handleChange}
                  min="0"
                  max="8"
                  required
                />
                <span style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#666' }}>ft</span>
              </div>
              <div style={{ flex: 1, position: 'relative' }}>
                <input
                  type="number"
                  name="heightInches"
                  className="input-field"
                  placeholder=""
                  value={formData.heightInches}
                  onChange={handleChange}
                  min="0"
                  max="11"
                  required
                />
                <span style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#666' }}>in</span>
              </div>
            </div>
          </div>
          
          <div className="input-group">
            <label>Measurements (inches)</label>
            <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <input
                  type="number"
                  name="bust"
                  className="input-field"
                  placeholder=""
                  value={formData.bust}
                  onChange={handleChange}
                  min="0"
                  required
                />
                <span style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#666' }}>in</span>
                <div style={{ 
                  position: 'absolute', 
                  left: '15px', 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  color: '#999',
                  fontSize: '14px',
                  pointerEvents: 'none'
                }}>
                  {formData.bust ? '' : measurementLabels[0]}
                </div>
              </div>
              <div style={{ flex: 1, position: 'relative' }}>
                <input
                  type="number"
                  name="waist"
                  className="input-field"
                  placeholder=""
                  value={formData.waist}
                  onChange={handleChange}
                  min="0"
                  required
                />
                <span style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#666' }}>in</span>
                <div style={{ 
                  position: 'absolute', 
                  left: '15px', 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  color: '#999',
                  fontSize: '14px',
                  pointerEvents: 'none'
                }}>
                  {formData.waist ? '' : measurementLabels[1]}
                </div>
              </div>
              <div style={{ flex: 1, position: 'relative' }}>
                <input
                  type="number"
                  name="hips"
                  className="input-field"
                  placeholder=""
                  value={formData.hips}
                  onChange={handleChange}
                  min="0"
                  required
                />
                <span style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#666' }}>in</span>
                <div style={{ 
                  position: 'absolute', 
                  left: '15px', 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  color: '#999',
                  fontSize: '14px',
                  pointerEvents: 'none'
                }}>
                  {formData.hips ? '' : measurementLabels[2]}
                </div>
              </div>
            </div>
          </div>
          
          <div className="button-group">
            <button type="button" className="btn btn-back" onClick={handleBack}>
              ← BACK
            </button>
            <button type="submit" className="btn btn-next">
              NEXT →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileDetails1; 