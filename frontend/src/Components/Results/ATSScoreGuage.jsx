// import React from "react";
// import GaugeChart from "react-gauge-chart";

// const AtsScoreGauge = ({ score }) => {
//   return (
//     <div className="ats-score-container">
//       <h3>ATS Score</h3>
//       <GaugeChart
//         id="ats-gauge-chart"
//         colors={["#FF0000", "#FFFF00", "#00FF00"]}
//         arcWidth={0.01}
//         percent={score / 100}
//         textColor="#000"
//         needleColor="#000000"
//       />
//       <h4>{score} / 100</h4>
//     </div>
//   );
// };

// export default AtsScoreGauge;

import React, { useEffect, useRef } from 'react';
import './styles/ATSScoreGuage.css';

const AtsScoreGauge = ({ score }) => {
  const circleRef = useRef(null);

  const getScoreClass = (score) => {
    if (score >= 80) return 'high';
    if (score >= 60) return 'medium';
    return 'low';
  };

  const getScoreMessage = (score) => {
    if (score >= 80) return 'Excellent! Your resume is well-optimized for ATS.';
    if (score >= 60) return 'Good start. With a few improvements, your resume will perform better.';
    return 'Your resume needs significant improvements to pass ATS systems.';
  };

  const scoreClass = getScoreClass(score);
  const scoreMessage = getScoreMessage(score);

  useEffect(() => {
    if (circleRef.current) {
      const circumference = 2 * Math.PI * 100;
      const offset = circumference - (score / 100) * circumference;

      circleRef.current.style.strokeDasharray = `${circumference}`;
      circleRef.current.style.strokeDashoffset = `${circumference}`;

      setTimeout(() => {
        if (circleRef.current) {
          circleRef.current.style.strokeDashoffset = `${offset}`;
        }
      }, 100);
    }
  }, [score]);

  return (
    <div className="ats-score-container">
      <h2 className="ats-score-title">ATS Compatibility Score</h2>

      <div className="ats-score-gauge">
        <svg width="220" height="220" viewBox="0 0 220 220">
          <circle cx="110" cy="110" r="100" className="ats-score-circle" />
          <circle
            cx="110"
            cy="110"
            r="100"
            className={`ats-score-indicator ats-score-indicator-${scoreClass}`}
            ref={circleRef}
          />
        </svg>
        <div className="ats-score-value">{score}</div>
        <div className="ats-score-label">out of 100</div>
      </div>

      <div className={`ats-score-tag ats-score-tag-${scoreClass}`}>
        {scoreClass === 'high'
          ? 'ATS-Friendly'
          : scoreClass === 'medium'
          ? 'Needs Improvement'
          : 'ATS Optimization Required'}
      </div>

      <p className="ats-score-description">{scoreMessage}</p>
    </div>
  );
};

export default AtsScoreGauge;
