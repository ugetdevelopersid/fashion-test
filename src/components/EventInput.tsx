'use client';

import { useState } from 'react';
import { FiCalendar, FiHash } from 'react-icons/fi';

interface EventInputProps {
  eventCategory: string;
  eventSubcategory: string;
  noOfSuggestions: number;
  onEventCategoryChange: (category: string) => void;
  onEventSubcategoryChange: (subcategory: string) => void;
  onNoOfSuggestionsChange: (count: number) => void;
  className?: string;
}

export default function EventInput({ 
  eventCategory, 
  eventSubcategory, 
  noOfSuggestions,
  onEventCategoryChange, 
  onEventSubcategoryChange,
  onNoOfSuggestionsChange,
  className = ''
}: EventInputProps) {
  const eventCategories = [
    {
      value: 'formal-black-tie',
      label: 'Formal & Black-Tie',
      subcategories: [
        'Formal Wedding',
        'Black-Tie Gala / Charity Ball',
        'Opera / Theatre Premiere'
      ]
    },
    {
      value: 'semi-formal-dressy',
      label: 'Semi-Formal & Dressy',
      subcategories: [
        'Cocktail Party',
        'Engagement Party',
        'Bridal Shower',
        'Baby Shower',
        'Dinner Reception',
        'Art Gallery Opening / Museum Exhibit',
        'Office Holiday Party'
      ]
    },
    {
      value: 'business-professional',
      label: 'Business & Professional',
      subcategories: [
        'Legal & Compliance',
        'Healthcare & Wellness',
        'Creative & Media',
        'Education & Research',
        'Tech & Design',
        'Finance & Business'
      ]
    },
    {
      value: 'casual-social',
      label: 'Casual & Social',
      subcategories: [
        'Casual Weekend Brunch',
        'Garden Party / High Tea',
        'Summer BBQ / Pool Party',
        'Café Meet-up / Coffee Date',
        'Casual Dinner Date'
      ]
    },
    {
      value: 'active-leisure',
      label: 'Active & Leisure',
      subcategories: [
        'Beach Outing / Resort Day',
        'Music Festival / Concert',
        'Sporting Event (stadium / courtside)',
        'Yoga Retreat / Wellness Workshop',
        'Hiking / Nature Walk',
        'Airport Travel / Layover'
      ]
    }
  ];

  const selectedCategory = eventCategories.find(cat => cat.value === eventCategory);

  return (
    <div className={`space-y-4 ${className}`}>
      <div>
        <label htmlFor="eventCategory" className="flex items-center text-sm font-medium text-gray-200 mb-2">
          <FiCalendar className="w-5 h-5 text-gray-400" />
          <span className="ml-2">Event Category</span>
        </label>
        <select
          id="eventCategory"
          value={eventCategory}
          onChange={(e) => onEventCategoryChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        >
          <option value="">Select event category</option>
          {eventCategories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      {selectedCategory && (
        <div>
          <label htmlFor="eventSubcategory" className="flex items-center text-sm font-medium text-gray-200 mb-2">
            <FiCalendar className="w-5 h-5 text-gray-400" />
            <span className="ml-2">Event Subcategory (Optional)</span>
          </label>
          <select
            id="eventSubcategory"
            value={eventSubcategory}
            onChange={(e) => onEventSubcategoryChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            <option value="">Select subcategory (optional)</option>
            {selectedCategory.subcategories.map((subcategory) => (
              <option key={subcategory} value={subcategory}>
                {subcategory}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label htmlFor="noOfSuggestions" className="flex items-center text-sm font-medium text-gray-200 mb-2">
          <FiHash className="w-5 h-5 text-gray-400" />
          <span className="ml-2">Number of Suggestions</span>
        </label>
        <input
          type="number"
          id="noOfSuggestions"
          value={noOfSuggestions}
          onChange={(e) => onNoOfSuggestionsChange(parseInt(e.target.value) || 1)}
          min="1"
          max="6"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        />
        <p className="text-xs text-gray-400 mt-1">Choose between 1-6 suggestions</p>
      </div>
    </div>
  );
} 