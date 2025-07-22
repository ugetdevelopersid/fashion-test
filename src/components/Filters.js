import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatabaseService from '../services/databaseService';

function Filters() {
  const [selectedSubCategory, setSelectedSubCategory] = useState(() => {
    // Get selected subcategory from localStorage or default to 'Colour Group'
    return localStorage.getItem('selectedFilterSubCategory') || 'Colour Group';
  });
  const [selectedOptions, setSelectedOptions] = useState({
    'Colour Group': [],
    'Fabric Type': [],
    'Fit': [],
    'Pattern': [],
    'Personal Style-Archetypes': [],
    'Top': [],
    'Bottom': [],
    'Dress': [],
    'Outerwear': [],
    'Shoes': [],
    'Accessory': [],
    'Brand Preferences': {
      'Owned/Preferred Brands': '',
      'Avoided Brands': ''
    },
    'Notes': ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedGroups, setExpandedGroups] = useState({});
  const [presets, setPresets] = useState([]);
  const [presetName, setPresetName] = useState('');
  const [showSavePresetModal, setShowSavePresetModal] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({
    'User Preferences': false,
    'Outfit Preferences': false
  });
  const [showOptionsPanel, setShowOptionsPanel] = useState(false);

  // Load existing filter selections and presets on component mount
  useEffect(() => {
    const loadExistingFilters = async () => {
      try {
        // Get user data from localStorage
        const userData = localStorage.getItem('userData');
        const user = userData ? JSON.parse(userData) : {};
        
        if (user.email) {
          // Try to load existing filter selections from database
          const filtersResult = await DatabaseService.getAllFilterSelections();
          if (filtersResult.success) {
            // Find the most recent filter selection for this user
            const userFilters = filtersResult.data
              .filter(filter => filter.userId === user.email && !filter.testEntry)
              .sort((a, b) => new Date(b.createdAt?.toDate?.() || b.createdAt) - new Date(a.createdAt?.toDate?.() || a.createdAt));
            
            if (userFilters.length > 0) {
              const latestFilters = userFilters[0];
              // Handle legacy data structure for brand preferences and notes
              const updatedSelectedOptions = {
                ...latestFilters.selectedOptions,
                'Brand Preferences': latestFilters.selectedOptions['Brand Preferences'] || {
                  'Owned/Preferred Brands': '',
                  'Avoided Brands': ''
                },
                'Notes': latestFilters.selectedOptions['Notes'] || ''
              };
              setSelectedOptions(updatedSelectedOptions);
              console.log('✅ Loaded existing filter selections:', updatedSelectedOptions);
            }
          }

          // Load presets
          const presetsResult = await DatabaseService.getFilterPresets(user.email);
          if (presetsResult.success && presetsResult.data) {
            setPresets(presetsResult.data);
            console.log('✅ Loaded filter presets:', presetsResult.data);
          }
        }
      } catch (error) {
        console.error('Error loading existing filters:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadExistingFilters();
  }, []);
  const navigate = useNavigate();

  // Category structure
  const categories = {
    'User Preferences': ['Colour Group', 'Fabric Type', 'Fit', 'Pattern', 'Personal Style-Archetypes', 'Notes'],
    'Outfit Preferences': ['Top', 'Bottom', 'Dress', 'Outerwear', 'Shoes', 'Accessory', 'Brand Preferences']
  };

  // Color groups with their colors - optimized by popularity
  const colorGroups = {
    'Neutrals': ['Black', 'White', 'Gray', 'Navy', 'Beige', 'Tan', 'Camel', 'Ivory'],
    'Earth tones': ['Olive', 'Khaki', 'Rust', 'Terracotta', 'Brown', 'Taupe'],
    'Blues & Greens': ['Sky Blue', 'Cobalt', 'Teal', 'Emerald', 'Mint'],
    'Brights': ['Red', 'Coral', 'Orange', 'Yellow', 'Fuchsia'],
    'Pastels': ['Blush', 'Lavender', 'Powder Blue', 'Pale Yellow'],
    'Metallics': ['Silver', 'Gold', 'Bronze']
  };

  // Fabric types with their examples - optimized by popularity
  const fabricTypes = {
    'Natural fibers': ['Cotton / cotton blend', 'Linen / linen blend', 'Silk / satin', 'Wool / cashmere'],
    'Denim & heavycloth': ['Denim', 'Tweed / houndstooth', 'Corduroy / twill'],
    'Synthetics & blends': ['Polyester', 'Rayon / viscose', 'Mesh / performance synthetic'],
    'Knits & jerseys': ['Jersey / knit', 'Modal / TENCEL™', 'Nylon / spandex (stretch)'],
    'Leathers & suedes': ['Leather / faux leather', 'Suede'],
    'Delicate & sheer': ['Chiffon / organza', 'Velvet']
  };

  // Personal Style-Archetypes with their sub-styles - optimized by popularity
  const personalStyleArchetypes = {
    'Casual & Comfortable': ['Comfort-First and Practical', 'Casual-Casual / Normcore', 'Preppy-Casual'],
    'Minimal & Classic': ['Minimalist and Classic', 'Monochromatic Disciplinarian', 'Parisian Chic'],
    'Business & Professional': ['Business Formal', 'Glamorous and Sophisticated', 'Red-Carpet Ready'],
    'Athletic & Sports-Inspired': ['Sporty and Athleisure', 'Outdoor / Adventure Chic'],
    'Boho & Vintage': ['Bohemian and Free-Spirited', 'Vintage-Inspired (\'70s / \'80s / \'90s)', 'Cottagecore'],
    'Creative & Eclectic': ['Eclectic and Artsy', 'Pattern & Prints Lover', 'Maximalist'],
    'Edgy & Urban': ['Edgy and Streetwear-Focused', 'Techwear', 'Skater / Punk / Grunge'],
    'Sustainable & Conscious': ['Eco-Conscious / Sustainable', 'Slow-Fashion Advocate'],
    'Academia & Intellectual': ['Dark Academia', 'Light Academia'],
    'Subculture & Niche': ['Gothic', 'Y2K Revival', 'Soft Girl / Soft Boy']
  };

  // Patterns - optimized by popularity
  const patterns = [
    'Solid',
    'Striped (horizontal)',
    'Floral',
    'Checked / Plaid',
    'Polka dot',
    'Striped (vertical)',
    'Geometric / abstract',
    'Color-block',
    'Gingham',
    'Animal print',
    'Tie-die',
    'Camouflage'
  ];

  // Fit attributes
  const fitAttributes = [
    'Relaxed / loose',
    'Oversized',
    'Slim / fitted',
    'Regular / true to size',
    'Tailored',
    'Cropped',
    'High-rise / mid-rise / low-rise',
    'Tapered / straight-leg / wide-leg / flared',
    'A-line / bodycon'
  ];

  // Outfit preferences options (removed 'All' options) - optimized by popularity
  const outfitOptions = {
    'Top': ['T-Shirt', 'Blouse', 'Sweater', 'Tank Top', 'Crop Top', 'Tunic'],
    'Bottom': ['Jeans', 'Pants', 'Skirt', 'Shorts', 'Leggings'],
    'Dress': ['Casual Dress', 'Formal Dress', 'Cocktail Dress', 'Maxi Dress', 'Mini Dress'],
    'Outerwear': ['Jacket', 'Coat', 'Blazer', 'Cardigan', 'Hoodie'],
    'Shoes': ['Sneakers', 'Heels', 'Flats', 'Boots', 'Sandals'],
    'Accessory': ['Bag', 'Jewelry', 'Scarf', 'Belt', 'Hat']
  };

  const getOptionsForCategory = (category) => {
    switch (category) {
      case 'Colour Group':
        return colorGroups;
      case 'Fabric Type':
        return fabricTypes;
      case 'Personal Style-Archetypes':
        return personalStyleArchetypes;
      case 'Pattern':
        return patterns;
      case 'Fit':
        return fitAttributes;
      case 'Top':
      case 'Bottom':
      case 'Dress':
      case 'Outerwear':
      case 'Shoes':
      case 'Accessory':
        return outfitOptions[category];
      default:
        return [];
    }
  };

  const handleOptionToggle = (option) => {
    setSelectedOptions(prev => {
      const current = prev[selectedSubCategory] || [];
      const updated = current.includes(option)
        ? current.filter(item => item !== option)
        : [...current, option];
      
      return {
        ...prev,
        [selectedSubCategory]: updated
      };
    });
  };

  const handleGroupToggle = (groupName, items) => {
    setSelectedOptions(prev => {
      const current = prev[selectedSubCategory] || [];
      const groupItems = Array.isArray(items) ? items : Object.values(items);
      
      // Check if all items in group are selected
      const allSelected = groupItems.every(item => current.includes(item));
      
      if (allSelected) {
        // Remove all items from group
        return {
          ...prev,
          [selectedSubCategory]: current.filter(item => !groupItems.includes(item))
        };
      } else {
        // Add all items from group
        const newItems = groupItems.filter(item => !current.includes(item));
        return {
          ...prev,
          [selectedSubCategory]: [...current, ...newItems]
        };
      }
    });
  };

  const toggleGroupExpansion = (groupName) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupName]: !prev[groupName]
    }));
  };

  const handleBrandPreferencesChange = (brandType, value) => {
    setSelectedOptions(prev => ({
      ...prev,
      'Brand Preferences': {
        ...prev['Brand Preferences'],
        [brandType]: value
      }
    }));
  };

  const handleNotesChange = (notes) => {
    setSelectedOptions(prev => ({
      ...prev,
      'Notes': notes
    }));
  };

  const isOptionSelected = (option) => {
    return (selectedOptions[selectedSubCategory] || []).includes(option);
  };

  const isGroupSelected = (groupName, items) => {
    const groupItems = Array.isArray(items) ? items : Object.values(items);
    const current = selectedOptions[selectedSubCategory] || [];
    return groupItems.every(item => current.includes(item));
  };

  const handleSubCategoryClick = (subCategory) => {
    setSelectedSubCategory(subCategory);
    localStorage.setItem('selectedFilterSubCategory', subCategory);
    setShowOptionsPanel(true);
    
    // Close the expanded categories
    setExpandedCategories({
      'User Preferences': false,
      'Outfit Preferences': false
    });
  };

  const handleBack = () => {
    localStorage.removeItem('selectedFilterSubCategory');
    navigate('/dashboard');
  };

  const handleApply = async () => {
    setIsSaving(true);
    
    try {
      // Get user data from localStorage
      const userData = localStorage.getItem('userData');
      const user = userData ? JSON.parse(userData) : {};
      
      // Prepare filter data
      const filterData = {
        userId: user.email || 'anonymous',
        userName: `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Anonymous',
        selectedOptions,
        appliedAt: new Date().toISOString()
      };

      // Save to database
      const result = await DatabaseService.saveFilterSelections(filterData);
      
      if (result.success) {
        console.log('Filter selections saved to database:', filterData);
        alert('Filters applied successfully!');
      } else {
        console.error('Failed to save filter selections:', result.error);
        alert('Filters applied, but there was an issue saving to the database.');
      }
    } catch (error) {
      console.error('Error saving filter selections:', error);
      alert('Filters applied, but there was an issue saving to the database.');
    } finally {
      setIsSaving(false);
      navigate('/dashboard');
    }
  };

  const handleClearAll = () => {
    setSelectedOptions({
      'Colour Group': [],
      'Fabric Type': [],
      'Fit': [],
      'Pattern': [],
      'Personal Style-Archetypes': [],
      'Top': [],
      'Bottom': [],
      'Dress': [],
      'Outerwear': [],
      'Shoes': [],
      'Accessory': [],
      'Brand Preferences': {
        'Owned/Preferred Brands': '',
        'Avoided Brands': ''
      },
      'Notes': ''
    });
    localStorage.removeItem('selectedFilterSubCategory');
  };

  const handleSavePreset = async () => {
    if (!presetName.trim()) {
      alert('Please enter a name for your preset');
      return;
    }

    try {
      const userData = localStorage.getItem('userData');
      const user = userData ? JSON.parse(userData) : {};
      
      if (!user.email) {
        alert('You need to be logged in to save presets');
        return;
      }

      const presetData = {
        userId: user.email,
        name: presetName.trim(),
        selectedOptions,
        createdAt: new Date().toISOString()
      };

      const result = await DatabaseService.saveFilterPreset(presetData);
      
      if (result.success) {
        // Add the new preset to the list
        setPresets([...presets, { ...presetData, id: result.id }]);
        setPresetName('');
        setShowSavePresetModal(false);
        alert('Preset saved successfully!');
      } else {
        alert('Failed to save preset. Please try again.');
      }
    } catch (error) {
      console.error('Error saving preset:', error);
      alert('Failed to save preset. Please try again.');
    }
  };

  const handleLoadPreset = (preset) => {
    setSelectedOptions(preset.selectedOptions);
    alert(`Preset "${preset.name}" loaded successfully!`);
  };

  const handleDeletePreset = async (presetId) => {
    try {
      const result = await DatabaseService.deleteFilterPreset(presetId);
      
      if (result.success) {
        setPresets(presets.filter(preset => preset.id !== presetId));
        alert('Preset deleted successfully!');
      } else {
        alert('Failed to delete preset. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting preset:', error);
      alert('Failed to delete preset. Please try again.');
    }
  };

  const renderOptions = () => {
    const options = getOptionsForCategory(selectedSubCategory);
    
    if (selectedSubCategory === 'Notes') {
      return (
        <div className="notes-section">
          <textarea
            className="notes-textarea"
            placeholder="Add any specific notes about your preferences, body specifications, or other important details (e.g., hair not waxed, specific measurements, etc.)"
            value={selectedOptions['Notes'] || ''}
            onChange={(e) => handleNotesChange(e.target.value)}
            rows={8}
          />
        </div>
      );
    } else if (selectedSubCategory === 'Brand Preferences') {
      return (
        <div className="brand-preferences-section">
          <div className="brand-input-group">
            <label className="brand-label">Owned/Preferred Brands</label>
            <textarea
              className="brand-textarea"
              placeholder="Enter brands you own or prefer (e.g., Nike, Zara, Gucci, etc.)"
              value={selectedOptions['Brand Preferences']['Owned/Preferred Brands'] || ''}
              onChange={(e) => handleBrandPreferencesChange('Owned/Preferred Brands', e.target.value)}
              rows={4}
            />
          </div>
          <div className="brand-input-group">
            <label className="brand-label">Brands to Avoid</label>
            <textarea
              className="brand-textarea"
              placeholder="Enter brands you want to avoid (e.g., H&M, Forever 21, etc.)"
              value={selectedOptions['Brand Preferences']['Avoided Brands'] || ''}
              onChange={(e) => handleBrandPreferencesChange('Avoided Brands', e.target.value)}
              rows={4}
            />
          </div>
        </div>
      );
    } else if (selectedSubCategory === 'Colour Group' || selectedSubCategory === 'Fabric Type' || selectedSubCategory === 'Personal Style-Archetypes') {
      return Object.entries(options).map(([groupName, items]) => (
        <div key={groupName} className="option-group">
          <div 
            className={`group-header dropdown ${isGroupSelected(groupName, items) ? 'selected' : ''}`}
            onClick={() => toggleGroupExpansion(groupName)}
          >
            <div className="group-header-content">
              <div 
                className={`chip-toggle ${isGroupSelected(groupName, items) ? 'selected' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleGroupToggle(groupName, items);
                }}
              >
                {isGroupSelected(groupName, items) ? '✓' : '+'}
              </div>
              <span className="group-name">{groupName}</span>
            </div>
            <span className="dropdown-arrow">{expandedGroups[groupName] ? '▲' : '▼'}</span>
          </div>
          {expandedGroups[groupName] && (
            <div className="group-items">
              <div className="chip-container">
                {items.map((item, index) => (
                  <div 
                    key={index} 
                    className={`option-chip ${isOptionSelected(item) ? 'selected' : ''}`}
                    onClick={() => handleOptionToggle(item)}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ));
    } else {
      return (
        <div className="chip-container">
          {options.map((option, index) => (
            <div 
              key={index} 
              className={`option-chip ${isOptionSelected(option) ? 'selected' : ''}`}
              onClick={() => handleOptionToggle(option)}
            >
              {option}
            </div>
          ))}
        </div>
      );
    }
  };

  const renderPresets = () => {
    if (presets.length === 0) {
      return (
        <div className="no-presets">
          <p>No saved presets yet. Save your current selections as a preset for quick access later.</p>
        </div>
      );
    }

    return (
      <div className="presets-list">
        {presets.map((preset) => (
          <div key={preset.id} className="preset-item">
            <span className="preset-name">{preset.name}</span>
            <div className="preset-actions">
              <button className="preset-load-btn" onClick={() => handleLoadPreset(preset)}>Load</button>
              <button className="preset-delete-btn" onClick={() => handleDeletePreset(preset.id)}>×</button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const toggleCategoryExpansion = (category) => {
    // Close all other categories when opening a new one
    const newExpandedCategories = {
      'User Preferences': false,
      'Outfit Preferences': false
    };
    
    // Toggle the selected category
    newExpandedCategories[category] = !expandedCategories[category];
    setExpandedCategories(newExpandedCategories);
    
    // Hide options panel when toggling categories
    if (newExpandedCategories[category]) {
      setShowOptionsPanel(false);
    }
  };

  return (
    <div className="filters-container">
      {/* Header */}
      <div className="filters-header">
        <button className="back-button" onClick={handleBack}>
          ← BACK
        </button>
        <button className="presets-button" onClick={() => setShowSavePresetModal(true)}>
          Save as Preset
        </button>
      </div>

      {/* Presets Section */}
      <div className="presets-section">
        <h4 className="presets-title">My Presets</h4>
        {renderPresets()}
      </div>

      <div className="filters-content">
        {/* Left Panel - Categories */}
        <div className="categories-panel">
          {Object.entries(categories).map(([category, subCategories]) => (
            <div key={category} className="category-section">
              <div 
                className="category-header dropdown-header" 
                onClick={() => toggleCategoryExpansion(category)}
              >
                <span>{category}</span>
                <span className="dropdown-arrow">{expandedCategories[category] ? '▲' : '▼'}</span>
              </div>
              {expandedCategories[category] && (
                <div className="category-items">
                  {subCategories.map((subCategory, index) => (
                    <div key={index}>
                      <button
                        className={`subcategory-button ${selectedSubCategory === subCategory ? 'active' : ''}`}
                        onClick={() => handleSubCategoryClick(subCategory)}
                      >
                        {subCategory}
                      </button>
                      {index < subCategories.length - 1 && <hr className="subcategory-divider" />}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right Panel - Options */}
        {showOptionsPanel && (
          <div className="options-panel">
            <div className="options-section">
              <h4 className="options-title">{selectedSubCategory}</h4>
              <div className="options-content">
                {renderOptions()}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Action Buttons */}
      <div className="filters-actions">
        <button className="apply-button" onClick={handleApply} disabled={isSaving}>
          {isSaving ? 'SAVING...' : 'APPLY'}
        </button>
        <button className="clear-button" onClick={handleClearAll}>
          CLEAR ALL
        </button>
      </div>

      {/* Save Preset Modal */}
      {showSavePresetModal && (
        <div className="modal-overlay">
          <div className="preset-modal">
            <h3>Save Current Selections as Preset</h3>
            <input
              type="text"
              className="preset-name-input"
              placeholder="Enter preset name (e.g., Summer Casual)"
              value={presetName}
              onChange={(e) => setPresetName(e.target.value)}
            />
            <div className="preset-modal-actions">
              <button className="preset-save-btn" onClick={handleSavePreset}>Save</button>
              <button className="preset-cancel-btn" onClick={() => setShowSavePresetModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Filters; 