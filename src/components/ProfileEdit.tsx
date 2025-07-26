'use client';

import { useState, useEffect } from 'react';
import { updateUser, getUserByEmail } from '../lib/firestore';
import { getCurrentUser } from '../lib/auth';
import { UserProfile } from '../lib/userHelpers';
import MeasurementInput from './MeasurementInput';
import WeightInput from './WeightInput';
import SkinToneSelector from './SkinToneSelector';
import HairColorSelector from './HairColorSelector';
import StylePreferences from './StylePreferences';
import { FiUsers, FiCalendar, FiScissors } from 'react-icons/fi';

interface ProfileEditProps {
  profile: UserProfile;
  onComplete: (updatedProfile: UserProfile) => void;
  onCancel: () => void;
}

export default function ProfileEdit({ profile, onComplete, onCancel }: ProfileEditProps) {
  // Form data state - initialize with existing profile data
  const [gender, setGender] = useState(profile.gender || '');
  const [age, setAge] = useState(profile.age ? profile.age.toString() : '');
  const [height, setHeight] = useState(profile.height || 0);
  const [weight, setWeight] = useState(profile.weight || 0);
  const [bust, setBust] = useState(profile.bust || 0);
  const [waist, setWaist] = useState(profile.waist || 0);
  const [hip, setHip] = useState(profile.hip || 0);
  const [skinTone, setSkinTone] = useState(profile.skinTone || '');
  const [hairLength, setHairLength] = useState(profile.hairLength || '');
  const [hairColor, setHairColor] = useState(profile.hairColor || '');
  const [personalStyle, setPersonalStyle] = useState(profile.personalStyle || '');
  const [brand, setBrand] = useState(profile.brand || '');
  const [notes, setNotes] = useState(profile.notes || '');

  
  // UI state
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const totalSteps = 4;

  // Calculate progress percentage
  const getProgressPercentage = () => {
    return Math.round((currentStep / totalSteps) * 100);
  };

  // Validate current step
  const validateCurrentStep = () => {
    setError('');
    
    switch (currentStep) {
      case 1: // Basic Info
        if (!gender) {
          setError('Please select your gender');
          return false;
        }
        const ageNumber = parseInt(age);
        if (!age || isNaN(ageNumber) || ageNumber < 1 || ageNumber > 120) {
          setError('Please enter a valid age between 1 and 120');
          return false;
        }
        return true;
        
      case 2: // Body Measurements
        if (height <= 0 || weight <= 0 || bust <= 0 || waist <= 0 || hip <= 0) {
          setError('Please enter valid measurements for all body dimensions');
          return false;
        }
        return true;
        
      case 3: // Appearance
        if (!skinTone || !hairLength || !hairColor) {
          setError('Please select all appearance options');
          return false;
        }
        return true;
        
      case 4: // Style Preferences
        if (!personalStyle || personalStyle.trim() === '') {
          setError('Please select at least one personal style');
          return false;
        }
        return true;
        

        
      default:
        return false;
    }
  };

  // Save current progress to database
  const saveProgress = async () => {
    const currentUser = getCurrentUser();
    if (!currentUser) return null;

    try {
      const userData = {
        email: currentUser.email!,
        firstName: profile.firstName,
        lastName: profile.lastName,
        gender: gender,
        age: parseInt(age) || 0,
        height: height,
        weight: weight,
        bust: bust,
        waist: waist,
        hip: hip,
        skinTone: skinTone,
        hairLength: hairLength,
        hairColor: hairColor,
        personalStyle: personalStyle,
        brand: brand,
        notes: notes,

      };

      await updateUser(profile.id, userData);
      
      // Return updated profile
      return {
        ...profile,
        ...userData
      };
    } catch (error) {
      console.error('Error saving progress:', error);
      throw error;
    }
  };

  // Handle next button click
  const handleNext = async () => {
    if (!validateCurrentStep()) return;

    setIsLoading(true);
    
    try {
      // Save progress after each step
      const updatedProfile = await saveProgress();
      
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      } else {
        // Final step - complete editing
        if (updatedProfile) {
          onComplete(updatedProfile);
        }
      }
    } catch (error) {
      setError('Failed to save changes. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle previous button click
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setError('');
    }
  };

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' }
  ];



  const hairLengthOptions = [
    { value: 'very-short', label: 'Very Short' },
    { value: 'short', label: 'Short' },
    { value: 'medium', label: 'Medium' },
    { value: 'long', label: 'Long' },
    { value: 'very-long', label: 'Very Long' }
  ];



  // Get step titles
  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Basic Information';
      case 2: return 'Body Measurements';
      case 3: return 'Appearance Details';
      case 4: return 'Style Preferences';

      default: return '';
    }
  };

  // Get step description
  const getStepDescription = () => {
    switch (currentStep) {
      case 1: return 'Update your basic information';
      case 2: return 'Update your body measurements';
      case 3: return 'Update your appearance details';
      case 4: return 'Tell us about your style preferences';

      default: return '';
    }
  };

  // Render current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="gender" className="flex items-center text-sm font-medium text-gray-200 mb-2">
                <FiUsers className="w-5 h-5 text-gray-400" />
                <span className="ml-2">Gender</span>
                <span className="text-red-400 ml-1">*</span>
              </label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                required
              >
                <option value="">Select your gender</option>
                {genderOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="age" className="flex items-center text-sm font-medium text-gray-200 mb-2">
                <FiCalendar className="w-5 h-5 text-gray-400" />
                <span className="ml-2">Age</span>
                <span className="text-red-400 ml-1">*</span>
              </label>
              <input
                type="number"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter your age"
                min="1"
                max="120"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <MeasurementInput
              id="height"
              label="Height"
              value={height}
              onChange={setHeight}
              placeholder="Enter your height"
              icon="height"
              required
            />

            <WeightInput
              id="weight"
              label="Weight"
              value={weight}
              onChange={setWeight}
              placeholder="Enter your weight"
              required
            />

            <MeasurementInput
              id="bust"
              label="Bust"
              value={bust}
              onChange={setBust}
              placeholder="Enter your bust measurement"
              icon="bust"
              required
            />

            <MeasurementInput
              id="waist"
              label="Waist"
              value={waist}
              onChange={setWaist}
              placeholder="Enter your waist measurement"
              icon="waist"
              required
            />

            <MeasurementInput
              id="hip"
              label="Hip"
              value={hip}
              onChange={setHip}
              placeholder="Enter your hip measurement"
              icon="hip"
              required
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <SkinToneSelector
              id="skinTone"
              label="Skin Tone"
              value={skinTone}
              onChange={setSkinTone}
              required
            />

            <div>
              <label htmlFor="hairLength" className="flex items-center text-sm font-medium text-gray-200 mb-2">
                <FiScissors className="w-5 h-5 text-gray-400" />
                <span className="ml-2">Hair Length</span>
                <span className="text-red-400 ml-1">*</span>
              </label>
              <select
                id="hairLength"
                value={hairLength}
                onChange={(e) => setHairLength(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                required
              >
                <option value="">Select your hair length</option>
                {hairLengthOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <HairColorSelector
              id="hairColor"
              label="Hair Color"
              value={hairColor}
              onChange={setHairColor}
              required
            />
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <StylePreferences
              personalStyle={personalStyle}
              brand={brand}
              notes={notes}
              isEditing={true}
              onSave={(data) => {
                setPersonalStyle(data.personalStyle);
                setBrand(data.brand);
                setNotes(data.notes);
              }}
            />
          </div>
        );



      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-gray-900 rounded-lg border border-gray-700">
      {/* Progress Header */}
             <div className="p-6 border-b border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">
            Edit Your Profile
          </h2>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-400">
              Step {currentStep} of {totalSteps}
            </span>
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-200 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
        
        {/* Progress Bar */}
                 <div className="w-full bg-gray-800 rounded-full h-2 mb-4">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${getProgressPercentage()}%` }}
          ></div>
        </div>
        
        <div className="text-center">
                     <h3 className="text-lg font-semibold text-white mb-1">
            {getStepTitle()}
          </h3>
                     <p className="text-gray-400 text-sm">
            {getStepDescription()}
          </p>
        </div>
        
        <div className="mt-4 text-center">
                     <span className="text-xs font-medium text-blue-400">
            {getProgressPercentage()}% Complete
          </span>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6">
        {error && (
          <div className="mb-6 bg-red-900/20 border border-red-700 rounded-lg p-4">
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          {renderStepContent()}
        </form>
      </div>

      {/* Navigation Footer */}
             <div className="p-6 border-t border-gray-700 flex justify-between">
        <button
          type="button"
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className="px-6 py-2 border border-gray-600 rounded-lg text-gray-300 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>

        <button
          type="button"
          onClick={handleNext}
          disabled={isLoading}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-medium rounded-lg transition-colors"
        >
          {isLoading ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Saving...
            </div>
          ) : currentStep === totalSteps ? (
            'Save Changes'
          ) : (
            'Next'
          )}
        </button>
      </div>
    </div>
  );
} 