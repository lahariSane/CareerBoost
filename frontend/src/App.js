import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './Components/Layout/Navbar';
// import Footer from './Components/Layout/Footer';
import LandingPage from './Components/LandingPage/LandingPage';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
      

        {/* Main Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
          </Routes>
        </main>

       
      </div>
    </Router>
  );
}

export default App;
