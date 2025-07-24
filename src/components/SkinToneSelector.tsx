'use client';

import { FiUser } from 'react-icons/fi';

interface SkinToneSelectorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  id: string;
}

export default function SkinToneSelector({ 
  label, 
  value, 
  onChange, 
  required = false, 
  id 
}: SkinToneSelectorProps) {
  const skinToneOptions = [
    {
      value: 'fitzpatrick-i',
      label: 'Type I',
      description: 'Very Fair',
      color: '#F7DBC7'
    },
    {
      value: 'fitzpatrick-ii',
      label: 'Type II',
      description: 'Fair',
      color: '#F0C697'
    },
    {
      value: 'fitzpatrick-iii',
      label: 'Type III',
      description: 'Medium',
      color: '#E8B887'
    },
    {
      value: 'fitzpatrick-iv',
      label: 'Type IV',
      description: 'Olive',
      color: '#D4A574'
    },
    {
      value: 'fitzpatrick-v',
      label: 'Type V',
      description: 'Brown',
      color: '#B8956A'
    },
    {
      value: 'fitzpatrick-vi',
      label: 'Type VI',
      description: 'Dark Brown',
      color: '#8B6914'
    }
  ];

  return (
    <div>
      <label htmlFor={id} className="flex items-center text-sm font-medium text-gray-200 mb-3">
        <FiUser className="w-5 h-5 text-gray-400" />
        <span className="ml-2">{label}</span>
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {skinToneOptions.map((option) => (
          <div key={option.value} className="flex flex-col items-center">
            <button
              type="button"
              onClick={() => onChange(option.value)}
              className={`w-16 h-16 rounded-lg border-2 transition-all duration-200 ${
                value === option.value
                  ? 'border-blue-500 ring-2 ring-blue-500/20 scale-105'
                  : 'border-gray-600 hover:border-gray-500'
              }`}
              style={{ backgroundColor: option.color }}
              title={`${option.label} - ${option.description}`}
            >
              {/* Checkmark when selected */}
              {value === option.value && (
                <div className="w-full h-full flex items-center justify-center">
                  <svg 
                    className="w-6 h-6 text-white drop-shadow-lg" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </div>
              )}
            </button>
            
            <div className="mt-2 text-center">
              <p className="text-xs font-medium text-gray-200">
                {option.label}
              </p>
              <p className="text-xs text-gray-400">
                {option.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Helper text */}
      <p className="text-xs text-gray-400 mt-3">
        Select the skin tone that best matches yours according to the Fitzpatrick scale
      </p>
    </div>
  );
} 