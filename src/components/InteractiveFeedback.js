import React, { useState } from 'react';
import DatabaseService from '../services/databaseService';

function InteractiveFeedback({ isOpen, onClose, outfitRating, onFeedbackSubmit }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [feedbackData, setFeedbackData] = useState({
    outfitRating: outfitRating,
    overallExperience: null,
    outfitAspects: {
      colors: null,
      style: null,
      fit: null,
      occasion: null
    },
    appFeatures: {
      skinToneSelector: null,
      hairColorSelector: null,
      filterProcess: null,
      loadingTime: null
    },
    improvements: [],
    wouldWear: null,
    wouldRecommend: null,
    additionalComments: ''
  });

  const totalSteps = 6;

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const result = await DatabaseService.saveOutfitFeedback({
        ...feedbackData,
        timestamp: new Date().toISOString(),
        feedbackType: 'interactive_outfit_feedback'
      });
      
      if (result.success) {
        console.log('✅ Interactive feedback saved successfully!');
        onFeedbackSubmit && onFeedbackSubmit(feedbackData);
        onClose();
      }
    } catch (error) {
      console.error('Error saving feedback:', error);
    }
  };

  const updateFeedback = (path, value) => {
    setFeedbackData(prev => {
      const updated = { ...prev };
      const keys = path.split('.');
      let current = updated;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      
      return updated;
    });
  };

  const addImprovement = (improvement) => {
    setFeedbackData(prev => ({
      ...prev,
      improvements: prev.improvements.includes(improvement)
        ? prev.improvements.filter(i => i !== improvement)
        : [...prev.improvements, improvement]
    }));
  };

  // Step 1: Overall Experience
  const renderStep1 = () => (
    <div className="feedback-step">
      <h3>How was your overall experience? 🌟</h3>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', margin: '30px 0' }}>
        {[
          { emoji: '😍', label: 'Amazing', value: 5 },
          { emoji: '😊', label: 'Great', value: 4 },
          { emoji: '🙂', label: 'Good', value: 3 },
          { emoji: '😐', label: 'Okay', value: 2 },
          { emoji: '😕', label: 'Poor', value: 1 }
        ].map((option) => (
          <div
            key={option.value}
            onClick={() => updateFeedback('overallExperience', option.value)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '15px',
              borderRadius: '12px',
              border: feedbackData.overallExperience === option.value ? '3px solid #4CAF50' : '2px solid #e0e0e0',
              backgroundColor: feedbackData.overallExperience === option.value ? '#f0f8f0' : 'white',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              minWidth: '70px'
            }}
          >
            <div style={{ fontSize: '2em', marginBottom: '5px' }}>{option.emoji}</div>
            <div style={{ fontSize: '12px', fontWeight: 'bold' }}>{option.label}</div>
          </div>
        ))}
      </div>
    </div>
  );

  // Step 2: Outfit Aspects
  const renderStep2 = () => (
    <div className="feedback-step">
      <h3>Rate different aspects of the outfit 👗</h3>
      {[
        { key: 'colors', label: 'Color Combination', icon: '🎨' },
        { key: 'style', label: 'Style Match', icon: '✨' },
        { key: 'fit', label: 'Fit Accuracy', icon: '📏' },
        { key: 'occasion', label: 'Occasion Appropriate', icon: '🎯' }
      ].map((aspect) => (
        <div key={aspect.key} style={{ margin: '20px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '1.2em', marginRight: '8px' }}>{aspect.icon}</span>
            <span style={{ fontWeight: 'bold' }}>{aspect.label}</span>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {[1, 2, 3, 4, 5].map((rating) => (
              <div
                key={rating}
                onClick={() => updateFeedback(`outfitAspects.${aspect.key}`, rating)}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: feedbackData.outfitAspects[aspect.key] >= rating ? '#FFD700' : '#e0e0e0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontSize: '1.2em'
                }}
              >
                ⭐
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  // Step 3: App Features
  const renderStep3 = () => (
    <div className="feedback-step">
      <h3>How did our new features work for you? 🛠️</h3>
      {[
        { key: 'skinToneSelector', label: 'Skin Tone Color Picker', icon: '🎨' },
        { key: 'hairColorSelector', label: 'Hair Color Picker', icon: '💇‍♀️' },
        { key: 'filterProcess', label: 'Filter Selection Process', icon: '🔍' },
        { key: 'loadingTime', label: 'App Speed & Loading', icon: '⚡' }
      ].map((feature) => (
        <div key={feature.key} style={{ margin: '20px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '1.2em', marginRight: '8px' }}>{feature.icon}</span>
            <span style={{ fontWeight: 'bold' }}>{feature.label}</span>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            {[
              { emoji: '😍', label: 'Loved it', value: 5 },
              { emoji: '👍', label: 'Good', value: 4 },
              { emoji: '👌', label: 'Okay', value: 3 },
              { emoji: '👎', label: 'Poor', value: 2 },
              { emoji: '😤', label: 'Terrible', value: 1 }
            ].map((option) => (
              <div
                key={option.value}
                onClick={() => updateFeedback(`appFeatures.${feature.key}`, option.value)}
                style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: feedbackData.appFeatures[feature.key] === option.value ? '2px solid #4CAF50' : '1px solid #e0e0e0',
                  backgroundColor: feedbackData.appFeatures[feature.key] === option.value ? '#f0f8f0' : 'white',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontSize: '12px',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: '1.2em' }}>{option.emoji}</div>
                <div>{option.label}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  // Step 4: Improvements
  const renderStep4 = () => (
    <div className="feedback-step">
      <h3>What would make this better? 💡</h3>
      <p style={{ color: '#666', marginBottom: '20px' }}>Select all that apply:</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
        {[
          '🎨 More color options',
          '👗 More clothing styles',
          '🏷️ More brand options',
          '⚡ Faster loading',
          '📱 Better mobile design',
          '🔄 More outfit variations',
          '👥 Social sharing',
          '💾 Save favorite outfits',
          '📅 Outfit calendar',
          '🛍️ Shopping links',
          '📸 Upload my photos',
          '🎯 Better filters'
        ].map((improvement) => (
          <div
            key={improvement}
            onClick={() => addImprovement(improvement)}
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: feedbackData.improvements.includes(improvement) ? '2px solid #4CAF50' : '1px solid #e0e0e0',
              backgroundColor: feedbackData.improvements.includes(improvement) ? '#f0f8f0' : 'white',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              textAlign: 'center',
              fontSize: '14px'
            }}
          >
            {improvement}
          </div>
        ))}
      </div>
    </div>
  );

  // Step 5: Would Wear & Recommend
  const renderStep5 = () => (
    <div className="feedback-step">
      <h3>Final thoughts 🤔</h3>
      
      <div style={{ margin: '30px 0' }}>
        <h4>Would you actually wear this outfit?</h4>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', margin: '15px 0' }}>
          {[
            { emoji: '💯', label: 'Absolutely!', value: 'yes' },
            { emoji: '🤔', label: 'Maybe...', value: 'maybe' },
            { emoji: '❌', label: 'No way', value: 'no' }
          ].map((option) => (
            <div
              key={option.value}
              onClick={() => updateFeedback('wouldWear', option.value)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '15px',
                borderRadius: '12px',
                border: feedbackData.wouldWear === option.value ? '3px solid #4CAF50' : '2px solid #e0e0e0',
                backgroundColor: feedbackData.wouldWear === option.value ? '#f0f8f0' : 'white',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                minWidth: '100px'
              }}
            >
              <div style={{ fontSize: '2em', marginBottom: '5px' }}>{option.emoji}</div>
              <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{option.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ margin: '30px 0' }}>
        <h4>Would you recommend this app to friends?</h4>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', margin: '15px 0' }}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
            <div
              key={score}
              onClick={() => updateFeedback('wouldRecommend', score)}
              style={{
                width: '35px',
                height: '35px',
                borderRadius: '50%',
                backgroundColor: feedbackData.wouldRecommend === score ? '#4CAF50' : '#e0e0e0',
                color: feedbackData.wouldRecommend === score ? 'white' : '#333',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontSize: '14px',
                fontWeight: 'bold'
              }}
            >
              {score}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#666', margin: '10px 0' }}>
          <span>Not likely</span>
          <span>Extremely likely</span>
        </div>
      </div>
    </div>
  );

  // Step 6: Optional Comments
  const renderStep6 = () => (
    <div className="feedback-step">
      <h3>Anything else? 💬</h3>
      <p style={{ color: '#666', marginBottom: '20px' }}>Optional - tell us more about your experience:</p>
      <textarea
        value={feedbackData.additionalComments}
        onChange={(e) => updateFeedback('additionalComments', e.target.value)}
        placeholder="What surprised you? What frustrated you? What made you smile? Any suggestions?"
        style={{
          width: '100%',
          height: '120px',
          padding: '15px',
          borderRadius: '8px',
          border: '1px solid #e0e0e0',
          fontSize: '14px',
          resize: 'vertical',
          fontFamily: 'inherit'
        }}
      />
      <div style={{ margin: '20px 0', textAlign: 'center' }}>
        <p style={{ fontSize: '2em' }}>🎉</p>
        <p style={{ color: '#666' }}>Thank you for helping us improve!</p>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      case 5: return renderStep5();
      case 6: return renderStep6();
      default: return renderStep1();
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '30px',
        maxWidth: '600px',
        width: '90%',
        maxHeight: '80%',
        overflow: 'auto',
        position: 'relative'
      }}>
        {/* Header */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ margin: 0 }}>Quick Feedback ✨</h2>
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#666'
              }}
            >
              ✕
            </button>
          </div>
          
          {/* Progress Bar */}
          <div style={{ margin: '15px 0' }}>
            <div style={{
              width: '100%',
              height: '6px',
              backgroundColor: '#e0e0e0',
              borderRadius: '3px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${(currentStep / totalSteps) * 100}%`,
                height: '100%',
                backgroundColor: '#4CAF50',
                transition: 'width 0.3s ease'
              }} />
            </div>
            <p style={{ fontSize: '12px', color: '#666', margin: '5px 0 0 0' }}>
              Step {currentStep} of {totalSteps}
            </p>
          </div>
        </div>

        {/* Content */}
        {renderCurrentStep()}

        {/* Navigation */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginTop: '30px',
          paddingTop: '20px',
          borderTop: '1px solid #e0e0e0'
        }}>
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            style={{
              padding: '10px 20px',
              borderRadius: '6px',
              border: '1px solid #e0e0e0',
              backgroundColor: currentStep === 1 ? '#f5f5f5' : 'white',
              color: currentStep === 1 ? '#999' : '#333',
              cursor: currentStep === 1 ? 'not-allowed' : 'pointer'
            }}
          >
            ← Previous
          </button>

          {currentStep === totalSteps ? (
            <button
              onClick={handleSubmit}
              style={{
                padding: '10px 30px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: '#4CAF50',
                color: 'white',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Submit Feedback 🚀
            </button>
          ) : (
            <button
              onClick={handleNext}
              style={{
                padding: '10px 20px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: '#4CAF50',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default InteractiveFeedback; 