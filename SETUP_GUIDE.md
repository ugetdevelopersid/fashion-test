# Fashion App Google Sheets Setup Guide

## Step 1: Create Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Fashion App Data"
4. Copy the spreadsheet ID from the URL (it's the long string between /d/ and /edit)

## Step 2: Set up Google Apps Script
1. Go to [Google Apps Script](https://script.google.com)
2. Click "New Project"
3. Name it "Fashion App Service"
4. Replace the default code with the following:

```javascript
// Google Apps Script Code for Fashion App
// Deploy this as a web app in Google Apps Script

function doPost(e) {
  try {
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet (replace with your actual spreadsheet ID)
    const spreadsheetId = 'YOUR_SPREADSHEET_ID_HERE'; // Replace this with your actual spreadsheet ID
    const sheet = SpreadsheetApp.openById(spreadsheetId).getActiveSheet();
    
    // Get current timestamp
    const timestamp = new Date();
    
    // Prepare the row data based on what's being saved
    let rowData = [];
    
    if (data.profileData) {
      // Profile data structure
      rowData = [
        timestamp,
        data.profileData.name || '',
        data.profileData.age || '',
        data.profileData.gender || '',
        data.profileData.style || '',
        data.profileData.occasion || '',
        data.profileData.budget || '',
        data.profileData.size || '',
        data.profileData.preferences || '',
        data.profileData.bodyType || '',
        data.profileData.skinTone || '',
        data.profileData.hairColor || '',
        data.profileData.height || '',
        data.profileData.weight || '',
        data.profileData.measurements || '',
        data.profileData.favoriteColors || '',
        data.profileData.dislikedColors || '',
        data.profileData.favoriteStyles || '',
        data.profileData.dislikedStyles || '',
        data.profileData.accessories || '',
        data.profileData.shoes || '',
        data.profileData.bags || '',
        data.profileData.jewelry || '',
        data.profileData.notes || ''
      ];
    } else if (data.filterSelections) {
      // Filter selections data
      rowData = [
        timestamp,
        'Filter Selections',
        JSON.stringify(data.filterSelections),
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        ''
      ];
    } else {
      // Generic data
      rowData = [
        timestamp,
        JSON.stringify(data),
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        ''
      ];
    }
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Data saved successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput('Fashion App Google Sheets Service is running')
    .setMimeType(ContentService.MimeType.TEXT);
}

// Helper function to set up the spreadsheet headers
function setupHeaders() {
  const spreadsheetId = 'YOUR_SPREADSHEET_ID_HERE'; // Replace with your actual spreadsheet ID
  const sheet = SpreadsheetApp.openById(spreadsheetId).getActiveSheet();
  
  const headers = [
    'Timestamp',
    'Name',
    'Age',
    'Gender',
    'Style',
    'Occasion',
    'Budget',
    'Size',
    'Preferences',
    'Body Type',
    'Skin Tone',
    'Hair Color',
    'Height',
    'Weight',
    'Measurements',
    'Favorite Colors',
    'Disliked Colors',
    'Favorite Styles',
    'Disliked Styles',
    'Accessories',
    'Shoes',
    'Bags',
    'Jewelry',
    'Notes'
  ];
  
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
}
```

## Step 3: Configure Google Apps Script
1. In the Google Apps Script editor, replace `YOUR_SPREADSHEET_ID_HERE` with your actual spreadsheet ID
2. Save the project (Ctrl+S or Cmd+S)

## Step 4: Deploy Google Apps Script
1. Click "Deploy" in the top right
2. Click "New deployment"
3. Choose "Web app" as the type
4. Set "Execute as" to "Me"
5. Set "Who has access" to "Anyone"
6. Click "Deploy"
7. Authorize the app when prompted
8. Copy the Web app URL (it will look like: https://script.google.com/macros/s/.../exec)

## Step 5: Set up Google Sheet Headers
1. In Google Apps Script, click on the function dropdown (top left)
2. Select "setupHeaders"
3. Click the "Run" button
4. This will add the column headers to your Google Sheet

## Step 6: Update React App
1. Open `src/services/googleSheetsService.js`
2. Replace the `GOOGLE_APPS_SCRIPT_URL` with your new deployment URL:

```javascript
const GOOGLE_APPS_SCRIPT_URL = 'YOUR_NEW_DEPLOYMENT_URL_HERE';
```

## Step 7: Test the Integration
1. Run your React app: `npm start`
2. Fill out the profile forms
3. Check your Google Sheet to see if data is being saved

## Troubleshooting
- If you get CORS errors, make sure your Google Apps Script is deployed as a web app
- If data isn't saving, check the browser console for error messages
- Make sure your spreadsheet ID is correct in the Google Apps Script code
- Ensure you've authorized the Google Apps Script to access your Google Sheets

## Security Note
The web app URL will be public, but it will only work for users who have access to your Google Sheet. Make sure your Google Sheet permissions are set appropriately. 