
// import React from "react";
// import "./styles/Suggestions.css";

// const Suggestions = ({ suggestions }) => {
//   return (
//     <div className="suggestions-section">
//       <h3>Insights & Suggestions</h3>
//       <ul className="suggestions-list">
//         {suggestions.map((tip, index) => (
//           <li key={index}>💡 {tip}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Suggestions;

import React from 'react';
import { CheckCircle } from 'lucide-react';
import './styles/Suggestions.css';

const Suggestions = ({ suggestions }) => {
  return (
    <div className="results-card suggestions-container">
      <div className="suggestions-header">
        <h3 className="suggestions-title">Improvement Suggestions</h3>
        <p className="suggestions-subtitle">Apply these changes to increase your ATS score</p>
      </div>

      <ul className="suggestions-list">
        {suggestions.map((suggestion, index) => (
          <li className="suggestion-item" key={index}>
            <CheckCircle className="suggestion-icon" size={18} />
            <p className="suggestion-text">{suggestion}</p>
          </li>
        ))}
      </ul>

      <div className="suggestions-footer">
        <button className="results-button suggestions-action-btn">
          Apply to Resume
        </button>
        <span className="suggestions-info">Updated 2 minutes ago</span>
      </div>
    </div>
  );
};

export default Suggestions;
