import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const ageRanges = [
    'Teen (13-19)',
    'Young Adult (20-29)',
    'Adult (30-39)',
    'Middle Age (40-49)',
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
      navigate('/profile-details-2');
    }
  };

  return (
    <div className="container">
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
                  border: formData.gender === 'Male' ? '2px solid #ff69b4' : '1px solid #e0e0e0',
                  borderRadius: '8px',
                  background: formData.gender === 'Male' ? '#ff69b4' : 'white',
                  color: formData.gender === 'Male' ? 'white' : '#333',
                  cursor: 'pointer',
                  fontSize: '16px'
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
                  border: formData.gender === 'Female' ? '2px solid #ff69b4' : '1px solid #e0e0e0',
                  borderRadius: '8px',
                  background: formData.gender === 'Female' ? '#ff69b4' : 'white',
                  color: formData.gender === 'Female' ? 'white' : '#333',
                  cursor: 'pointer',
                  fontSize: '16px'
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
                  border: formData.gender === 'Other' ? '2px solid #ff69b4' : '1px solid #e0e0e0',
                  borderRadius: '8px',
                  background: formData.gender === 'Other' ? '#ff69b4' : 'white',
                  color: formData.gender === 'Other' ? 'white' : '#333',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
                onClick={() => handleGenderSelect('Other')}
              >
                Other
              </button>
            </div>
          </div>
          
          <div className="input-group">
            <label>Age Range</label>
            <select
              name="ageRange"
              className="input-field"
              value={formData.ageRange}
              onChange={handleChange}
              required
            >
              <option value="">Select age range</option>
              {ageRanges.map((range, index) => (
                <option key={index} value={range}>{range}</option>
              ))}
            </select>
          </div>
          
          <div className="input-group">
            <label>Height (feet & inches)</label>
            <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <input
                  type="number"
                  name="heightFeet"
                  className="input-field"
                  placeholder="0"
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
                  placeholder="0"
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
                  placeholder="0"
                  value={formData.bust}
                  onChange={handleChange}
                  min="0"
                  required
                />
                <span style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#666' }}>in</span>
              </div>
              <div style={{ flex: 1, position: 'relative' }}>
                <input
                  type="number"
                  name="waist"
                  className="input-field"
                  placeholder="0"
                  value={formData.waist}
                  onChange={handleChange}
                  min="0"
                  required
                />
                <span style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#666' }}>in</span>
              </div>
              <div style={{ flex: 1, position: 'relative' }}>
                <input
                  type="number"
                  name="hips"
                  className="input-field"
                  placeholder="0"
                  value={formData.hips}
                  onChange={handleChange}
                  min="0"
                  required
                />
                <span style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#666' }}>in</span>
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
        
        <ul className="info-list">
          <li>Gender</li>
          <li>Age group</li>
          <li>Measurements (use these on backend to calculate body shape)</li>
        </ul>
      </div>
    </div>
  );
}

export default ProfileDetails1; 