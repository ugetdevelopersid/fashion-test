import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Welcome from './components/Welcome';
import PersonalInfo from './components/PersonalInfo';
import ProfileDetails1 from './components/ProfileDetails1';
import ProfileDetails2 from './components/ProfileDetails2';
import ProfileDetails3 from './components/ProfileDetails3';
import Dashboard from './components/Dashboard';
import Menu from './components/Menu';
import Filters from './components/Filters';
import OutfitGeneration from './components/OutfitGeneration';
import AvatarFeedback from './components/AvatarFeedback';
import OutfitFeedback from './components/OutfitFeedback';
import SideBackView from './components/SideBackView';
import DatabaseTest from './components/DatabaseTest';

// Page title mapping for each route - simplified to essential routes
const pageTitles = {
  '/': 'Welcome',
  '/personal-info': 'Personal Info',
  '/profile-details-1': 'Basic Info',
  '/profile-details-2': 'Appearance',
  '/profile-details-3': 'User Preferences',
  '/dashboard': 'Weather & Events',
  '/menu': 'Menu',
  '/filters': 'Personal Style & Brands',
  '/outfit-generation': 'Outfit Generation',
  '/avatar-feedback': 'Avatar Feedback',
  '/outfit-feedback': 'Outfit Feedback',
  '/side-back-view': 'Side and Back View',
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
          <Route path="/profile-details-3" element={<ProfileDetails3 />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/filters" element={<Filters />} />
          <Route path="/outfit-generation" element={<OutfitGeneration />} />
          <Route path="/avatar-feedback" element={<AvatarFeedback />} />
          <Route path="/outfit-feedback" element={<OutfitFeedback />} />
          <Route path="/side-back-view" element={<SideBackView />} />
          <Route path="/database-test" element={<DatabaseTest />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 