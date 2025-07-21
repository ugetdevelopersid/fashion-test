import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import PersonalInfo from './components/PersonalInfo';
import ProfileDetails1 from './components/ProfileDetails1';
import ProfileDetails2 from './components/ProfileDetails2';
import ProfileDetails3 from './components/ProfileDetails3';
import Dashboard from './components/Dashboard';
import Menu from './components/Menu';
import ClothingSelection from './components/ClothingSelection';
import Filters from './components/Filters';
import ClothingModal from './components/ClothingModal';
import OutfitGeneration from './components/OutfitGeneration';
import RegenerateModal from './components/RegenerateModal';
import OutfitFeedback from './components/OutfitFeedback';
import AvatarFeedback from './components/AvatarFeedback';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/personal-info" element={<PersonalInfo />} />
          <Route path="/profile-details-1" element={<ProfileDetails1 />} />
          <Route path="/profile-details-2" element={<ProfileDetails2 />} />
          <Route path="/profile-details-3" element={<ProfileDetails3 />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/clothing-selection" element={<ClothingSelection />} />
          <Route path="/filters" element={<Filters />} />
          <Route path="/clothing-modal" element={<ClothingModal />} />
          <Route path="/outfit-generation" element={<OutfitGeneration />} />
          <Route path="/regenerate-modal" element={<RegenerateModal />} />
          <Route path="/outfit-feedback" element={<OutfitFeedback />} />
          <Route path="/avatar-feedback" element={<AvatarFeedback />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 