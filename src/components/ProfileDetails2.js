import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProfileDetails2() {
  const [formData, setFormData] = useState({
    skinTone: '',
    skinUndertone: '',
    eyeColor: ''
  });
  const navigate = useNavigate();

  const skinTones = [
    'Very Fair',
    'Fair',
    'Light',
    'Medium',
    'Olive',
    'Dark',
    'Very Dark'
  ];

  const skinUndertones = [
    'Cool (Pink/Red undertones)',
    'Warm (Yellow/Golden undertones)',
    'Neutral (Balanced undertones)',
    'Olive (Green undertones)'
  ];

  const eyeColors = [
    'Brown',
    'Blue',
    'Green',
    'Hazel',
    'Gray',
    'Amber',
    'Other'
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

  const handleNext = (e) => {
    e.preventDefault();
    if (formData.skinTone && formData.skinUndertone && formData.eyeColor) {
      navigate('/profile-details-3');
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1 className="title">PROFILE DETAILS 2/3</h1>
        
        <form onSubmit={handleNext}>
          <div className="input-group">
            <label>Skin tone</label>
            <select
              name="skinTone"
              className="input-field"
              value={formData.skinTone}
              onChange={handleChange}
              required
            >
              <option value="">Select skin tone</option>
              {skinTones.map((tone, index) => (
                <option key={index} value={tone}>{tone}</option>
              ))}
            </select>
          </div>
          
          <div className="input-group">
            <label>Skin undertone</label>
            <select
              name="skinUndertone"
              className="input-field"
              value={formData.skinUndertone}
              onChange={handleChange}
              required
            >
              <option value="">Select skin undertone</option>
              {skinUndertones.map((undertone, index) => (
                <option key={index} value={undertone}>{undertone}</option>
              ))}
            </select>
          </div>
          
          <div className="input-group">
            <label>Eye color</label>
            <select
              name="eyeColor"
              className="input-field"
              value={formData.eyeColor}
              onChange={handleChange}
              required
            >
              <option value="">Select eye color</option>
              {eyeColors.map((color, index) => (
                <option key={index} value={color}>{color}</option>
              ))}
            </select>
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
          <li>Skin tone</li>
          <li>Skin undertone (can people tell what their undertone is?)</li>
          <li>Eye color</li>
        </ul>
      </div>
    </div>
  );
}

export default ProfileDetails2; 