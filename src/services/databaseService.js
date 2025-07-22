import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  serverTimestamp,
  doc,
  deleteDoc
} from 'firebase/firestore';
import { db } from './firebaseConfig';

class DatabaseService {
  // Save user profile data
  static async saveProfileData(profileData) {
    try {
      console.log('🔄 Attempting to save profile data to Firebase...', profileData);
      
      const docRef = await addDoc(collection(db, 'userProfiles'), {
        ...profileData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      console.log('✅ Profile data saved successfully to Firebase!');
      console.log('📄 Document ID:', docRef.id);
      console.log('📊 Data saved:', { ...profileData, createdAt: 'server timestamp' });
      
      return { success: true, id: docRef.id, message: 'Profile saved successfully' };
    } catch (error) {
      console.error('❌ Error saving profile data to Firebase:', error);
      console.error('🔍 Error details:', error.message);
      return { success: false, error: error.message };
    }
  }

  // Save filter selections
  static async saveFilterSelections(filterData) {
    try {
      console.log('🔄 Attempting to save filter selections to Firebase...', filterData);
      
      const docRef = await addDoc(collection(db, 'filterSelections'), {
        ...filterData,
        createdAt: serverTimestamp()
      });
      
      console.log('✅ Filter selections saved successfully to Firebase!');
      console.log('📄 Document ID:', docRef.id);
      console.log('📊 Data saved:', { ...filterData, createdAt: 'server timestamp' });
      
      return { success: true, id: docRef.id, message: 'Filter selections saved successfully' };
    } catch (error) {
      console.error('❌ Error saving filter selections to Firebase:', error);
      console.error('🔍 Error details:', error.message);
      return { success: false, error: error.message };
    }
  }

  // Save filter preset
  static async saveFilterPreset(presetData) {
    try {
      console.log('🔄 Attempting to save filter preset to Firebase...', presetData);
      
      const docRef = await addDoc(collection(db, 'filterPresets'), {
        ...presetData,
        createdAt: serverTimestamp()
      });
      
      console.log('✅ Filter preset saved successfully to Firebase!');
      console.log('📄 Document ID:', docRef.id);
      
      return { success: true, id: docRef.id, message: 'Filter preset saved successfully' };
    } catch (error) {
      console.error('❌ Error saving filter preset to Firebase:', error);
      console.error('🔍 Error details:', error.message);
      return { success: false, error: error.message };
    }
  }

  // Get filter presets for a user
  static async getFilterPresets(userId) {
    try {
      console.log('🔄 Fetching filter presets for user:', userId);
      
      const q = query(
        collection(db, 'filterPresets'), 
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const presets = [];
      querySnapshot.forEach((doc) => {
        presets.push({ id: doc.id, ...doc.data() });
      });
      
      console.log('✅ Retrieved filter presets:', presets.length, 'presets found');
      return { success: true, data: presets };
    } catch (error) {
      console.error('❌ Error getting filter presets:', error);
      return { success: false, error: error.message };
    }
  }

  // Delete a filter preset
  static async deleteFilterPreset(presetId) {
    try {
      console.log('🔄 Deleting filter preset with ID:', presetId);
      
      await deleteDoc(doc(db, 'filterPresets', presetId));
      
      console.log('✅ Filter preset deleted successfully');
      return { success: true, message: 'Filter preset deleted successfully' };
    } catch (error) {
      console.error('❌ Error deleting filter preset:', error);
      console.error('🔍 Error details:', error.message);
      return { success: false, error: error.message };
    }
  }

  // Save outfit feedback
  static async saveOutfitFeedback(feedbackData) {
    try {
      console.log('🔄 Attempting to save outfit feedback to Firebase...', feedbackData);
      
      const docRef = await addDoc(collection(db, 'outfitFeedback'), {
        ...feedbackData,
        createdAt: serverTimestamp()
      });
      
      console.log('✅ Outfit feedback saved successfully to Firebase!');
      console.log('📄 Document ID:', docRef.id);
      console.log('📊 Data saved:', { ...feedbackData, createdAt: 'server timestamp' });
      
      return { success: true, id: docRef.id, message: 'Feedback saved successfully' };
    } catch (error) {
      console.error('❌ Error saving outfit feedback to Firebase:', error);
      console.error('🔍 Error details:', error.message);
      return { success: false, error: error.message };
    }
  }

  // Save clothing selections
  static async saveClothingSelections(clothingData) {
    try {
      console.log('🔄 Attempting to save clothing selections to Firebase...', clothingData);
      
      const docRef = await addDoc(collection(db, 'clothingSelections'), {
        ...clothingData,
        createdAt: serverTimestamp()
      });
      
      console.log('✅ Clothing selections saved successfully to Firebase!');
      console.log('📄 Document ID:', docRef.id);
      console.log('📊 Data saved:', { ...clothingData, createdAt: 'server timestamp' });
      
      return { success: true, id: docRef.id, message: 'Clothing selections saved successfully' };
    } catch (error) {
      console.error('❌ Error saving clothing selections to Firebase:', error);
      console.error('🔍 Error details:', error.message);
      return { success: false, error: error.message };
    }
  }

  // Get all user profiles
  static async getAllProfiles() {
    try {
      console.log('🔄 Fetching all profiles from Firebase...');
      
      const querySnapshot = await getDocs(collection(db, 'userProfiles'));
      const profiles = [];
      querySnapshot.forEach((doc) => {
        profiles.push({ id: doc.id, ...doc.data() });
      });
      
      console.log('✅ Retrieved profiles from Firebase:', profiles.length, 'profiles found');
      return { success: true, data: profiles };
    } catch (error) {
      console.error('❌ Error getting profiles from Firebase:', error);
      return { success: false, error: error.message };
    }
  }

  // Get profiles by user ID (if you implement user authentication)
  static async getProfilesByUserId(userId) {
    try {
      const q = query(
        collection(db, 'userProfiles'), 
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const profiles = [];
      querySnapshot.forEach((doc) => {
        profiles.push({ id: doc.id, ...doc.data() });
      });
      return { success: true, data: profiles };
    } catch (error) {
      console.error('Error getting user profiles:', error);
      return { success: false, error: error.message };
    }
  }

  // Get all filter selections
  static async getAllFilterSelections() {
    try {
      const querySnapshot = await getDocs(collection(db, 'filterSelections'));
      const selections = [];
      querySnapshot.forEach((doc) => {
        selections.push({ id: doc.id, ...doc.data() });
      });
      return { success: true, data: selections };
    } catch (error) {
      console.error('Error getting filter selections:', error);
      return { success: false, error: error.message };
    }
  }

  // Get all outfit feedback
  static async getAllOutfitFeedback() {
    try {
      const querySnapshot = await getDocs(collection(db, 'outfitFeedback'));
      const feedback = [];
      querySnapshot.forEach((doc) => {
        feedback.push({ id: doc.id, ...doc.data() });
      });
      return { success: true, data: feedback };
    } catch (error) {
      console.error('Error getting outfit feedback:', error);
      return { success: false, error: error.message };
    }
  }
}

export default DatabaseService; 