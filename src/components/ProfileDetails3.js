import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProfileDetails3() {
  const [formData, setFormData] = useState({
    hairTexture: '',
    hairLength: '',
    hairColor: ''
  });
  const navigate = useNavigate();

  const hairTextures = [
    'Straight',
    'Wavy',
    'Curly',
    'Coily',
    'Kinky'
  ];

  const hairLengths = [
    'Medium (Shoulder length)',
    'Long (Below shoulders)',
    'Short (Above shoulders)',
    'Very Long (Waist length or longer)'
  ];

  const hairColors = [
    'Brown',
    'Black',
    'Blonde',
    'Red',
    'Gray',
    'White',
    'Other'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleBack = () => {
    navigate('/profile-details-2');
  };

  const handleFinish = (e) => {
    e.preventDefault();
    if (formData.hairTexture && formData.hairLength && formData.hairColor) {
      // Here you would typically save the data to your backend
      alert('Profile setup completed!');
      navigate('/');
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1 className="title">PROFILE DETAILS 3/3</h1>
        
        <form onSubmit={handleFinish}>
          <div className="input-group">
            <label>Hair texture</label>
            <select
              name="hairTexture"
              className="input-field"
              value={formData.hairTexture}
              onChange={handleChange}
              required
            >
              <option value="">Select hair texture</option>
              {hairTextures.map((texture, index) => (
                <option key={index} value={texture}>{texture}</option>
              ))}
            </select>
          </div>
          
          <div className="input-group">
            <label>Hair length</label>
            <select
              name="hairLength"
              className="input-field"
              value={formData.hairLength}
              onChange={handleChange}
              required
            >
              <option value="">Select hair length</option>
              {hairLengths.map((length, index) => (
                <option key={index} value={length}>{length}</option>
              ))}
            </select>
          </div>
          
          <div className="input-group">
            <label>Hair color</label>
            <select
              name="hairColor"
              className="input-field"
              value={formData.hairColor}
              onChange={handleChange}
              required
            >
              <option value="">Select hair color</option>
              {hairColors.map((color, index) => (
                <option key={index} value={color}>{color}</option>
              ))}
            </select>
          </div>
          
          <div className="button-group">
            <button type="button" className="btn btn-back" onClick={handleBack}>
              ← BACK
            </button>
            <button type="submit" className="btn btn-next">
              FIN →
            </button>
          </div>
        </form>
        
        <ul className="info-list">
          <li>Hair texture</li>
          <li>Hair length</li>
          <li>Hair color</li>
        </ul>
      </div>
    </div>
  );
}

export default ProfileDetails3; 