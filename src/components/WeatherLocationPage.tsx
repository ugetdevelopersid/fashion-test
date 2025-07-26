'use client';

import { useState } from 'react';
import { updateUser } from '../lib/firestore';
import { getCurrentUser } from '../lib/auth';
import { UserProfile } from '../lib/userHelpers';
import WeatherInput from './WeatherInput';
import LocationInput from './LocationInput';
import { 
  FiThermometer, 
  FiCloud, 
  FiMapPin, 
  FiGlobe,
  FiArrowLeft
} from 'react-icons/fi';

interface WeatherLocationPageProps {
  profile: UserProfile;
  onBack: () => void;
  onProfileUpdate: (updatedProfile: UserProfile) => void;
}

export default function WeatherLocationPage({ profile, onBack, onProfileUpdate }: WeatherLocationPageProps) {
  const [weatherTemperature, setWeatherTemperature] = useState(profile.weatherTemperature || '');
  const [weatherCondition, setWeatherCondition] = useState(profile.weatherCondition || '');
  const [locationCity, setLocationCity] = useState(profile.locationCity || '');
  const [locationCountry, setLocationCountry] = useState(profile.locationCountry || '');
  const [isSaving, setIsSaving] = useState(false);

  const handleAutosave = async (data: any) => {
    if (isSaving) return; // Prevent multiple simultaneous saves

    setIsSaving(true);
    try {
      const currentUser = getCurrentUser();
      if (!currentUser) return;

      await updateUser(profile.id, data);
      
      // Update local profile state
      onProfileUpdate({
        ...profile,
        ...data
      });
    } catch (error) {
      console.error('Error saving data:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleWeatherChange = (temperature: string, condition: string) => {
    setWeatherTemperature(temperature);
    setWeatherCondition(condition);
    
    if (temperature && condition) {
      handleAutosave({
        weatherTemperature: temperature,
        weatherCondition: condition
      });
    }
  };

  const handleLocationChange = (city: string, country: string) => {
    setLocationCity(city);
    setLocationCountry(country);
    
    if (city && country) {
      handleAutosave({
        locationCity: city,
        locationCountry: country
      });
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-gray-400 hover:text-white mb-4 transition-colors"
          >
            <FiArrowLeft className="w-5 h-5 mr-2" />
            Back to Profile
          </button>
          <h1 className="text-4xl font-bold text-white mb-2">
            Weather & Location
          </h1>
          <p className="text-gray-400">
            Update your weather and location information
          </p>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-8">
              {/* Weather Input */}
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <FiThermometer className="w-6 h-6 text-blue-400 mr-2" />
                  Current Weather
                </h2>
                <WeatherInput
                  temperature={weatherTemperature}
                  condition={weatherCondition}
                  onTemperatureChange={(temp) => handleWeatherChange(temp, weatherCondition)}
                  onConditionChange={(condition) => handleWeatherChange(weatherTemperature, condition)}
                />
              </div>

              {/* Location Input */}
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <FiMapPin className="w-6 h-6 text-green-400 mr-2" />
                  Location
                </h2>
                <LocationInput
                  city={locationCity}
                  country={locationCountry}
                  onCityChange={(city) => handleLocationChange(city, locationCountry)}
                  onCountryChange={(country) => handleLocationChange(locationCity, country)}
                />
              </div>

              {/* Auto-save indicator */}
              {isSaving && (
                <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
                  <div className="flex items-center text-blue-400">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400 mr-2"></div>
                    Auto-saving changes...
                  </div>
                </div>
              )}
            </div>

            {/* Current Information Display */}
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6">Current Information</h2>
              
              <div className="space-y-6">
                {/* Weather Information */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <FiThermometer className="w-5 h-5 text-blue-400 mr-2" />
                    Weather Details
                  </h3>
                  <div className="bg-gray-800 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Temperature:</span>
                      <span className="text-white">
                        {profile.weatherTemperature ? 
                          profile.weatherTemperature.charAt(0).toUpperCase() + profile.weatherTemperature.slice(1) : 
                          'Not set'
                        }
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Condition:</span>
                      <span className="text-white">
                        {profile.weatherCondition ? 
                          profile.weatherCondition.charAt(0).toUpperCase() + profile.weatherCondition.slice(1) : 
                          'Not set'
                        }
                      </span>
                    </div>
                  </div>
                </div>

                {/* Location Information */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <FiMapPin className="w-5 h-5 text-green-400 mr-2" />
                    Location Details
                  </h3>
                  <div className="bg-gray-800 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">City:</span>
                      <span className="text-white">{profile.locationCity || 'Not set'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Country:</span>
                      <span className="text-white">{profile.locationCountry || 'Not set'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 