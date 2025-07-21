import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PersonalInfo() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleBack = () => {
    navigate('/');
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (formData.firstName && formData.lastName && formData.email) {
      navigate('/profile-details-1');
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1 className="title">PERSONAL INFO</h1>
        
        <form onSubmit={handleNext}>
          <div className="input-row">
            <div className="input-group">
              <label>First name</label>
              <input
                type="text"
                name="firstName"
                className="input-field"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label>Last name</label>
              <input
                type="text"
                name="lastName"
                className="input-field"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="input-field"
              value={formData.email}
              onChange={handleChange}
              required
            />
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

export default PersonalInfo; 