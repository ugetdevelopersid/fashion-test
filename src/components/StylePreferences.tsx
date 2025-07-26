'use client';

import { useState } from 'react';
import { FiTrendingUp, FiTag, FiEdit3 } from 'react-icons/fi';

interface StylePreferencesProps {
  personalStyle?: string;
  brand?: string;
  notes?: string;
  onSave?: (data: { personalStyle: string; brand: string; notes: string }) => void;
  onCancel?: () => void;
  isEditing?: boolean;
}

const PERSONAL_STYLE_OPTIONS = [
  'Minimal & Classic',
  'Casual & Comfortable',
  'Edgy & Urban',
  'Athletic & Sports-Inspired',
  'Boho & Vintage',
  'Elegant & Formal',
  'Creative & Eclectic',
  'Sustainable & Conscious',
  'Academia & Intellectual',
  'Subculture & Niche'
];

export default function StylePreferences({ 
  personalStyle = '', 
  brand = '', 
  notes = '', 
  onSave, 
  onCancel,
  isEditing = false 
}: StylePreferencesProps) {
  const [selectedStyles, setSelectedStyles] = useState<string[]>(
    personalStyle ? personalStyle.split(', ').filter(style => style.trim()) : []
  );
  const [brandInput, setBrandInput] = useState(brand);
  const [notesInput, setNotesInput] = useState(notes);
  const [error, setError] = useState('');

  const handleStyleToggle = (style: string) => {
    const newSelectedStyles = selectedStyles.includes(style) 
      ? selectedStyles.filter(s => s !== style)
      : [...selectedStyles, style];
    
    setSelectedStyles(newSelectedStyles);
    
    // Call onSave with updated data whenever selection changes
    if (onSave) {
      onSave({
        personalStyle: newSelectedStyles.join(', '),
        brand: brandInput.trim(),
        notes: notesInput.trim()
      });
    }
  };

  const handleSave = () => {
    if (selectedStyles.length === 0) {
      setError('Please select at least one personal style');
      return;
    }
    
    setError('');
    if (onSave) {
      onSave({
        personalStyle: selectedStyles.join(', '),
        brand: brandInput.trim(),
        notes: notesInput.trim()
      });
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  if (!isEditing) {
    // View mode - this won't be used in the current flow, but keeping for consistency
    return (
      <div className="space-y-4">
        <div>
          <label className="flex items-center text-sm font-medium text-gray-200 mb-2">
            <FiTrendingUp className="w-5 h-5 text-gray-400" />
            <span className="ml-2">Personal Style</span>
            <span className="text-red-400 ml-1">*</span>
          </label>
          <div className="space-y-2">
            {PERSONAL_STYLE_OPTIONS.map((style) => (
              <label key={style} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedStyles.includes(style)}
                  onChange={() => handleStyleToggle(style)}
                  className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span className="text-white">{style}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-200 mb-2">
            <FiTag className="w-5 h-5 text-gray-400" />
            <span className="ml-2">Preferred Brands</span>
          </label>
                  <input
          type="text"
          value={brandInput}
          onChange={(e) => {
            setBrandInput(e.target.value);
            if (onSave) {
              onSave({
                personalStyle: selectedStyles.join(', '),
                brand: e.target.value.trim(),
                notes: notesInput.trim()
              });
            }
          }}
          placeholder="e.g., Nike, Zara, H&M, etc."
          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
        />
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-200 mb-2">
            <FiEdit3 className="w-5 h-5 text-gray-400" />
            <span className="ml-2">Style Notes</span>
          </label>
          <textarea
            value={notesInput}
            onChange={(e) => {
              setNotesInput(e.target.value);
              if (onSave) {
                onSave({
                  personalStyle: selectedStyles.join(', '),
                  brand: brandInput.trim(),
                  notes: e.target.value.trim()
                });
              }
            }}
            placeholder="Add any additional notes about your style preferences, favorite colors, patterns, or specific items you love..."
            rows={4}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 resize-none"
          />
        </div>
      </div>
    );
  }

  // Edit mode
  return (
    <div className="space-y-4">
      <div>
        <label className="flex items-center text-sm font-medium text-gray-200 mb-2">
          <FiTrendingUp className="w-5 h-5 text-gray-400" />
          <span className="ml-2">Personal Style</span>
          <span className="text-red-400 ml-1">*</span>
        </label>
        <div className="space-y-2">
          {PERSONAL_STYLE_OPTIONS.map((style) => (
            <label key={style} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedStyles.includes(style)}
                onChange={() => handleStyleToggle(style)}
                className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
              />
              <span className="text-white">{style}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="flex items-center text-sm font-medium text-gray-200 mb-2">
          <FiTag className="w-5 h-5 text-gray-400" />
          <span className="ml-2">Preferred Brands</span>
        </label>
        <input
          type="text"
          value={brandInput}
          onChange={(e) => {
            setBrandInput(e.target.value);
            if (onSave) {
              onSave({
                personalStyle: selectedStyles.join(', '),
                brand: e.target.value.trim(),
                notes: notesInput.trim()
              });
            }
          }}
          placeholder="e.g., Nike, Zara, H&M, etc."
          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
        />
      </div>

      <div>
        <label className="flex items-center text-sm font-medium text-gray-200 mb-2">
          <FiEdit3 className="w-5 h-5 text-gray-400" />
          <span className="ml-2">Style Notes</span>
        </label>
        <textarea
          value={notesInput}
          onChange={(e) => {
            setNotesInput(e.target.value);
            if (onSave) {
              onSave({
                personalStyle: selectedStyles.join(', '),
                brand: brandInput.trim(),
                notes: e.target.value.trim()
              });
            }
          }}
          placeholder="Add any additional notes about your style preferences, favorite colors, patterns, or specific items you love..."
          rows={4}
          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 resize-none"
        />
      </div>
    </div>
  );
} 