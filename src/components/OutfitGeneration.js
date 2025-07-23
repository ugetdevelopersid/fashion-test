import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PersistentBackButton from './PersistentBackButton';
import RegenerateModal from './RegenerateModal';
import InteractiveFeedback from './InteractiveFeedback';
import GeneratedOutfits from './GeneratedOutfits';
import { generateOutfits } from '../services/openaiService';
import { generateOutfitImage } from '../services/imageGenerationService';

function OutfitGeneration() {
  const [rating, setRating] = useState(null);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [showRegenerateModal, setShowRegenerateModal] = useState(false);
  const [feedbackData, setFeedbackData] = useState({
    outfitStyle: false,
    colorCombination: false,
    fitAccuracy: false,
    occasionMatch: false,
    overallAppeal: false,
    additionalComments: ''
  });
  const [showThankYou, setShowThankYou] = useState(false);
  const [showGeneratedImage, setShowGeneratedImage] = useState(false); // Start with category selection
  const [showInteractiveFeedback, setShowInteractiveFeedback] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOutfits, setGeneratedOutfits] = useState(null);
  const [outfitError, setOutfitError] = useState(null);
  const [outfitCount, setOutfitCount] = useState(3); // Default to 3 outfits
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();

  const handleMenuClick = () => {
    navigate('/menu');
  };

  const handleSubmitRating = () => {
    console.log('Rating submitted:', rating);
    if (rating) {
      setShowInteractiveFeedback(true);
    }
  };

  const handleFeedbackSubmit = (feedbackData) => {
    console.log('Interactive feedback submitted:', feedbackData);
    setShowThankYou(true);
    setTimeout(() => setShowThankYou(false), 3000);
  };

  const handleCloseFeedback = () => {
    setShowInteractiveFeedback(false);
  };

  // Removed unused function to fix ESLint warning

  const handleFeedbackChange = (field, value) => {
    setFeedbackData({
      ...feedbackData,
      [field]: value
    });
  };

  const handleSubmitFeedback = () => {
    console.log('Feedback submitted:', feedbackData);
    // Here you would typically save the feedback to a database
    setShowFeedbackForm(false);
    setShowThankYou(true);
    
    // Hide thank you message after 3 seconds
    setTimeout(() => {
      setShowThankYou(false);
    }, 3000);
  };

  const handleGenerateClick = async () => {
    console.log('Generate button clicked!');
    setIsGenerating(true);
    setOutfitError(null);
    
    try {
      // Get user data from localStorage
      const userData = localStorage.getItem('userData');
      console.log('User data from localStorage:', userData);
      
      if (!userData) {
        console.log('No user data found, showing error');
        setOutfitError('Please complete your profile setup first');
        setIsGenerating(false);
        return;
      }

      const user = JSON.parse(userData);
      console.log('Parsed user data:', user);
      
      // Build user profile from actual user data
      const userProfileData = {
        eventName: 'brunch', // Default event, could be made dynamic
        gender: user.gender || 'Male',
        age: user.ageRange ? user.ageRange.split('(')[1]?.split('-')[0] || '28' : '28',
        height: user.heightInches ? user.heightInches.toString() : '179',
        weight: '75', // Not collected in current forms, using default
        // Body measurements - convert to cm if needed
        shoulder_cm: user.gender === 'Male' ? (parseInt(user.bust || 40) * 2.54) : null,
        waist_cm: parseInt(user.waist || 32) * 2.54,
        hip_cm: parseInt(user.hips || 38) * 2.54,
        height_cm: user.heightInches ? (user.heightInches * 2.54) : 179,
        // Body shape and build data
        bodyShape: 'Apple', // Could be calculated based on measurements
        buildProportions: `${user.heightInches ? (user.heightInches >= 70 ? 'Tall' : 'Average') : 'Average'} height, ${user.gender === 'Male' ? 'Athletic' : 'Regular'} build`,
        brandPreferences: user.brandsPreferred || 'Uniqlo, Zara, H&M, thrifting',
        personalStyle: user.personalStyle ? user.personalStyle.join(', ') : 'minimalist-classic, casual, streetwear, preppy',
        skinTone: user.skinTone || 'Wheatish',
        undertone: 'neutral undertone or low contrast',
        hairColor: user.hairColor || 'black',
        location: 'New Delhi, India', // Could be made dynamic
        weatherSeason: 'Hot and humid day', // Could be made dynamic
        profession: 'Professional', // Could be made dynamic
        budgetRange: 'mid market', // Could be made dynamic
        outfitCount: outfitCount // Add the user's selected outfit count
      };
      
      setUserProfile(userProfileData);
      
      console.log('User profile being sent to API:', userProfileData);
      console.log('Selected outfit count:', outfitCount);
      
      // Check if API key is configured
      if (!process.env.REACT_APP_OPENAI_API_KEY) {
        console.error('❌ OpenAI API key not configured');
        setOutfitError('OpenAI API key not configured. Please create a .env.local file with REACT_APP_OPENAI_API_KEY=your_api_key');
        setIsGenerating(false);
        return;
      }
      
      const result = await generateOutfits(userProfileData);
      console.log('API result:', result);
      
      if (result.success) {
        console.log('Success! Setting generated outfits');
        setGeneratedOutfits({
          ...result.outfits,
        });
        setShowGeneratedImage(true);
        
        // Automatically generate image after outfits are created
        console.log('Automatically generating image...');
        try {
          const imageResult = await generateOutfitImage(result.outfits, userProfileData);
          if (imageResult.success) {
            console.log('Image generated successfully:', imageResult.imageUrl);
            // Store the image result in the outfits data
            const outfitsWithImage = {
              ...result.outfits,
              generatedImage: imageResult
            };
            setGeneratedOutfits(outfitsWithImage);
          } else {
            console.log('Image generation failed:', imageResult.error);
            // Continue with outfits even if image fails
          }
        } catch (error) {
          console.error('Error in automatic image generation:', error);
          // Continue with outfits even if image fails
        }
      } else {
        console.log('API returned error:', result.error);
        setOutfitError(result.error || 'Failed to generate outfits');
      }
    } catch (error) {
      console.error('Error generating outfits:', error);
      setOutfitError('Failed to generate outfits. Please try again.');
    } finally {
      console.log('Setting isGenerating to false');
      setIsGenerating(false);
    }
  };

  const handleRegenerate = () => {
    setShowRegenerateModal(true);
  };

  const handleRegenerateOutfits = () => {
    setGeneratedOutfits(null);
    setOutfitError(null);
    setShowGeneratedImage(false);
  };

  const handleMorePreferences = () => {
    navigate('/filters');
  };



  return (
    <div className="outfit-container">
      {/* Persistent Back Button */}
      <PersistentBackButton destination="/dashboard" />
      
      {/* Header */}
      <div className="outfit-header">
        <div className="brand">STYLLA</div>
        <button className="menu-button" onClick={handleMenuClick}>
          <div className="hamburger">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>

      {!showGeneratedImage ? (
        // Simple Generate Button Step
        <div className="generate-container">
          <div className="generate-content">
            <h2 className="generate-title">Ready to Generate Your Outfits?</h2>
            <p className="generate-subtitle">Choose how many outfits you'd like to see and click generate for personalized recommendations.</p>
            
            <div className="outfit-count-selector">
              <label className="outfit-count-label">Number of Outfits:</label>
              <div className="outfit-count-buttons">
                {[1, 2, 3, 4, 5, 6].map((count) => (
                  <button
                    key={count}
                    className={`outfit-count-button ${outfitCount === count ? 'active' : ''}`}
                    onClick={() => setOutfitCount(count)}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="generate-actions">
              <button 
                className={`generate-button ${isGenerating ? 'generating' : ''}`}
                onClick={() => {
                  console.log('Button clicked!');
                  handleGenerateClick();
                }}
                disabled={isGenerating}
              >
                {isGenerating ? 'GENERATING...' : `GENERATE ${outfitCount} OUTFIT${outfitCount > 1 ? 'S' : ''}`}
              </button>
              <button className="more-preferences-button" onClick={handleMorePreferences}>
                More Preferences
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Generated Outfits Step
        <>
          {/* Generated Outfits Display */}
          <GeneratedOutfits
            outfits={generatedOutfits}
            isLoading={isGenerating}
            error={outfitError}
            onRegenerate={handleRegenerateOutfits}
            userProfile={userProfile}
          />
          
          {/* Action Buttons */}
          <div className="action-buttons">
            <button className="regenerate-button" onClick={handleRegenerate}>
              GENERATE AGAIN
            </button>
          </div>
          
          {/* Rating Section */}
          <div className="rating-section">
            <div className="rating-title">How would you rate this outfit?</div>
            <div className="rating-slider-container">
              <div className="rating-scale">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <span 
                    key={num} 
                    className={`rating-number ${rating >= num ? 'active' : ''}`}
                    onClick={() => setRating(num)}
                  >
                    {num}
                  </span>
                ))}
              </div>
            </div>
            <button className="submit-button" onClick={handleSubmitRating}>
              SUBMIT
            </button>
          </div>
          
          {/* Feedback Form Modal */}
          {showFeedbackForm && (
            <div className="modal-overlay">
              <div className="modal-content">
                <div className="modal-title">What do you think of this outfit?</div>
                <div className="modal-section">
                  <div className="radio-options">
                    <div className="radio-option">
                      <input 
                        type="checkbox" 
                        id="outfitStyle" 
                        checked={feedbackData.outfitStyle}
                        onChange={(e) => handleFeedbackChange('outfitStyle', e.target.checked)}
                      />
                      <label htmlFor="outfitStyle">The outfit style matches my preferences</label>
                    </div>
                    <div className="radio-option">
                      <input 
                        type="checkbox" 
                        id="colorCombination" 
                        checked={feedbackData.colorCombination}
                        onChange={(e) => handleFeedbackChange('colorCombination', e.target.checked)}
                      />
                      <label htmlFor="colorCombination">The color combination works well</label>
                    </div>
                    <div className="radio-option">
                      <input 
                        type="checkbox" 
                        id="fitAccuracy" 
                        checked={feedbackData.fitAccuracy}
                        onChange={(e) => handleFeedbackChange('fitAccuracy', e.target.checked)}
                      />
                      <label htmlFor="fitAccuracy">The fit appears accurate for my body type</label>
                    </div>
                    <div className="radio-option">
                      <input 
                        type="checkbox" 
                        id="occasionMatch" 
                        checked={feedbackData.occasionMatch}
                        onChange={(e) => handleFeedbackChange('occasionMatch', e.target.checked)}
                      />
                      <label htmlFor="occasionMatch">This outfit is appropriate for my intended occasion</label>
                    </div>
                    <div className="radio-option">
                      <input 
                        type="checkbox" 
                        id="overallAppeal" 
                        checked={feedbackData.overallAppeal}
                        onChange={(e) => handleFeedbackChange('overallAppeal', e.target.checked)}
                      />
                      <label htmlFor="overallAppeal">Overall, I like this outfit</label>
                    </div>
                  </div>
                  <div className="input-group">
                    <textarea 
                      placeholder="Additional comments..."
                      value={feedbackData.additionalComments}
                      onChange={(e) => handleFeedbackChange('additionalComments', e.target.value)}
                      rows={4}
                      className="input-field"
                    />
                  </div>
                </div>
                <button className="modal-regenerate-button" onClick={handleSubmitFeedback}>
                  SUBMIT FEEDBACK
                </button>
              </div>
            </div>
          )}
          
          {/* Thank You Message */}
          {showThankYou && (
            <div className="modal-overlay">
              <div className="modal-content">
                <div className="modal-title">Thank You!</div>
                <p style={{ textAlign: 'center', margin: '20px 0' }}>
                  Your feedback helps us improve our outfit recommendations.
                </p>
              </div>
            </div>
          )}
          
          {/* Regenerate Modal */}
          {showRegenerateModal && (
            <RegenerateModal onClose={() => setShowRegenerateModal(false)} />
          )}

          {/* Interactive Feedback Modal */}
          <InteractiveFeedback
            isOpen={showInteractiveFeedback}
            onClose={handleCloseFeedback}
            outfitRating={rating}
            onFeedbackSubmit={handleFeedbackSubmit}
          />
        </>
      )}
    </div>
  );
}

export default OutfitGeneration; 