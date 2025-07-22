import React, { useState, useEffect } from 'react';
import DatabaseService from '../services/databaseService';

function DatabaseTest() {
  const [profiles, setProfiles] = useState([]);
  const [filterSelections, setFilterSelections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showTestData, setShowTestData] = useState(false);
  const [testData, setTestData] = useState({
    name: 'Test User',
    age: '25',
    gender: 'Female',
    style: 'Casual'
  });

  const loadAllData = async () => {
    setLoading(true);
    try {
      // Load profiles
      const profilesResult = await DatabaseService.getAllProfiles();
      if (profilesResult.success) {
        if (showTestData) {
          setProfiles(profilesResult.data);
          console.log('📊 Found', profilesResult.data.length, 'total profiles (including test data)');
        } else {
          // Filter out test entries to show only real user data
          const realProfiles = profilesResult.data.filter(profile => !profile.testEntry);
          setProfiles(realProfiles);
          console.log('📊 Found', realProfiles.length, 'real user profiles');
        }
      }

      // Load filter selections
      const filtersResult = await DatabaseService.getAllFilterSelections();
      if (filtersResult.success) {
        if (showTestData) {
          setFilterSelections(filtersResult.data);
          console.log('📊 Found', filtersResult.data.length, 'total filter selections (including test data)');
        } else {
          // Filter out test entries
          const realFilters = filtersResult.data.filter(filter => !filter.testEntry);
          setFilterSelections(realFilters);
          console.log('📊 Found', realFilters.length, 'real filter selections');
        }
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const testSaveProfile = async () => {
    try {
      const result = await DatabaseService.saveProfileData({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        gender: 'Male',
        ageRange: 'Young Adult (20-29)',
        height: "5'10\"",
        heightInches: 70,
        bust: '40',
        waist: '32',
        hips: '38',
        skinTone: 'Type III',
        hairLength: 'Short (Bob)',
        hairColor: 'Dark Brown',
        profileCompleted: true,
        testEntry: true,
        timestamp: new Date().toISOString()
      });
      
      if (result.success) {
        alert('✅ Test profile saved successfully!');
        loadAllData(); // Reload data
      } else {
        alert('❌ Failed to save test profile: ' + result.error);
      }
    } catch (error) {
      alert('❌ Error saving test profile: ' + error.message);
    }
  };

  const testSaveFilters = async () => {
    try {
      const result = await DatabaseService.saveFilterSelections({
        userId: 'test-user',
        userName: 'Test User',
        selectedOptions: {
          'Colour Group': ['Neutrals', 'Earth tones'],
          'Fabric Type': ['Natural fibers'],
          'Fit': ['Regular / true to size']
        },
        testEntry: true,
        timestamp: new Date().toISOString()
      });
      
      if (result.success) {
        alert('✅ Test filter selections saved successfully!');
        loadAllData(); // Reload data
      } else {
        alert('❌ Failed to save test filters: ' + result.error);
      }
    } catch (error) {
      alert('❌ Error saving test filters: ' + error.message);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>🔍 Database Test Panel</h1>
      
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
        <h3>🧪 Test Functions</h3>
        <button 
          onClick={testSaveProfile}
          style={{ 
            margin: '5px', 
            padding: '10px 15px', 
            backgroundColor: '#4CAF50', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Save Test Profile
        </button>
        <button 
          onClick={testSaveFilters}
          style={{ 
            margin: '5px', 
            padding: '10px 15px', 
            backgroundColor: '#2196F3', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Save Test Filters
        </button>
        <button 
          onClick={loadAllData}
          style={{ 
            margin: '5px', 
            padding: '10px 15px', 
            backgroundColor: '#FF9800', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          🔄 Refresh Data
        </button>
        <button 
          onClick={() => {
            if (window.confirm('Clear all test data from database?')) {
              // This would require a delete function in DatabaseService
              alert('Delete function not implemented yet. Use Firebase Console to manually delete test entries.');
            }
          }}
          style={{ 
            margin: '5px', 
            padding: '10px 15px', 
            backgroundColor: '#f44336', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          🗑️ Clear Test Data
        </button>
        <button 
          onClick={() => {
            setShowTestData(!showTestData);
            setTimeout(() => loadAllData(), 100);
          }}
          style={{ 
            margin: '5px', 
            padding: '10px 15px', 
            backgroundColor: showTestData ? '#9c27b0' : '#607d8b', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {showTestData ? '👤 Show Real Data Only' : '🧪 Show All Data (Including Test)'}
        </button>
      </div>

      {loading && <div style={{ textAlign: 'center', padding: '20px' }}>Loading...</div>}

      <div style={{ display: 'flex', gap: '20px' }}>
        {/* Profiles Section */}
        <div style={{ flex: 1, backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '8px' }}>
          <h3>👤 User Profiles ({profiles.length})</h3>
          {profiles.length === 0 ? (
            <p style={{ color: '#666', fontStyle: 'italic' }}>No profiles found</p>
          ) : (
            profiles.map((profile, index) => (
                             <div key={profile.id || index} style={{ 
                 margin: '10px 0', 
                 padding: '10px', 
                 backgroundColor: 'white', 
                 borderRadius: '4px',
                 border: '1px solid #ddd'
               }}>
                 <strong>ID:</strong> {profile.id}<br />
                 <strong>Name:</strong> {profile.firstName} {profile.lastName}<br />
                 <strong>Email:</strong> {profile.email || 'N/A'}<br />
                 <strong>Gender:</strong> {profile.gender || 'N/A'}<br />
                 <strong>Age Range:</strong> {profile.ageRange || 'N/A'}<br />
                 <strong>Height:</strong> {profile.height || 'N/A'}<br />
                 <strong>Skin Tone:</strong> {profile.skinTone || 'N/A'}<br />
                 <strong>Hair:</strong> {profile.hairLength} - {profile.hairColor}<br />
                 {profile.testEntry && <span style={{ color: 'orange' }}>🧪 Test Entry</span>}
                 {!profile.testEntry && <span style={{ color: 'green' }}>✅ Real User</span>}
               </div>
            ))
          )}
        </div>

        {/* Filter Selections Section */}
        <div style={{ flex: 1, backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '8px' }}>
          <h3>🎛️ Filter Selections ({filterSelections.length})</h3>
          {filterSelections.length === 0 ? (
            <p style={{ color: '#666', fontStyle: 'italic' }}>No filter selections found</p>
          ) : (
            filterSelections.map((filter, index) => (
              <div key={filter.id || index} style={{ 
                margin: '10px 0', 
                padding: '10px', 
                backgroundColor: 'white', 
                borderRadius: '4px',
                border: '1px solid #ddd'
              }}>
                <strong>ID:</strong> {filter.id}<br />
                <strong>User:</strong> {filter.userName || 'N/A'}<br />
                <strong>Options:</strong> {Object.keys(filter.selectedOptions || {}).length} categories<br />
                {filter.testEntry && <span style={{ color: 'orange' }}>🧪 Test Entry</span>}
              </div>
            ))
          )}
        </div>
      </div>

      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e8f5e8', borderRadius: '8px' }}>
        <h3>📋 How to Check Data Storage:</h3>
        <ol>
          <li><strong>Browser Console:</strong> Open Developer Tools (F12) and check the console for Firebase logs</li>
          <li><strong>Firebase Console:</strong> Go to <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer">Firebase Console</a> → Your Project → Firestore Database</li>
          <li><strong>Test Panel:</strong> Use the buttons above to test data saving</li>
          <li><strong>Real App:</strong> Fill out the profile forms in your main app</li>
        </ol>
      </div>
    </div>
  );
}

export default DatabaseTest; 