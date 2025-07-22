# Data Flow Guide - Fashion App

## 🔄 How Data Flows Through Your App

### 1. **Personal Info** (`/personal-info`)
- Saves: `firstName`, `lastName`, `email`
- Storage: **localStorage** only
- Database: ❌ Not saved yet

### 2. **Profile Details 1** (`/profile-details-1`)
- Saves: `gender`, `ageRange`, `height`, `measurements`
- Storage: **localStorage** (combines with Personal Info)
- Database: ❌ Not saved yet

### 3. **Profile Details 2** (`/profile-details-2`)
- Saves: `skinTone`, `hairLength`, `hairColor`
- Storage: **localStorage** (combines all previous data)
- Database: ✅ **SAVED TO FIREBASE** (complete profile)

### 4. **Filters** (`/filters`)
- Saves: `selectedOptions` (color groups, fabric types, etc.)
- Storage: **localStorage**
- Database: ✅ **SAVED TO FIREBASE**

## 🔍 How to Verify Data is Being Saved

### Method 1: Browser Console
1. Open Developer Tools (F12)
2. Go to Console tab
3. Fill out forms and watch for these messages:
   ```
   ✅ ProfileDetails1 data saved to localStorage: {...}
   ✅ Profile setup completed and saved to database: {...}
   ✅ Filter selections saved to database: {...}
   ```

### Method 2: Database Test Panel
1. Go to: http://localhost:3000/database-test
2. Click "Save Test Profile" to test database connection
3. Fill out real forms in your app
4. Click "Refresh Data" to see real user data

### Method 3: Firebase Console
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project "fashion-app-user-information"
3. Click "Firestore Database"
4. Look for collections:
   - `userProfiles` - Complete user profiles
   - `filterSelections` - User filter preferences

## 🚨 Common Issues & Solutions

### Issue: "Random values" in Database Test Panel
**Solution:** The test panel shows sample data. Real user data will appear when you complete the actual forms.

### Issue: Data not saving to database
**Check:**
1. Firebase Console → Firestore Database is enabled
2. Browser console for error messages
3. Network tab for failed requests

### Issue: localStorage data not combining
**Check:**
1. Browser console for localStorage logs
2. Application tab → Local Storage → your domain

## 📊 Expected Data Structure

### Complete User Profile (saved to Firebase):
```javascript
{
  firstName: "John",
  lastName: "Doe", 
  email: "john@example.com",
  gender: "Male",
  ageRange: "Young Adult (20-29)",
  height: "5'10\"",
  heightInches: 70,
  bust: "40",
  waist: "32", 
  hips: "38",
  skinTone: "Type III",
  hairLength: "Short (Bob)",
  hairColor: "Dark Brown",
  profileCompleted: true,
  createdAt: "2024-01-01T00:00:00.000Z"
}
```

### Filter Selections (saved to Firebase):
```javascript
{
  userId: "john@example.com",
  userName: "John Doe",
  selectedOptions: {
    'Colour Group': ['Neutrals', 'Earth tones'],
    'Fabric Type': ['Natural fibers'],
    'Fit': ['Regular / true to size']
  },
  createdAt: "2024-01-01T00:00:00.000Z"
}
```

## ✅ Testing Checklist

- [ ] Fill out Personal Info form
- [ ] Fill out Profile Details 1 form  
- [ ] Fill out Profile Details 2 form
- [ ] Check browser console for success messages
- [ ] Check Database Test Panel for real user data
- [ ] Check Firebase Console for saved data
- [ ] Test filter selections
- [ ] Verify all data appears in Firebase

## 🎯 Next Steps

1. **Complete the full form flow** in your app
2. **Check the Database Test Panel** for real user data
3. **Verify in Firebase Console** that data is being saved
4. **Test filter selections** to ensure they save properly

The key is to complete the entire profile setup flow (Personal Info → Profile Details 1 → Profile Details 2) to see real user data in your database! 