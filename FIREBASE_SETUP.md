# Firebase Setup Guide for Fashion App

## Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Name it "Fashion App" (or whatever you prefer)
4. Follow the setup wizard (you can disable Google Analytics if you don't need it)

## Step 2: Enable Firestore Database
1. In your Firebase project, click "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location close to you
5. Click "Done"

## Step 3: Get Firebase Config
1. In Firebase Console, click the gear icon (⚙️) next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click the web icon (</>)
5. Register your app with a nickname (e.g., "Fashion App Web")
6. Copy the firebaseConfig object

## Step 4: Update Your React App
1. Open `src/services/firebaseConfig.js`
2. Replace the placeholder config with your actual Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-actual-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-actual-sender-id",
  appId: "your-actual-app-id"
};
```

## Step 5: Test the Integration
1. Run your React app: `npm start`
2. Fill out the profile forms
3. Check your Firebase Console → Firestore Database to see the data

## Benefits of Firebase over Google Sheets:
- ✅ **Real-time updates** - Data appears instantly
- ✅ **Better performance** - No API limits or delays
- ✅ **Automatic timestamps** - Server-side timestamps
- ✅ **Query capabilities** - Easy to search and filter data
- ✅ **Scalable** - Handles large amounts of data
- ✅ **Free tier** - Generous free limits
- ✅ **No CORS issues** - Built for web apps
- ✅ **Better error handling** - More reliable

## Database Collections Created:
- `userProfiles` - User profile information
- `filterSelections` - User filter preferences
- `outfitFeedback` - User feedback on outfits
- `clothingSelections` - User clothing choices

## Security Rules (Optional)
In Firebase Console → Firestore Database → Rules, you can set up security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; // For development only
    }
  }
}
```

**Note:** The current setup allows anyone to read/write data. For production, you should implement proper authentication and security rules.

## Troubleshooting:
- If you get CORS errors, make sure you're using the correct Firebase config
- If data isn't saving, check the browser console for error messages
- Make sure your Firebase project has Firestore enabled
- Verify your Firebase config values are correct

That's it! Your fashion app will now save data to a proper database instead of Google Sheets. 🎉 