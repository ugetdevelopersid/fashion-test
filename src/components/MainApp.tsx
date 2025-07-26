'use client';

import { useState } from 'react';
import { logOut } from '../lib/auth';
import { User } from 'firebase/auth';
import { UserProfile } from '../lib/userHelpers';
import { updateUser } from '../lib/firestore';
import { getCurrentUser } from '../lib/auth';
import ProfileEdit from './ProfileEdit';
import ProfileSummary from './ProfileSummary';
import Navbar from './Navbar';
import WeatherLocationPage from './WeatherLocationPage';
import EventInput from './EventInput';
import { generateOutfitSuggestion } from '../lib/openaiHelper';
import { 
  FiMail, 
  FiUser, 
  FiUsers, 
  FiCalendar, 
  FiArrowUp, 
  FiTarget, 
  FiScissors,
  FiTrendingUp,
  FiTag,
  FiEdit3,
  FiHome,
  FiTrendingUp as FiTrendingUpIcon,
  FiShoppingBag,
  FiThermometer,
  FiCloud,
  FiMapPin,
  FiGlobe,
  FiMessageSquare,
  FiX,
  FiImage
} from 'react-icons/fi';
import { TbRulerMeasure } from 'react-icons/tb';

interface MainAppProps {
  user: User;
  profile: UserProfile;
  onLogout: () => void;
}

