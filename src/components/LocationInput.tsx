'use client';

import { useState, useEffect } from 'react';
import { FiMapPin, FiGlobe } from 'react-icons/fi';

interface LocationInputProps {
  city: string;
  country: string;
  onCityChange: (city: string) => void;
  onCountryChange: (country: string) => void;
  className?: string;
}

export default function LocationInput({ 
  city, 
  country, 
  onCityChange, 
  onCountryChange,
  className = ''
}: LocationInputProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      <div>
        <label htmlFor="city" className="flex items-center text-sm font-medium text-gray-200 mb-2">
          <FiMapPin className="w-5 h-5 text-gray-400" />
          <span className="ml-2">City</span>
        </label>
        <input
          type="text"
          id="city"
          value={city}
          onChange={(e) => onCityChange(e.target.value)}
          placeholder="Enter your city"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div>
        <label htmlFor="country" className="flex items-center text-sm font-medium text-gray-200 mb-2">
          <FiGlobe className="w-5 h-5 text-gray-400" />
          <span className="ml-2">Country</span>
        </label>
        <input
          type="text"
          id="country"
          value={country}
          onChange={(e) => onCountryChange(e.target.value)}
          placeholder="Enter your country"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        />
      </div>
    </div>
  );
} 