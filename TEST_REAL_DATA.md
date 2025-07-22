# How to Test Real User Data

## 🎯 **Goal:** See real user data instead of test data

## 📋 **Step-by-Step Testing:**

### Step 1: Clear Browser Data (Optional)
1. Open Developer Tools (F12)
2. Go to Application tab
3. Click "Clear storage" → "Clear site data"
4. This ensures a fresh start

### Step 2: Complete the Full Form Flow
1. **Go to:** http://localhost:3000
2. **Fill out Personal Info:**
   - First Name: "John"
   - Last Name: "Smith"
   - Email: "john.smith@example.com"
   - Click "Next"

3. **Fill out Profile Details 1:**
   - Gender: "Male"
   - Age Range: "Young Adult (20-29)"
   - Height: 5'10"
   - Measurements: 40, 32, 38
   - Click "Next"

4. **Fill out Profile Details 2:**
   - Skin Tone: "Type III"
   - Hair Length: "Short (Bob)"
   - Hair Color: "Dark Brown"
   - Click "Finish"

### Step 3: Check Database Test Panel
1. **Go to:** http://localhost:3000/database-test
2. **Click "Refresh Data"**
3. **You should see:**
   - Real user profile with complete data
   - No "🧪 Test Entry" labels
   - Proper name, email, measurements

### Step 4: Test Filter Selections
1. **Go back to:** http://localhost:3000
2. **Navigate to Filters** (from menu or dashboard)
3. **Select some filters:**
   - Color Group: "Neutrals"
   - Fabric Type: "Natural fibers"
   - Click "Apply"
4. **Check Database Test Panel again**
5. **You should see filter selections saved**

## 🔍 **What You Should See:**

### In Browser Console:
```
✅ ProfileDetails1 data saved to localStorage: {...}
✅ Profile setup completed and saved to database: {...}
✅ Filter selections saved to database: {...}
```

### In Database Test Panel:
- **Real user profile** with complete information
- **No test entries** (unless you toggle to show them)
- **Proper data structure** with all fields filled

### In Firebase Console:
- **userProfiles collection** with your complete profile
- **filterSelections collection** with your filter choices

## 🚨 **If You Still See Test Data:**

1. **Check if you completed the full flow** - All 3 forms must be completed
2. **Look for success messages** in browser console
3. **Click "Show Real Data Only"** button in Database Test Panel
4. **Check Firebase Console** directly

## 📊 **Expected Real Data Structure:**

```javascript
{
  firstName: "John",
  lastName: "Smith", 
  email: "john.smith@example.com",
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
  profileCompleted: true
}
```

## ✅ **Success Indicators:**

- ✅ Browser console shows success messages
- ✅ Database Test Panel shows real user data
- ✅ No "🧪 Test Entry" labels on real data
- ✅ Firebase Console shows complete profiles
- ✅ All form fields are properly filled

**Try completing the full form flow now and let me know what you see!** 