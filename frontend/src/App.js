import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './Components/Layout/Navbar';
// import Footer from './Components/Layout/Footer';
import LandingPage from './Components/LandingPage/LandingPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes without the layout */}
    
        {/* Routes with the layout */}
        <Route
          path="/*"
          element={
            <div className="flex flex-col min-h-screen">
              {/* Navbar */}
//               <Navbar />


              {/* Main Content */}
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  {/* Add other layout-based routes here */}
                </Routes>
              </main>

              {/* Footer */}
//               <Footer />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
