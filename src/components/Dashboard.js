import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [clothingCategory, setClothingCategory] = useState('Top');
  const [clothingSubCategory, setClothingSubCategory] = useState('');
  const [brandName, setBrandName] = useState('');
  const [color, setColor] = useState('');
  const [fabricType, setFabricType] = useState('');
  const [fitAttribute, setFitAttribute] = useState('');
  const [sleeveLength, setSleeveLength] = useState('');
  const [eventCategory, setEventCategory] = useState('');
  const [eventSubCategory, setEventSubCategory] = useState('');
  const [userName, setUserName] = useState('');
  const [showWeatherPopup, setShowWeatherPopup] = useState(false);
  const [showClothingModal, setShowClothingModal] = useState(false);
  const [selectedClothingItems, setSelectedClothingItems] = useState([]);
  const [weatherData, setWeatherData] = useState({
    location: '',
    season: '',
    condition: ''
  });
  const navigate = useNavigate();

  // Weather options - optimized by frequency
  const seasonOptions = ['Warm', 'Hot', 'Cool', 'Cold', 'Pleasant'];
  const conditionOptions = ['Clear', 'Dry', 'Breezy', 'Windy', 'Rainy', 'Humid', 'Calm', 'Misty'];

  // Clothing options with simplified structure - optimized by popularity
  const clothingOptions = {
    'Top': ['T-Shirt', 'Blouse', 'Sweater', 'Tank Top', 'Button-Up Shirt', 'Polo Shirt', 'Tunic', 'Crop Top'],
    'Bottom': ['Jeans', 'Pants', 'Skirt', 'Shorts', 'Leggings', 'Trousers', 'Joggers', 'Chinos'],
    'Dress': ['Casual Dress', 'Formal Dress', 'Cocktail Dress', 'Maxi Dress', 'Mini Dress', 'Midi Dress', 'Shift Dress'],
    'Outerwear': ['Jacket', 'Coat', 'Blazer', 'Cardigan', 'Hoodie', 'Sweatshirt', 'Bomber Jacket', 'Trench Coat'],
    'Shoes': ['Sneakers', 'Heels', 'Flats', 'Boots', 'Sandals', 'Loafers', 'Oxfords', 'Pumps'],
    'Accessories': ['Bag', 'Jewelry', 'Scarf', 'Belt', 'Hat', 'Sunglasses', 'Watch', 'Wallet']
  };

  // Flattened color options with color values - optimized by popularity
  const colorOptions = [
    { name: 'Black', color: '#000000' },
    { name: 'White', color: '#FFFFFF' },
    { name: 'Gray', color: '#808080' },
    { name: 'Navy', color: '#000080' },
    { name: 'Brown', color: '#A52A2A' },
    { name: 'Beige', color: '#F5F5DC' },
    { name: 'Red', color: '#FF0000' },
    { name: 'Blue', color: '#0000FF' },
    { name: 'Green', color: '#008000' },
    { name: 'Pink', color: '#FFC0CB' },
    { name: 'Purple', color: '#800080' },
    { name: 'Yellow', color: '#FFFF00' },
    { name: 'Orange', color: '#FFA500' },
    { name: 'Tan', color: '#D2B48C' },
    { name: 'Camel', color: '#C19A6B' },
    { name: 'Ivory', color: '#FFFFF0' },
    { name: 'Olive', color: '#808000' },
    { name: 'Khaki', color: '#C3B091' },
    { name: 'Rust', color: '#B7410E' },
    { name: 'Terracotta', color: '#E2725B' },
    { name: 'Taupe', color: '#483C32' },
    { name: 'Coral', color: '#FF7F50' },
    { name: 'Fuchsia', color: '#FF00FF' },
    { name: 'Sky Blue', color: '#87CEEB' },
    { name: 'Cobalt', color: '#0047AB' },
    { name: 'Teal', color: '#008080' },
    { name: 'Emerald', color: '#50C878' },
    { name: 'Mint', color: '#98FF98' },
    { name: 'Blush', color: '#FFB6C1' },
    { name: 'Lavender', color: '#E6E6FA' },
    { name: 'Powder Blue', color: '#B0E0E6' },
    { name: 'Pale Yellow', color: '#FFFFE0' },
    { name: 'Silver', color: '#C0C0C0' },
    { name: 'Gold', color: '#FFD700' },
    { name: 'Bronze', color: '#CD7F32' }
  ];

  // Flattened fabric type options - optimized by popularity
  const fabricTypeOptions = [
    'Cotton / cotton blend',
    'Denim',
    'Polyester',
    'Jersey / knit',
    'Silk / satin',
    'Wool / cashmere',
    'Linen / linen blend',
    'Nylon / spandex (stretch)',
    'Rayon / viscose',
    'Leather / faux leather',
    'Modal / TENCEL™',
    'Tweed / houndstooth',
    'Corduroy / twill',
    'Suede',
    'Mesh / performance synthetic',
    'Chiffon / organza',
    'Velvet'
  ];

  // Fit attributes - optimized by popularity
  const fitAttributes = [
    'Regular / true to size',
    'Slim / fitted',
    'Relaxed / loose',
    'Oversized',
    'Tailored',
    'Cropped',
    'High-rise / mid-rise / low-rise',
    'Tapered / straight-leg / wide-leg / flared',
    'A-line / bodycon'
  ];

  // Sleeve length options - optimized by popularity
  const sleeveLengthOptions = [
    'Short Sleeve',
    'Long Sleeve',
    'Sleeveless',
    'Half Sleeve',
    '3/4th',
    'Full sleeves'
  ];

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

  const handleStartGenerating = () => {
    navigate('/outfit-generation');
  };

  const handleClothingCategoryChange = (e) => {
    setClothingCategory(e.target.value);
    setClothingSubCategory(''); // Reset sub-category when category changes
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

  const handleClothingIconClick = () => {
    setShowClothingModal(true);
  };

  const handleClothingModalClose = () => {
    setShowClothingModal(false);
    // Reset form when closing
    setClothingCategory('Top');
    setClothingSubCategory('');
    setBrandName('');
    setColor('');
    setFabricType('');
    setFitAttribute('');
    setSleeveLength('');
  };

  const handleAddClothingItem = () => {
    // Create clothing item object
    const newItem = {
      id: Date.now(), // Simple unique ID
      category: clothingCategory,
      type: clothingSubCategory,
      brand: brandName,
      color: color,
      fabricType: fabricType,
      fit: fitAttribute,
      sleeveLength: sleeveLength
    };

    // Add to selected items
    setSelectedClothingItems(prev => [...prev, newItem]);

    // Close modal and reset form
    handleClothingModalClose();
  };

  const handleRemoveClothingItem = (itemId) => {
    setSelectedClothingItems(prev => prev.filter(item => item.id !== itemId));
  };

  const getItemDisplayText = (item) => {
    const parts = [];
    if (item.brand) parts.push(item.brand);
    if (item.category) parts.push(item.category);
    if (item.type) parts.push(item.type);
    if (item.color) parts.push(item.color);
    return parts.join(', ');
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
                  <label className="weather-label">Season</label>
                  <select
                    className="weather-select"
                    value={weatherData.season}
                    onChange={(e) => handleWeatherDataChange('season', e.target.value)}
                  >
                    <option value="">Select season</option>
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

        {/* Clothing Selection Modal */}
        {showClothingModal && (
          <div className="clothing-modal-overlay" onClick={handleClothingModalClose}>
            <div className="clothing-modal" onClick={(e) => e.stopPropagation()}>
              <div className="clothing-modal-header">
                <h3>Choose Clothing Item</h3>
                <button className="clothing-modal-close" onClick={handleClothingModalClose}>×</button>
              </div>
              <div className="clothing-modal-content">
                <div className="clothing-selection-form">
                  {/* Category Dropdown */}
                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select 
                      className="form-dropdown"
                      value={clothingCategory}
                      onChange={handleClothingCategoryChange}
                    >
                      {Object.keys(clothingOptions).map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  {/* Sub-category Dropdown */}
                  <div className="form-group">
                    <label className="form-label">Type</label>
                    <select 
                      className="form-dropdown"
                      value={clothingSubCategory}
                      onChange={(e) => setClothingSubCategory(e.target.value)}
                    >
                      <option value="">Select Type</option>
                      {clothingOptions[clothingCategory] && clothingOptions[clothingCategory].map((item) => (
                        <option key={item} value={item}>{item}</option>
                      ))}
                    </select>
                  </div>

                  {/* Brand Name Input - Full Width */}
                  <div className="form-group full-width">
                    <label className="form-label">Brand Name</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Enter brand name"
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                    />
                  </div>

                  {/* Color Dropdown */}
                  <div className="form-group">
                    <label className="form-label">Color</label>
                    <select 
                      className="form-dropdown"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                    >
                      <option value="">Select Color</option>
                      {colorOptions.map((colorOption) => (
                        <option key={colorOption.name} value={colorOption.name}>
                          {colorOption.name}
                        </option>
                      ))}
                    </select>
                    {color && (
                      <div className="color-preview">
                        <span className="color-name">{color}</span>
                        <div 
                          className="color-rectangle"
                          style={{ 
                            backgroundColor: colorOptions.find(c => c.name === color)?.color || '#000000'
                          }}
                        ></div>
                      </div>
                    )}
                  </div>

                  {/* Fabric Type Dropdown */}
                  <div className="form-group">
                    <label className="form-label">Fabric Type</label>
                    <select 
                      className="form-dropdown"
                      value={fabricType}
                      onChange={(e) => setFabricType(e.target.value)}
                    >
                      <option value="">Select Fabric Type</option>
                      {fabricTypeOptions.map((fabric) => (
                        <option key={fabric} value={fabric}>{fabric}</option>
                      ))}
                    </select>
                  </div>

                  {/* Fit Attribute Dropdown */}
                  <div className="form-group">
                    <label className="form-label">Fit</label>
                    <select 
                      className="form-dropdown"
                      value={fitAttribute}
                      onChange={(e) => setFitAttribute(e.target.value)}
                    >
                      <option value="">Select Fit</option>
                      {fitAttributes.map((fit) => (
                        <option key={fit} value={fit}>{fit}</option>
                      ))}
                    </select>
                  </div>

                  {/* Sleeve Length Dropdown */}
                  <div className="form-group">
                    <label className="form-label">Sleeve Length</label>
                    <select 
                      className="form-dropdown"
                      value={sleeveLength}
                      onChange={(e) => setSleeveLength(e.target.value)}
                    >
                      <option value="">Select Sleeve Length</option>
                      {sleeveLengthOptions.map((sleeve) => (
                        <option key={sleeve} value={sleeve}>{sleeve}</option>
                      ))}
                    </select>
                  </div>

                  {/* Add Item Button */}
                  <div className="form-group">
                    <button 
                      className="add-item-done-button"
                      onClick={handleAddClothingItem}
                      disabled={!clothingCategory || !clothingSubCategory}
                    >
                      Add Item
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="dashboard-content">
          {/* Top Section */}
          <div className="section">
            <div className="dropdown-group">
              <select 
                className="dropdown-field"
                value={eventCategory}
                onChange={handleEventCategoryChange}
              >
                <option value="">Select Category</option>
                {Object.keys(eventCategories).map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <select 
                className="dropdown-field"
                value={eventSubCategory}
                onChange={(e) => setEventSubCategory(e.target.value)}
                disabled={!eventCategory}
              >
                <option value="">Select Sub-Category</option>
                {eventCategory && eventCategories[eventCategory].map((subCat) => (
                  <option key={subCat} value={subCat}>{subCat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button 
          className="start-button" 
          onClick={handleStartGenerating}
          disabled={!eventCategory || !eventSubCategory}
        >
          START GENERATING
        </button>

        {/* Clothing Icon with Generate Text */}
        <div className="clothing-section">
          <button className="clothing-icon" onClick={handleClothingIconClick}>
            👕
          </button>
          <span className="generate-with-existing-text">Generate with existing outfit</span>
        </div>

        {/* Selected Clothing Items */}
        {selectedClothingItems.length > 0 && (
          <div className="selected-items-section">
            <h3>Selected Clothing Items</h3>
            <ul>
              {selectedClothingItems.map(item => (
                <li key={item.id}>
                  {getItemDisplayText(item)}
                  <button className="remove-item-button" onClick={() => handleRemoveClothingItem(item.id)}>×</button>
                </li>
              ))}
            </ul>
            <button className="add-more-item-button" onClick={handleClothingIconClick}>
              + Add More Item
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard; 