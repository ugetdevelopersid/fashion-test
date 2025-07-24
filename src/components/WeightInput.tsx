'use client';

import { useState, useEffect } from 'react';
import { FiTarget } from 'react-icons/fi';

interface WeightInputProps {
  label: string;
  value: number | string;
  onChange: (value: number) => void;
  placeholder?: string;
  required?: boolean;
  id: string;
}

export default function WeightInput({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  required = false, 
  id 
}: WeightInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [unit, setUnit] = useState<'kg' | 'lbs'>('kg');

  // Convert kg to lbs
  const kgToLbs = (kg: number) => kg * 2.20462;
  
  // Convert lbs to kg
  const lbsToKg = (lbs: number) => lbs / 2.20462;

  // Update input value when external value changes
  useEffect(() => {
    if (value && typeof value === 'number') {
      if (unit === 'kg') {
        setInputValue(value.toString());
      } else {
        setInputValue(kgToLbs(value).toFixed(1));
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
      // Always store in kg
      const kgValue = unit === 'kg' ? numValue : lbsToKg(numValue);
      onChange(Math.round(kgValue * 10) / 10); // Round to 1 decimal place
    }
  };

  const handleUnitChange = (newUnit: 'kg' | 'lbs') => {
    if (unit === newUnit) return;
    
    setUnit(newUnit);
    
    if (inputValue !== '') {
      const numValue = parseFloat(inputValue);
      if (!isNaN(numValue)) {
        if (newUnit === 'lbs') {
          // Converting from kg to lbs for display
          const lbsValue = kgToLbs(numValue);
          setInputValue(lbsValue.toFixed(1));
        } else {
          // Converting from lbs to kg for display
          const kgValue = lbsToKg(numValue);
          setInputValue(kgValue.toFixed(1));
        }
      }
    }
  };

  return (
    <div>
      <label htmlFor={id} className="flex items-center text-sm font-medium text-gray-200 mb-2">
        <FiTarget className="w-5 h-5 text-gray-400" />
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
            onClick={() => handleUnitChange('kg')}
            className={`px-3 py-2 text-sm font-medium transition-colors ${
              unit === 'kg'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            kg
          </button>
          <button
            type="button"
            onClick={() => handleUnitChange('lbs')}
            className={`px-3 py-2 text-sm font-medium transition-colors border-l border-gray-600 ${
              unit === 'lbs'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            lbs
          </button>
        </div>
      </div>
    </div>
  );
} 