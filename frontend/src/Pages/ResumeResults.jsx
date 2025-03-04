import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Components/LandingPage/styles/ResumeResults.css";

const ResumeResults = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extracting score & suggestions from state
  const { score, suggestions } = location.state || { score: 0, suggestions: [] };

  return (
    <div className="resume-results-container">
      <h1>Resume Analysis Results</h1>

      {/* Score Section */}
      <div className="score-section">
        <h2>ATS Score: {score}%</h2>
        <p>Your resume scored {score}% based on the ATS analysis.</p>
      </div>

      {/* Suggestions Section */}
      <div className="suggestions-section">
        <h2>Suggestions to Improve Your Resume</h2>
        <ul>
          {suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => <li key={index}>{suggestion}</li>)
          ) : (
            <p>No major improvements needed. Your resume is well-optimized! ✅</p>
          )}
        </ul>
      </div>

      {/* Back Button */}
      <button className="back-btn" onClick={() => navigate("/")}>
        Go Back to Home
      </button>
    </div>
  );
};

export default ResumeResults;
