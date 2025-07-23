import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatabaseService from '../services/databaseService';

function Filters() {
  const [selectedSubCategory, setSelectedSubCategory] = useState(() => {
    // Get selected subcategory from localStorage or default to 'Personal Style-Archetypes'
    return localStorage.getItem('selectedFilterSubCategory') || 'Personal Style-Archetypes';
  });
  const [selectedOptions, setSelectedOptions] = useState({
    'Personal Style-Archetypes': [],
    'Brand Preferences': {
      'Owned/Preferred Brands': '',
      'Avoided Brands': ''
    }
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedGroups, setExpandedGroups] = useState({});

  // Load existing filter selections on component mount
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
              // Extract only Personal Style and Brand Preferences
              const updatedSelectedOptions = {
                'Personal Style-Archetypes': latestFilters.selectedOptions['Personal Style-Archetypes'] || [],
                'Brand Preferences': latestFilters.selectedOptions['Brand Preferences'] || {
                  'Owned/Preferred Brands': '',
                  'Avoided Brands': ''
                }
              };
              setSelectedOptions(updatedSelectedOptions);
              console.log('✅ Loaded existing filter selections:', updatedSelectedOptions);
            }
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

  // Simplified categories - only Personal Style and Brand Preferences
  const categories = ['Personal Style-Archetypes', 'Brand Preferences'];

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

  const handleSubCategoryClick = (subCategory) => {
    setSelectedSubCategory(subCategory);
    // Save selected subcategory to localStorage
    localStorage.setItem('selectedFilterSubCategory', subCategory);
  };

  const handleOptionToggle = (option, isSubOption = false, parentGroup = null) => {
    if (isSubOption && parentGroup) {
      // Handle sub-options under main groups
      setSelectedOptions(prev => {
        const currentSubOptions = prev[selectedSubCategory] || [];
        let updated;
        if (currentSubOptions.includes(option)) {
          updated = currentSubOptions.filter(item => item !== option);
        } else {
          updated = [...currentSubOptions, option];
        }
        return {
          ...prev,
          [selectedSubCategory]: updated
        };
      });
    } else {
      // Handle main options
      setSelectedOptions(prev => {
        const currentOptions = prev[selectedSubCategory] || [];
        let updated;
        if (currentOptions.includes(option)) {
          updated = currentOptions.filter(item => item !== option);
        } else {
          updated = [...currentOptions, option];
        }
        return {
          ...prev,
          [selectedSubCategory]: updated
        };
      });
    }
  };

  const handleBrandPreferenceChange = (field, value) => {
    setSelectedOptions(prev => ({
      ...prev,
      'Brand Preferences': {
        ...prev['Brand Preferences'],
        [field]: value
      }
    }));
  };

  const toggleGroupExpansion = (group) => {
    setExpandedGroups(prev => ({
      ...prev,
      [group]: !prev[group]
    }));
  };

  const handleApply = async () => {
    setIsSaving(true);
    try {
      // Get user data from localStorage
      const userData = localStorage.getItem('userData');
      const user = userData ? JSON.parse(userData) : {};
      
      if (!user.email) {
        alert('Please complete your profile first');
        navigate('/personal-info');
        return;
      }

      // Save selected options to localStorage
      localStorage.setItem('filterSelections', JSON.stringify(selectedOptions));

      // Save to database
      const result = await DatabaseService.saveFilterSelections({
        userId: user.email,
        userName: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
        selectedOptions: selectedOptions
      });

      if (result.success) {
        console.log('✅ Filter selections saved to database:', selectedOptions);
        navigate('/dashboard');
      } else {
        console.error('❌ Error saving filters:', result.error);
        alert('Error saving preferences. Please try again.');
      }
    } catch (error) {
      console.error('❌ Error saving filters:', error);
      alert('Error saving preferences. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  const renderPersonalStyleOptions = () => {
    return (
      <div className="options-grid">
        {Object.entries(personalStyleArchetypes).map(([group, styles]) => (
          <div key={group} className="options-group">
            <div 
              className="group-header" 
              onClick={() => toggleGroupExpansion(group)}
            >
              <span className="group-title">{group}</span>
              <span className="expand-icon">{expandedGroups[group] ? '−' : '+'}</span>
            </div>
            {expandedGroups[group] && (
              <div className="sub-options">
                {styles.map((style) => {
                  const isSelected = selectedOptions[selectedSubCategory]?.includes(style);
                  return (
                    <button
                      key={style}
                      className={`option-button ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleOptionToggle(style, true, group)}
                    >
                      {style}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderBrandPreferences = () => {
    const brandPrefs = selectedOptions['Brand Preferences'] || {};
    return (
      <div className="brand-preferences">
        <div className="brand-input-group">
          <label className="brand-label">Owned/Preferred Brands</label>
          <textarea
            className="brand-textarea"
            placeholder="Enter brands you own or prefer (one per line or separated by commas)"
            value={brandPrefs['Owned/Preferred Brands'] || ''}
            onChange={(e) => handleBrandPreferenceChange('Owned/Preferred Brands', e.target.value)}
            rows={4}
          />
        </div>
        <div className="brand-input-group">
          <label className="brand-label">Avoided Brands</label>
          <textarea
            className="brand-textarea"
            placeholder="Enter brands you prefer to avoid (one per line or separated by commas)"
            value={brandPrefs['Avoided Brands'] || ''}
            onChange={(e) => handleBrandPreferenceChange('Avoided Brands', e.target.value)}
            rows={4}
          />
        </div>
      </div>
    );
  };

  const renderOptions = () => {
    if (selectedSubCategory === 'Personal Style-Archetypes') {
      return renderPersonalStyleOptions();
    } else if (selectedSubCategory === 'Brand Preferences') {
      return renderBrandPreferences();
    }
    return null;
  };

  if (isLoading) {
    return <div className="loading">Loading preferences...</div>;
  }

  return (
    <div className="filters-container">
      {/* Header */}
      <div className="filters-header">
        <button className="back-button" onClick={handleBack}>
          ← BACK
        </button>
        <h2 className="filters-title">Personal Style & Brands</h2>
      </div>

      <div className="filters-content">
        {/* Left Panel - Categories */}
        <div className="categories-panel">
          <div className="category-section">
            {categories.map((category, index) => (
              <div key={index}>
                <button
                  className={`subcategory-button ${selectedSubCategory === category ? 'active' : ''}`}
                  onClick={() => handleSubCategoryClick(category)}
                >
                  {category}
                </button>
                {index < categories.length - 1 && <hr className="subcategory-divider" />}
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel - Options */}
        <div className="options-panel">
          <div className="options-header">
            <h3 className="options-title">{selectedSubCategory}</h3>
            {selectedSubCategory === 'Personal Style-Archetypes' && (
              <p className="options-description">
                Choose the personal style archetypes that best describe your fashion preferences.
              </p>
            )}
            {selectedSubCategory === 'Brand Preferences' && (
              <p className="options-description">
                List the brands you own, prefer, or want to avoid.
              </p>
            )}
          </div>
          <div className="options-content">
            {renderOptions()}
          </div>
        </div>
      </div>

      {/* Apply Button */}
      <div className="filters-footer">
        <button 
          className={`apply-button ${isSaving ? 'saving' : ''}`}
          onClick={handleApply}
          disabled={isSaving}
        >
          {isSaving ? 'SAVING...' : 'APPLY PREFERENCES'}
        </button>
      </div>
    </div>
  );
}

export default Filters; 