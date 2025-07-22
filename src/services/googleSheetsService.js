// Google Apps Script web app URL
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx24v8aA7tSLaP1_hlpEQzYRGfOb5LP57tEKHZvDjIi-6qUe3BIgHieLsv5-8_4kp0b/exec';

class GoogleSheetsService {
  static async saveUserData(userData) {
    try {
      const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });

      const result = await response.json();
      
      if (result.success) {
        console.log('Data saved to Google Sheets successfully');
        return { success: true, message: result.message };
      } else {
        console.error('Failed to save data:', result.error);
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Error saving to Google Sheets:', error);
      return { success: false, error: error.message };
    }
  }

  static async saveProfileData(profileData) {
    // Structure the data properly for Google Sheets
    const userData = {
      profileData: {
        name: profileData.name || '',
        age: profileData.age || '',
        gender: profileData.gender || '',
        style: profileData.style || '',
        occasion: profileData.occasion || '',
        budget: profileData.budget || '',
        size: profileData.size || '',
        preferences: profileData.preferences || '',
        bodyType: profileData.bodyType || '',
        skinTone: profileData.skinTone || '',
        hairColor: profileData.hairColor || '',
        height: profileData.height || '',
        weight: profileData.weight || '',
        measurements: profileData.measurements || '',
        favoriteColors: profileData.favoriteColors || '',
        dislikedColors: profileData.dislikedColors || '',
        favoriteStyles: profileData.favoriteStyles || '',
        dislikedStyles: profileData.dislikedStyles || '',
        accessories: profileData.accessories || '',
        shoes: profileData.shoes || '',
        bags: profileData.bags || '',
        jewelry: profileData.jewelry || '',
        notes: profileData.notes || ''
      }
    };

    return this.saveUserData(userData);
  }

  static async saveFilterSelections(filterData) {
    const userData = {
      filterSelections: filterData
    };

    return this.saveUserData(userData);
  }
}

export default GoogleSheetsService; 