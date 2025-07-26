import { getUserByEmail } from './firestore';
import { User } from 'firebase/auth';

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  height?: number; // in cm
  weight?: number; // in kg
  bust?: number; // in cm
  waist?: number; // in cm
  hip?: number; // in cm
  skinTone?: string;
  hairLength?: string;
  hairColor?: string;
  personalStyle?: string;
  brand?: string;
  notes?: string;
  weatherTemperature?: string; // warm, hot, cool, cold, pleasant
  weatherCondition?: string; // clear, dry, windy, breezy, rainy, humid
  locationCity?: string;
  locationCountry?: string;
  createdAt?: any;
  updatedAt?: any;
}

// Check if user profile is complete (has all required fields)
export const isProfileComplete = (profile: any): boolean => {
  return profile && 
         profile.gender && 
         profile.gender.trim() !== '' && 
         profile.age && 
         typeof profile.age === 'number' && 
         profile.age > 0 &&
         profile.height &&
         typeof profile.height === 'number' &&
         profile.height > 0 &&
         profile.weight &&
         typeof profile.weight === 'number' &&
         profile.weight > 0 &&
         profile.bust &&
         typeof profile.bust === 'number' &&
         profile.bust > 0 &&
         profile.waist &&
         typeof profile.waist === 'number' &&
         profile.waist > 0 &&
         profile.hip &&
         typeof profile.hip === 'number' &&
         profile.hip > 0 &&
         profile.skinTone &&
         profile.skinTone.trim() !== '' &&
         profile.hairLength &&
         profile.hairLength.trim() !== '' &&
         profile.hairColor &&
         profile.hairColor.trim() !== '' &&
         profile.personalStyle &&
         profile.personalStyle.trim() !== '';
};

// Get user profile from Firestore
export const getUserProfile = async (user: User): Promise<UserProfile | null> => {
  if (!user.email) return null;
  
  try {
    const profile = await getUserByEmail(user.email);
    return profile as UserProfile;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

// Check if user needs onboarding (missing gender or age)
export const needsOnboarding = async (user: User): Promise<boolean> => {
  const profile = await getUserProfile(user);
  return !isProfileComplete(profile);
}; 