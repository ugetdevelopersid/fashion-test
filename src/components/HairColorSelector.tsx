'use client';

import { FiScissors } from 'react-icons/fi';

interface HairColorSelectorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  id: string;
}

export default function HairColorSelector({ 
  label, 
  value, 
  onChange, 
  required = false, 
  id 
}: HairColorSelectorProps) {
  const hairColorOptions = [
    {
      value: 'black',
      label: 'Black',
      color: '#1C1C1C'
    },
    {
      value: 'dark-brown',
      label: 'Dark Brown',
      color: '#3D2314'
    },
    {
      value: 'brown',
      label: 'Brown',
      color: '#5D4037'
    },
    {
      value: 'light-brown',
      label: 'Light Brown',
      color: '#8D6E63'
    },
    {
      value: 'dirty-blonde',
      label: 'Dirty Blonde',
      color: '#B8860B'
    },
    {
      value: 'blonde',
      label: 'Blonde',
      color: '#F5DEB3'
    },
    {
      value: 'platinum-blonde',
      label: 'Platinum',
      color: '#F7F7F7'
    },
    {
      value: 'red',
      label: 'Red',
      color: '#A0522D'
    },
    {
      value: 'auburn',
      label: 'Auburn',
      color: '#722F37'
    },
    {
      value: 'gray',
      label: 'Gray',
      color: '#808080'
    },
    {
      value: 'white',
      label: 'White',
      color: '#F5F5F5'
    },
    {
      value: 'other',
      label: 'Other',
      color: '#9C27B0'
    }
  ];

  return (
    <div>
      <label htmlFor={id} className="flex items-center text-sm font-medium text-gray-200 mb-3">
        <FiScissors className="w-5 h-5 text-gray-400" />
        <span className="ml-2">{label}</span>
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {hairColorOptions.map((option) => (
          <div key={option.value} className="flex flex-col items-center">
            <button
              type="button"
              onClick={() => onChange(option.value)}
              className={`w-16 h-16 rounded-lg border-2 transition-all duration-200 ${
                value === option.value
                  ? 'border-blue-500 ring-2 ring-blue-500/20 scale-105'
                  : 'border-gray-600 hover:border-gray-500'
              } ${option.value === 'platinum-blonde' || option.value === 'white' ? 'shadow-md' : ''}`}
              style={{ backgroundColor: option.color }}
              title={option.label}
            >
              {/* Special border for light colors */}
              {(option.value === 'platinum-blonde' || option.value === 'white') && (
                <div className="w-full h-full rounded-md border border-gray-400" />
              )}
              
              {/* Checkmark when selected */}
              {value === option.value && (
                <div className="w-full h-full flex items-center justify-center">
                  <svg 
                    className={`w-6 h-6 drop-shadow-lg ${
                      option.value === 'platinum-blonde' || option.value === 'white' || option.value === 'blonde'
                        ? 'text-gray-800' 
                        : 'text-white'
                    }`} 
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
            </div>
          </div>
        ))}
      </div>
      
      {/* Helper text */}
      <p className="text-xs text-gray-400 mt-3">
        Select the hair color that best matches yours
      </p>
    </div>
  );
} 