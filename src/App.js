import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Welcome from './components/Welcome';
import PersonalInfo from './components/PersonalInfo';
import ProfileDetails1 from './components/ProfileDetails1';
import ProfileDetails2 from './components/ProfileDetails2';
import Dashboard from './components/Dashboard';
import Menu from './components/Menu';
import ClothingSelection from './components/ClothingSelection';
import Filters from './components/Filters';
import ClothingModal from './components/ClothingModal';
import OutfitGeneration from './components/OutfitGeneration';
import RegenerateModal from './components/RegenerateModal';
import OutfitFeedback from './components/OutfitFeedback';
import AvatarFeedback from './components/AvatarFeedback';
import DatabaseTest from './components/DatabaseTest';

// Page title mapping for each route
const pageTitles = {
  '/': 'Welcome',
  '/personal-info': 'Personal Info',
  '/profile-details-1': 'Basic Info',
  '/profile-details-2': 'Appearance',
  '/dashboard': 'Home',
  '/menu': 'Menu',
  '/clothing-selection': 'Saved Outfits',
  '/filters': 'Style Preferences',
  '/clothing-modal': 'Add Clothing Item',
  '/outfit-generation': 'Outfit Preview',
  '/regenerate-modal': 'Regenerate Options',
  '/outfit-feedback': 'Outfit Feedback',
  '/avatar-feedback': 'Avatar Feedback',
  '/database-test': 'Database Test'
};

// Title updater component
function TitleUpdater() {
  const location = useLocation();
  
  useEffect(() => {
    const pageTitle = pageTitles[location.pathname] || 'Stylla';
    document.title = `Stylla | ${pageTitle}`;
  }, [location]);
  
  return null;
}

function App() {
  return (
    <Router>
      <div className="App">
        <TitleUpdater />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/personal-info" element={<PersonalInfo />} />
          <Route path="/profile-details-1" element={<ProfileDetails1 />} />
          <Route path="/profile-details-2" element={<ProfileDetails2 />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/clothing-selection" element={<ClothingSelection />} />
          <Route path="/filters" element={<Filters />} />
          <Route path="/clothing-modal" element={<ClothingModal />} />
          <Route path="/outfit-generation" element={<OutfitGeneration />} />
          <Route path="/regenerate-modal" element={<RegenerateModal />} />
          <Route path="/outfit-feedback" element={<OutfitFeedback />} />
          <Route path="/avatar-feedback" element={<AvatarFeedback />} />
          <Route path="/database-test" element={<DatabaseTest />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 