'use client';

import { useState, useEffect } from 'react';
import { FiArrowUp, FiUser, FiTarget } from 'react-icons/fi';
import { TbRulerMeasure } from 'react-icons/tb';

interface MeasurementInputProps {
  label: string;
  value: number | string;
  onChange: (value: number) => void;
  placeholder?: string;
  required?: boolean;
  id: string;
  icon?: 'height' | 'bust' | 'waist' | 'hip';
}

export default function MeasurementInput({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  required = false, 
  id,
  icon
}: MeasurementInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [unit, setUnit] = useState<'in' | 'cm'>('cm');

  // Convert cm to inches
  const cmToInches = (cm: number) => cm / 2.54;
  
  // Convert inches to cm
  const inchesToCm = (inches: number) => inches * 2.54;

  // Update input value when external value changes
  useEffect(() => {
    if (value && typeof value === 'number') {
      if (unit === 'cm') {
        setInputValue(value.toString());
      } else {
        setInputValue(cmToInches(value).toFixed(1));
      }
    } else {
      setInputValue('');
    }
  }, [value, unit]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;
    setInputValue(inputVal);

    if (inputVal === '') {
      onChange(0);
      return;
    }

    const numValue = parseFloat(inputVal);
    if (!isNaN(numValue)) {
      // Always store in cm
      const cmValue = unit === 'cm' ? numValue : inchesToCm(numValue);
      onChange(Math.round(cmValue * 10) / 10); // Round to 1 decimal place
    }
  };

  const handleUnitChange = (newUnit: 'in' | 'cm') => {
    if (unit === newUnit) return;
    
    setUnit(newUnit);
    
    if (inputValue !== '') {
      const numValue = parseFloat(inputValue);
      if (!isNaN(numValue)) {
        if (newUnit === 'in') {
          // Converting from cm to inches for display
          const inchValue = cmToInches(numValue);
          setInputValue(inchValue.toFixed(1));
        } else {
          // Converting from inches to cm for display
          const cmValue = inchesToCm(numValue);
          setInputValue(cmValue.toFixed(1));
        }
      }
    }
  };

  // Get icon component based on measurement type
  const getIcon = () => {
    switch (icon) {
      case 'height':
        return <FiArrowUp className="w-5 h-5 text-gray-400" />;
      case 'bust':
        return <FiUser className="w-5 h-5 text-gray-400" />;
      case 'waist':
        return <FiTarget className="w-5 h-5 text-gray-400" />;
      case 'hip':
        return <TbRulerMeasure className="w-5 h-5 text-gray-400" />;
      default:
        return <TbRulerMeasure className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div>
      <label htmlFor={id} className="flex items-center text-sm font-medium text-gray-200 mb-2">
        {getIcon()}
        <span className="ml-2">{label}</span>
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <div className="flex space-x-2">
        <input
          type="number"
          id={id}
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          step="0.1"
          min="0"
          className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
          required={required}
        />
        <div className="flex border border-gray-600 rounded-lg overflow-hidden">
          <button
            type="button"
            onClick={() => handleUnitChange('cm')}
            className={`px-3 py-2 text-sm font-medium transition-colors ${
              unit === 'cm'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            cm
          </button>
          <button
            type="button"
            onClick={() => handleUnitChange('in')}
            className={`px-3 py-2 text-sm font-medium transition-colors border-l border-gray-600 ${
              unit === 'in'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            in
          </button>
        </div>
      </div>
    </div>
  );
} 