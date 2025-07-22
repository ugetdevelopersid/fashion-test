import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PersistentBackButton from './PersistentBackButton';

function PersonalInfo() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
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
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            email: userData.email || ''
          };
          
          setFormData(preFilledData);
          console.log('✅ Loaded existing user data for PersonalInfo:', preFilledData);
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
      // Get existing user data from localStorage
      const existingData = localStorage.getItem('userData');
      const userData = existingData ? JSON.parse(existingData) : {};
      
      // Combine with new form data
      const updatedUserData = {
        ...userData,
        ...formData
      };
      
      // Save user data to localStorage
      localStorage.setItem('userData', JSON.stringify(updatedUserData));
      console.log('✅ PersonalInfo data saved to localStorage:', updatedUserData);
      navigate('/profile-details-1');
    }
  };

  return (
    <div className="container">
      {/* Persistent Back Button */}
      <PersistentBackButton destination="/" />
      
      {/* Progress Bar */}
      <div className="progress-container">
        <div className="progress-bar" data-progress="25">
          <div className="progress-step completed">
            <div className="progress-step-number">1</div>
            <div className="progress-step-label">Welcome</div>
          </div>
          <div className="progress-step active">
            <div className="progress-step-number">2</div>
            <div className="progress-step-label">Personal Info</div>
          </div>
          <div className="progress-step">
            <div className="progress-step-number">3</div>
            <div className="progress-step-label">Basic Info</div>
          </div>
          <div className="progress-step">
            <div className="progress-step-number">4</div>
            <div className="progress-step-label">Appearance</div>
          </div>
        </div>
        <p className="step-description">
          Let's get to know you better. Please provide your basic contact information.
        </p>
      </div>

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