export default function MainApp({ user, profile, onLogout }: MainAppProps) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [currentProfile, setCurrentProfile] = useState(profile);
  const [isShowingWeatherLocation, setIsShowingWeatherLocation] = useState(false);
  const [eventCategory, setEventCategory] = useState('');
  const [eventSubcategory, setEventSubcategory] = useState('');
  const [noOfSuggestions, setNoOfSuggestions] = useState(1);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logOut();
      onLogout();
    } catch (error) {
      console.error('Error logging out:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleProfile = () => {
    setIsEditingProfile(true);
  };

  const handleHome = () => {
    setIsEditingProfile(false);
  };

  const handleProfileEditComplete = (updatedProfile: UserProfile) => {
    setCurrentProfile(updatedProfile);
    setIsEditingProfile(false);
  };

  const handleProfileEditCancel = () => {
    setIsEditingProfile(false);
  };

  const handleWeatherLocation = () => {
    setIsShowingWeatherLocation(true);
  };

  const handleBackFromWeatherLocation = () => {
    setIsShowingWeatherLocation(false);
  };

  const handleProfileUpdate = (updatedProfile: UserProfile) => {
    setCurrentProfile(updatedProfile);
  };

  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [generatedImagePrompt, setGeneratedImagePrompt] = useState<string>('');
  const [showPromptOutput, setShowPromptOutput] = useState(false);
  const [outfitSuggestion, setOutfitSuggestion] = useState<string>('');
  const [whyItWorks, setWhyItWorks] = useState<string>('');
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string>('');

  const handleGeneratePrompt = async () => {
    if (!canGeneratePrompt()) return;
    
    // Create event string
    const eventString = eventSubcategory ? `${eventCategory} - ${eventSubcategory}` : eventCategory;
    
    setIsGenerating(true);
    setError('');
    
    try {
      // Generate outfit suggestion using the two-step process
      const result = await generateOutfitSuggestion(currentProfile, eventString, noOfSuggestions);
      
      // Set the results and show the output
      setOutfitSuggestion(result.outfitSuggestion);
      setWhyItWorks(result.whyItWorks);
      setGeneratedImagePrompt(result.imagePrompt);
      setGeneratedImageUrl(result.imageUrl || '');
      setShowPromptOutput(true);
    } catch (error) {
      console.error('Error generating outfit suggestion:', error);
      setError(error instanceof Error ? error.message : 'Failed to generate outfit suggestion');
    } finally {
      setIsGenerating(false);
    }
  };

  // Check if profile is complete and weather/location are provided
  const isProfileComplete = () => {
    return currentProfile && 
           currentProfile.gender && 
           currentProfile.age && 
           currentProfile.height && 
           currentProfile.weight && 
           currentProfile.bust && 
           currentProfile.waist && 
           currentProfile.hip && 
           currentProfile.skinTone && 
           currentProfile.hairLength && 
           currentProfile.hairColor && 
           currentProfile.personalStyle;
  };

  const isWeatherLocationComplete = () => {
    return currentProfile.weatherTemperature && 
           currentProfile.weatherCondition && 
           currentProfile.locationCity && 
           currentProfile.locationCountry;
  };

  const canGeneratePrompt = () => {
    return isProfileComplete() && isWeatherLocationComplete() && eventCategory;
  };

  const getPromptButtonMessage = () => {
    if (!isProfileComplete()) {
      return "Please complete your profile first to generate prompts.";
    }
    if (!isWeatherLocationComplete()) {
      return "Please set your weather and location preferences to generate prompts.";
    }
    if (!eventCategory) {
      return "Please select an event category to generate prompts.";
    }
    return "";
  };

  // Format measurement for display
  const formatMeasurement = (value?: number, unit: string = 'cm') => {
    return value ? `${value} ${unit}` : 'Not provided';
  };

  // Format weight for display
  const formatWeight = (value?: number) => {
    return value ? `${value} kg` : 'Not provided';
  };

  // Format appearance values for display
  const formatAppearance = (value?: string) => {
    if (!value) return 'Not provided';
    return value.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  // Format skin tone with Fitzpatrick scale info
  const formatSkinTone = (value?: string): { label: string; description: string; color: string } => {
    if (!value) return { label: 'Not provided', description: '', color: '#E5E7EB' };
    
    const skinToneMap: { [key: string]: { label: string; description: string; color: string } } = {
      'fitzpatrick-i': { label: 'Type I', description: 'Very Fair', color: '#F7DBC7' },
      'fitzpatrick-ii': { label: 'Type II', description: 'Fair', color: '#F0C697' },
      'fitzpatrick-iii': { label: 'Type III', description: 'Medium', color: '#E8B887' },
      'fitzpatrick-iv': { label: 'Type IV', description: 'Olive', color: '#D4A574' },
      'fitzpatrick-v': { label: 'Type V', description: 'Brown', color: '#B8956A' },
      'fitzpatrick-vi': { label: 'Type VI', description: 'Dark Brown', color: '#8B6914' }
    };
    
    const skinTone = skinToneMap[value];
    if (skinTone) {
      return skinTone;
    }
    
    // Fallback for old format
    return { label: formatAppearance(value), description: '', color: '#E5E7EB' };
  };

  // Format hair color with color info
  const formatHairColor = (value?: string): { label: string; color: string } => {
    if (!value) return { label: 'Not provided', color: '#E5E7EB' };
    
    const hairColorMap: { [key: string]: { label: string; color: string } } = {
      'black': { label: 'Black', color: '#1C1C1C' },
      'dark-brown': { label: 'Dark Brown', color: '#3D2314' },
      'brown': { label: 'Brown', color: '#5D4037' },
      'light-brown': { label: 'Light Brown', color: '#8D6E63' },
      'dirty-blonde': { label: 'Dirty Blonde', color: '#B8860B' },
      'blonde': { label: 'Blonde', color: '#F5DEB3' },
      'platinum-blonde': { label: 'Platinum', color: '#F7F7F7' },
      'red': { label: 'Red', color: '#A0522D' },
      'auburn': { label: 'Auburn', color: '#722F37' },
      'gray': { label: 'Gray', color: '#808080' },
      'white': { label: 'White', color: '#F5F5F5' },
      'other': { label: 'Other', color: '#9C27B0' }
    };
    
    const hairColor = hairColorMap[value];
    if (hairColor) {
      return hairColor;
    }
    
    // Fallback for old format
    return { label: formatAppearance(value), color: '#E5E7EB' };
  };

  // If editing profile, show the edit component
  if (isEditingProfile) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar 
          onProfile={handleProfile}
          onHome={handleHome}
        />
        <div className="container mx-auto px-4 py-8">
          <ProfileEdit
            profile={currentProfile}
            onComplete={handleProfileEditComplete}
            onCancel={handleProfileEditCancel}
          />
        </div>
      </div>
    );
  }

  // If showing weather/location page
  if (isShowingWeatherLocation) {
    return (
      <WeatherLocationPage
        profile={currentProfile}
        onBack={handleBackFromWeatherLocation}
        onProfileUpdate={handleProfileUpdate}
      />
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar 
        onProfile={handleProfile}
      />
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-white mb-2">
                Welcome to Suggest
              </h1>
              <p className="text-gray-400">
                Your personalized fashion experience awaits
              </p>
        </div>

        {/* Weather & Location Quick Access */}
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-700 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2 flex items-center">
                <FiThermometer className="w-6 h-6 text-blue-400 mr-2" />
                Weather & Location
              </h2>
              <p className="text-gray-400">
                Manage your weather and location preferences
              </p>
            </div>
            <button
              onClick={handleWeatherLocation}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors flex items-center"
            >
              <FiThermometer className="w-4 h-4 mr-2" />
              Manage
            </button>
          </div>
          
          {/* Quick Info Display */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-300 mb-2 flex items-center">
                <FiThermometer className="w-4 h-4 mr-2" />
                Current Weather
              </h3>
              <div className="text-white">
                {currentProfile.weatherTemperature && currentProfile.weatherCondition ? (
                  <span>
                    {currentProfile.weatherTemperature.charAt(0).toUpperCase() + currentProfile.weatherTemperature.slice(1)}, {currentProfile.weatherCondition.charAt(0).toUpperCase() + currentProfile.weatherCondition.slice(1)}
                  </span>
                ) : (
                  <span className="text-gray-400">Not set</span>
                )}
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-300 mb-2 flex items-center">
                <FiMapPin className="w-4 h-4 mr-2" />
                Location
              </h3>
              <div className="text-white">
                {currentProfile.locationCity && currentProfile.locationCountry ? (
                  <span>{currentProfile.locationCity}, {currentProfile.locationCountry}</span>
                ) : (
                  <span className="text-gray-400">Not set</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Generate Prompt Section */}
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
          <div className="text-center mb-6">
                          <h2 className="text-2xl font-bold text-white mb-4 text-center">
                Generate Outfit Suggestions
              </h2>
              <p className="text-gray-400">
                Create personalized fashion recommendations based on your profile and current conditions
              </p>
          </div>
          
          {/* Event Input */}
          <div className="mb-6">
            <EventInput
              eventCategory={eventCategory}
              eventSubcategory={eventSubcategory}
              noOfSuggestions={noOfSuggestions}
              onEventCategoryChange={setEventCategory}
              onEventSubcategoryChange={setEventSubcategory}
              onNoOfSuggestionsChange={setNoOfSuggestions}
            />
          </div>
          
          {/* Status Message */}
          {!canGeneratePrompt() && (
            <div className="mb-4 p-4 bg-yellow-900/20 border border-yellow-700 rounded-lg">
              <p className="text-yellow-300 text-sm">
                {getPromptButtonMessage()}
              </p>
            </div>
          )}
          
          {/* Generate Button */}
          <div className="text-center">
            <button
              onClick={handleGeneratePrompt}
              disabled={!canGeneratePrompt() || isGenerating}
              className={`px-8 py-3 rounded-lg font-medium transition-colors mx-auto ${
                canGeneratePrompt() && !isGenerating
                  ? 'bg-purple-600 hover:bg-purple-700 text-white'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isGenerating ? 'Generating...' : 'Generate Outfit'}
            </button>
            
            {/* Error Display */}
            {error && (
              <div className="mt-4 p-4 bg-red-900/20 border border-red-700 rounded-lg">
                <p className="text-red-300 text-sm">
                  {error}
                </p>
              </div>
            )}
          </div>

          {/* Generated Outfit Output */}
          {showPromptOutput && (
            <div className="mt-6 space-y-6">

              {/* Why It Works */}
              {whyItWorks && (
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white flex items-center">
                      <FiTarget className="w-5 h-5 text-green-400 mr-2" />
                      Why It Works
                    </h3>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4 border border-gray-600">
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {whyItWorks}
                    </p>
                  </div>
                </div>
              )}

              {/* Generated Image */}
              {generatedImageUrl && (
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white flex items-center">
                      <FiImage className="w-5 h-5 text-orange-400 mr-2" />
                      Generated Outfit Image
                    </h3>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4 border border-gray-600">
                    <img 
                      src={generatedImageUrl} 
                      alt="Generated outfit" 
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => {
                        window.open(generatedImageUrl, '_blank');
                      }}
                      className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      View Full Size
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 