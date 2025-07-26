'use client';

import { FiUser, FiEdit3, FiX } from 'react-icons/fi';
import { UserProfile } from '../lib/userHelpers';

interface ProfileSummaryProps {
  profile: UserProfile;
  onEdit: () => void;
  onClose: () => void;
}

export default function ProfileSummary({ profile, onEdit, onClose }: ProfileSummaryProps) {
  const formatMeasurements = (value: number | undefined) => {
    return value && value > 0 ? `${value} cm` : 'Not set';
  };

  const formatAge = (age: number | undefined) => {
    return age && age > 0 ? `${age} years` : 'Not set';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-lg border border-gray-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-700 flex justify-between items-center">
          <div className="flex items-center">
            <FiUser className="w-6 h-6 text-blue-400 mr-3" />
            <h2 className="text-2xl font-bold text-white">Profile Summary</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-2"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-400">Name</label>
                <p className="text-white">{profile.firstName} {profile.lastName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-400">Email</label>
                <p className="text-white">{profile.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-400">Gender</label>
                <p className="text-white">{profile.gender || 'Not set'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-400">Age</label>
                <p className="text-white">{formatAge(profile.age)}</p>
              </div>
            </div>
          </div>

          {/* Body Measurements */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Body Measurements</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-400">Height</label>
                <p className="text-white">{formatMeasurements(profile.height)}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-400">Weight</label>
                <p className="text-white">{formatMeasurements(profile.weight)}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-400">Bust</label>
                <p className="text-white">{formatMeasurements(profile.bust)}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-400">Waist</label>
                <p className="text-white">{formatMeasurements(profile.waist)}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-400">Hip</label>
                <p className="text-white">{formatMeasurements(profile.hip)}</p>
              </div>
            </div>
          </div>

          {/* Appearance */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Appearance</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-400">Skin Tone</label>
                <p className="text-white">{profile.skinTone || 'Not set'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-400">Hair Length</label>
                <p className="text-white">{profile.hairLength || 'Not set'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-400">Hair Color</label>
                <p className="text-white">{profile.hairColor || 'Not set'}</p>
              </div>
            </div>
          </div>

          {/* Style Preferences */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Style Preferences</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-400">Personal Style</label>
                <p className="text-white">{profile.personalStyle || 'Not set'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-400">Preferred Brands</label>
                <p className="text-white">{profile.brand || 'Not set'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-400">Style Notes</label>
                <p className="text-white">{profile.notes || 'No notes added'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-700 flex justify-end">
          <button
            onClick={onEdit}
            className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            <FiEdit3 className="w-4 h-4 mr-2" />
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
} 