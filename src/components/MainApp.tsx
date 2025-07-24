'use client';

import { useState } from 'react';
import { logOut } from '../lib/auth';
import { User } from 'firebase/auth';
import { UserProfile } from '../lib/userHelpers';
import ProfileEdit from './ProfileEdit';
import { 
  FiMail, 
  FiUser, 
  FiUsers, 
  FiCalendar, 
  FiArrowUp, 
  FiTarget, 
  FiScissors
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

  const handleEditProfile = () => {
    setIsEditingProfile(true);
  };

  const handleProfileEditComplete = (updatedProfile: UserProfile) => {
    setCurrentProfile(updatedProfile);
    setIsEditingProfile(false);
  };

  const handleProfileEditCancel = () => {
    setIsEditingProfile(false);
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

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome to Suggest
            </h1>
            <p className="text-gray-400">
              Your personalized fashion experience awaits
            </p>
          </div>
          
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            {isLoggingOut ? 'Logging out...' : 'Logout'}
          </button>
        </header>

        {/* User Profile Summary */}
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-700 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">
              Profile Summary
            </h2>
            <button
              onClick={handleEditProfile}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Edit Profile
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">
              Basic Information
            </h3>
              
              <div>
                                 <p className="flex items-center text-sm text-gray-400 mb-1">
                   <FiMail className="w-4 h-4 mr-2" />
                   Email
                 </p>
                 <p className="text-white font-medium">{user.email}</p>
              </div>
              
              {user.displayName && (
                <div>
                                     <p className="flex items-center text-sm text-gray-400 mb-1">
                     <FiUser className="w-4 h-4 mr-2" />
                     Name
                   </p>
                   <p className="text-white font-medium">{user.displayName}</p>
                </div>
              )}
              
              <div>
                                 <p className="flex items-center text-sm text-gray-400 mb-1">
                   <FiUsers className="w-4 h-4 mr-2" />
                   Gender
                 </p>
                 <p className="text-white font-medium">
                   {formatAppearance(currentProfile.gender)}
                 </p>
              </div>
              
              <div>
                                 <p className="flex items-center text-sm text-gray-400 mb-1">
                   <FiCalendar className="w-4 h-4 mr-2" />
                   Age
                 </p>
                 <p className="text-white font-medium">{currentProfile.age} years old</p>
              </div>
            </div>

            {/* Body Measurements */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">
                Body Measurements
              </h3>
              
              <div>
                                 <p className="flex items-center text-sm text-gray-400 mb-1">
                   <FiArrowUp className="w-4 h-4 mr-2" />
                   Height
                 </p>
                 <p className="text-white font-medium">{formatMeasurement(currentProfile.height)}</p>
              </div>
              
              <div>
                                 <p className="flex items-center text-sm text-gray-400 mb-1">
                   <FiTarget className="w-4 h-4 mr-2" />
                   Weight
                 </p>
                 <p className="text-white font-medium">{formatWeight(currentProfile.weight)}</p>
              </div>
              
              <div>
                                 <p className="flex items-center text-sm text-gray-400 mb-1">
                   <FiUser className="w-4 h-4 mr-2" />
                   Bust
                 </p>
                 <p className="text-white font-medium">{formatMeasurement(currentProfile.bust)}</p>
              </div>
              
              <div>
                                 <p className="flex items-center text-sm text-gray-400 mb-1">
                   <FiTarget className="w-4 h-4 mr-2" />
                   Waist
                 </p>
                 <p className="text-white font-medium">{formatMeasurement(currentProfile.waist)}</p>
              </div>
              
              <div>
                                 <p className="flex items-center text-sm text-gray-400 mb-1">
                   <TbRulerMeasure className="w-4 h-4 mr-2" />
                   Hip
                 </p>
                 <p className="text-white font-medium">{formatMeasurement(currentProfile.hip)}</p>
              </div>
            </div>

            {/* Appearance Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">
                Appearance
              </h3>
              
                                            <div>
                                   <p className="flex items-center text-sm text-gray-400 mb-1">
                    <FiUser className="w-4 h-4 mr-2" />
                    Skin Tone
                  </p>
                 <div className="flex items-center space-x-2">
                   <div 
                     className="w-4 h-4 rounded border border-gray-300 dark:border-gray-600"
                     style={{ backgroundColor: formatSkinTone(currentProfile.skinTone).color }}
                   ></div>
                   <p className="text-gray-900 dark:text-white font-medium">
                     {formatSkinTone(currentProfile.skinTone).label}
                     {formatSkinTone(currentProfile.skinTone).description && (
                       <span className="text-gray-500 dark:text-gray-400 ml-1">
                         ({formatSkinTone(currentProfile.skinTone).description})
                       </span>
                     )}
                   </p>
                 </div>
               </div>
               
               <div>
                                   <p className="flex items-center text-sm text-gray-400 mb-1">
                    <FiScissors className="w-4 h-4 mr-2" />
                    Hair Length
                  </p>
                   <p className="text-white font-medium">{formatAppearance(currentProfile.hairLength)}</p>
               </div>
               
               <div>
                                   <p className="flex items-center text-sm text-gray-400 mb-1">
                    <FiScissors className="w-4 h-4 mr-2" />
                    Hair Color
                  </p>
                 <div className="flex items-center space-x-2">
                   <div 
                     className={`w-4 h-4 rounded border ${
                       formatHairColor(currentProfile.hairColor).color === '#F7F7F7' ||
                       formatHairColor(currentProfile.hairColor).color === '#F5F5F5' ||
                       formatHairColor(currentProfile.hairColor).color === '#F5DEB3'
                         ? 'border-gray-400 dark:border-gray-500'
                         : 'border-gray-300 dark:border-gray-600'
                     }`}
                     style={{ backgroundColor: formatHairColor(currentProfile.hairColor).color }}
                   ></div>
                                        <p className="text-white font-medium">
                       {formatHairColor(currentProfile.hairColor).label}
                     </p>
                 </div>
               </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-4">
            Dashboard
          </h2>
          
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-xl font-medium text-white mb-2">
              Setup Complete!
            </h3>
            <p className="text-gray-400 mb-6">
              Your profile is now complete and you can start using the application.
            </p>
            
            <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-blue-300 text-sm">
                ✅ Authentication complete
              </p>
              <p className="text-blue-300 text-sm">
                ✅ Profile information collected
              </p>
              <p className="text-blue-300 text-sm">
                ✅ Ready for personalized suggestions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 