'use client';

import { useState, useEffect } from 'react';
import { FiThermometer, FiCloud } from 'react-icons/fi';

interface WeatherInputProps {
  temperature: string;
  condition: string;
  onTemperatureChange: (temperature: string) => void;
  onConditionChange: (condition: string) => void;
  className?: string;
}

export default function WeatherInput({ 
  temperature, 
  condition, 
  onTemperatureChange, 
  onConditionChange,
  className = ''
}: WeatherInputProps) {
  const temperatureOptions = [
    { value: 'warm', label: 'Warm' },
    { value: 'hot', label: 'Hot' },
    { value: 'cool', label: 'Cool' },
    { value: 'cold', label: 'Cold' },
    { value: 'pleasant', label: 'Pleasant' }
  ];

  const conditionOptions = [
    { value: 'clear', label: 'Clear' },
    { value: 'dry', label: 'Dry' },
    { value: 'windy', label: 'Windy' },
    { value: 'breezy', label: 'Breezy' },
    { value: 'rainy', label: 'Rainy' },
    { value: 'humid', label: 'Humid' }
  ];

  return (
    <div className={`space-y-4 ${className}`}>
      <div>
        <label htmlFor="temperature" className="flex items-center text-sm font-medium text-gray-200 mb-2">
          <FiThermometer className="w-5 h-5 text-gray-400" />
          <span className="ml-2">Temperature</span>
        </label>
        <select
          id="temperature"
          value={temperature}
          onChange={(e) => onTemperatureChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        >
          <option value="">Select temperature</option>
          {temperatureOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="condition" className="flex items-center text-sm font-medium text-gray-200 mb-2">
          <FiCloud className="w-5 h-5 text-gray-400" />
          <span className="ml-2">Weather Condition</span>
        </label>
        <select
          id="condition"
          value={condition}
          onChange={(e) => onConditionChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        >
          <option value="">Select condition</option>
          {conditionOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
} 