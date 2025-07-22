// Google Apps Script Code for Fashion App
// Deploy this as a web app in Google Apps Script

function doPost(e) {
  try {
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet (replace with your actual spreadsheet ID)
    const spreadsheetId = '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms'; // Replace with your actual spreadsheet ID
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
  const spreadsheetId = '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms'; // Replace with your actual spreadsheet ID
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