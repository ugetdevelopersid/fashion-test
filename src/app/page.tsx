'use client';

import { useState, useEffect } from 'react';
import { onAuthStateChange } from '../lib/auth';
import { needsOnboarding, getUserProfile, UserProfile } from '../lib/userHelpers';
import { User } from 'firebase/auth';
import AuthLogin from '../components/AuthLogin';
import UserOnboarding from '../components/UserOnboarding';
import MainApp from '../components/MainApp';

type AppState = 'loading' | 'login' | 'onboarding' | 'main';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [appState, setAppState] = useState<AppState>('loading');

  const checkUserState = async (user: User | null) => {
    if (!user) {
      setAppState('login');
      setUserProfile(null);
      return;
    }

    try {
      const needsProfileCompletion = await needsOnboarding(user);
      
      if (needsProfileCompletion) {
        setAppState('onboarding');
        setUserProfile(null);
      } else {
        const profile = await getUserProfile(user);
        setUserProfile(profile);
        setAppState('main');
      }
    } catch (error) {
      console.error('Error checking user state:', error);
      setAppState('onboarding'); // Default to onboarding on error
    }
  };

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChange(async (user) => {
      setUser(user);
      await checkUserState(user);
    });

    return () => unsubscribe();
  }, []);

  const handleAuthSuccess = async (user: User) => {
    setUser(user);
    await checkUserState(user);
  };

  const handleOnboardingComplete = async () => {
    if (user) {
      await checkUserState(user);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setUserProfile(null);
    setAppState('login');
  };

  if (appState === 'loading') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (appState === 'login') {
    return (
      <div className="min-h-screen bg-black">
        <div className="container mx-auto px-4 py-8">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              Suggest
            </h1>
            <p className="text-gray-400 mb-4">
              Your intelligent fashion companion
            </p>
          </header>

          <div className="max-w-md mx-auto">
            <AuthLogin onAuthSuccess={handleAuthSuccess} />
          </div>
        </div>
      </div>
    );
  }

  if (appState === 'onboarding') {
    return (
      <div className="min-h-screen bg-black">
        <div className="container mx-auto px-4 py-8">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome to Suggest
            </h1>
            <p className="text-gray-400 mb-4">
              Let's personalize your experience
            </p>
            
            {user && (
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 max-w-md mx-auto mb-6">
                <p className="text-green-400 text-sm">
                  ✅ Logged in as: <span className="font-medium">{user.email}</span>
                </p>
              </div>
            )}
          </header>

          <div className="max-w-md mx-auto">
            <UserOnboarding onComplete={handleOnboardingComplete} />
          </div>
        </div>
      </div>
    );
  }

  if (appState === 'main' && user && userProfile) {
    return <MainApp user={user} profile={userProfile} onLogout={handleLogout} />;
  }

  // Fallback - should not reach here
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Something went wrong</h1>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
}
