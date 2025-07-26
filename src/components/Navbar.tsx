'use client';

import { useState } from 'react';
import { FiUser, FiLogOut, FiMenu, FiX, FiHome } from 'react-icons/fi';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';

interface NavbarProps {
  onProfile: () => void;
  onHome?: () => void;
}

export default function Navbar({ onProfile, onHome }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // The auth state change will be handled by the auth listener
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-white">Suggest</h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {onHome && (
              <button
                onClick={onHome}
                className="flex items-center px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
              >
                <FiHome className="w-4 h-4 mr-2" />
                Home
              </button>
            )}
            <button
              onClick={onProfile}
              className="flex items-center px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
            >
              <FiUser className="w-4 h-4 mr-2" />
              Profile
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
            >
              <FiLogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white p-2"
            >
              {isMenuOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-700">
              {onHome && (
                <button
                  onClick={() => {
                    onHome();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center w-full px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <FiHome className="w-4 h-4 mr-2" />
                  Home
                </button>
              )}
              <button
                onClick={() => {
                  onProfile();
                  setIsMenuOpen(false);
                }}
                className="flex items-center w-full px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
              >
                <FiUser className="w-4 h-4 mr-2" />
                Profile
              </button>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="flex items-center w-full px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
              >
                <FiLogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 