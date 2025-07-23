import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [eventCategory, setEventCategory] = useState('');
  const [eventSubCategory, setEventSubCategory] = useState('');
  const [userName, setUserName] = useState('');
  const [showWeatherPopup, setShowWeatherPopup] = useState(false);
  const [weatherData, setWeatherData] = useState({
    location: '',
    season: '',
    condition: ''
  });
  const navigate = useNavigate();

  // Weather options - optimized by frequency
  const seasonOptions = ['Warm', 'Hot', 'Cool', 'Cold', 'Pleasant'];
  const conditionOptions = ['Clear', 'Dry', 'Breezy', 'Windy', 'Rainy', 'Humid', 'Calm', 'Misty'];

  // Event categories and sub-categories - optimized by frequency
  const eventCategories = {
    'Casual & Social': ['Casual Weekend Brunch', 'Garden Party / High Tea', 'Summer BBQ / Pool Party', 'Street Food / Food Truck Festival', 'Farmers\' Market', 'Café Meet-up / Coffee Date', 'Casual Dinner Date'],
    'Business & Professional': ['Business Meeting', 'Client Presentation', 'Conference / Symposium', 'Workshop / Training Session', 'Networking Event / After-Work Mixer', 'Job Interview / Career Fair'],
    'Semi-Formal & Dressy': ['Cocktail Party', 'Engagement Party', 'Bridal Shower', 'Baby Shower', 'Dinner Reception', 'Art Gallery Opening / Museum Exhibit', 'Office Holiday Party', 'Charity Fundraiser'],
    'Active & Leisure': ['Beach Outing / Resort Day', 'Music Festival / Concert', 'Sporting Event (stadium / courtside)', 'Yoga Retreat / Wellness Workshop', 'Hiking / Nature Walk'],
    'Formal & Black-Tie': ['Formal Wedding', 'Black-Tie Gala / Charity Ball', 'White-Tie State Dinner', 'Opera / Theatre Premiere'],
    'Travel & Transit': ['Airport Travel / Layover', 'Cruise Embarkation', 'Road-Trip Pit Stop']
  };

  useEffect(() => {
    // Get user data from localStorage or use default
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      setUserName(user.firstName || 'User');
    } else {
      setUserName('User');
    }
  }, []);

  const handleMenuClick = () => {
    navigate('/menu');
  };

  const handleEventCategoryChange = (e) => {
    setEventCategory(e.target.value);
    setEventSubCategory(''); // Reset sub-category when category changes
  };

  const handleWeatherClick = () => {
    setShowWeatherPopup(!showWeatherPopup);
  };

  const handleWeatherPopupClose = () => {
    setShowWeatherPopup(false);
  };

  const handleWeatherDataChange = (field, value) => {
    setWeatherData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGenerateOutfit = () => {
    // Navigate to outfit generation screen
    navigate('/outfit-generation');
  };

  return (
    <div className="container">
      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <div className="brand">STYLLA</div>
          <div className="header-actions">
            <button className="weather-button" onClick={handleWeatherClick}>
              🌤️
            </button>
            <button className="menu-button" onClick={handleMenuClick}>
              <div className="hamburger">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
          </div>
        </div>

        {/* Weather Popup */}
        {showWeatherPopup && (
          <div className="weather-popup-overlay" onClick={handleWeatherPopupClose}>
            <div className="weather-popup" onClick={(e) => e.stopPropagation()}>
              <div className="weather-header">
                <h3>Weather & Climate</h3>
                <button className="weather-close" onClick={handleWeatherPopupClose}>×</button>
              </div>
              <div className="weather-content">
                <div className="weather-input-group">
                  <label className="weather-label">Location</label>
                  <input
                    type="text"
                    className="weather-input"
                    placeholder="Enter city, country"
                    value={weatherData.location}
                    onChange={(e) => handleWeatherDataChange('location', e.target.value)}
                  />
                </div>
                <div className="weather-input-group">
                  <label className="weather-label">Temperature/Season</label>
                  <select
                    className="weather-select"
                    value={weatherData.season}
                    onChange={(e) => handleWeatherDataChange('season', e.target.value)}
                  >
                    <option value="">Select temperature</option>
                    {seasonOptions.map((season) => (
                      <option key={season} value={season}>{season}</option>
                    ))}
                  </select>
                </div>
                <div className="weather-input-group">
                  <label className="weather-label">Weather Condition</label>
                  <select
                    className="weather-select"
                    value={weatherData.condition}
                    onChange={(e) => handleWeatherDataChange('condition', e.target.value)}
                  >
                    <option value="">Select condition</option>
                    {conditionOptions.map((condition) => (
                      <option key={condition} value={condition}>{condition}</option>
                    ))}
                  </select>
                </div>
                <div className="weather-display">
                  {weatherData.location && (
                    <div className="weather-info">
                      <span className="weather-location">📍 {weatherData.location}</span>
                    </div>
                  )}
                  {weatherData.season && (
                    <div className="weather-info">
                      <span className="weather-season">🌡️ {weatherData.season}</span>
                    </div>
                  )}
                  {weatherData.condition && (
                    <div className="weather-info">
                      <span className="weather-condition-display">💨 {weatherData.condition}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Welcome Message */}
        <div className="welcome-message">
          Welcome back, {userName}!
        </div>

        {/* Main Content - Event Selection */}
        <div className="main-content">
          <div className="section-title">Select the Event</div>
          
          <div className="form-section">
            <div className="input-group">
              <label className="input-label">Event Category *</label>
              <select
                className="input-select"
                value={eventCategory}
                onChange={handleEventCategoryChange}
                required
              >
                <option value="">Select event category</option>
                {Object.keys(eventCategories).map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {eventCategory && (
              <div className="input-group">
                <label className="input-label">Specific Event (Optional)</label>
                <select
                  className="input-select"
                  value={eventSubCategory}
                  onChange={(e) => setEventSubCategory(e.target.value)}
                >
                  <option value="">Select specific event (optional)</option>
                  {eventCategories[eventCategory].map((subCategory) => (
                    <option key={subCategory} value={subCategory}>{subCategory}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Generate Outfit Section */}
          <div className="generate-outfit-section">
            <div className="action-section">
              <button 
                className="action-button primary" 
                onClick={handleGenerateOutfit}
                disabled={!eventCategory}
              >
                Generate Outfit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 