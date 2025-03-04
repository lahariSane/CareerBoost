import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import LoginPage from './Pages/LoginPage';
import ResumeUpload from './Pages/ResumeUpload';
import ResumeResults from "./Pages/ResumeResults";
import ResetPassword from './Components/Auth/ResetPassword';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} /> 
        <Route path='/reset-password/:token' element={<LoginPage />} />
        <Route path="/Res-Upload" element={<ResumeUpload />} />
        <Route path="/resume-results" element={<ResumeResults />} />
      </Routes>
    </Router>
  );
}

export default App;
