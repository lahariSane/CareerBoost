

import React, { useEffect, useRef } from 'react';
import './styles/ScoreBreakdown.css';

const ScoreBreakdown = ({ breakdownData }) => {
  const progressRefs = useRef([]);

  const totalScore = breakdownData.reduce((sum, item) => sum + item.score, 0);
  const totalPossible = breakdownData.length * 20;

  useEffect(() => {
    progressRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.style.width = '0%';
        setTimeout(() => {
          if (ref) {
            const item = breakdownData[index];
            const percentage = (item.score / 20) * 100;
            ref.style.width = `${percentage}%`;
          }
        }, 100 + index * 100);
      }
    });
  }, [breakdownData]);

  return (
    <div className="results-card score-breakdown-container">
      <div className="score-breakdown-header">
        <h3 className="score-breakdown-title">Score Breakdown</h3>
        <p className="score-breakdown-subtitle">How each section of your resume performs</p>
      </div>

      <div className="score-breakdown-items">
        {breakdownData.map((item, index) => (
          <div className="score-breakdown-item" key={item.section}>
            <div className="score-breakdown-item-header">
              <span className="score-breakdown-item-title">{item.section}</span>
              <span className="score-breakdown-item-score">{item.score}/20</span>
            </div>
            <div className="score-breakdown-progress">
              <div
                className="score-breakdown-progress-bar"
                ref={el => progressRefs.current[index] = el}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="score-breakdown-total">
        <span className="score-breakdown-total-title">Total Score</span>
        <span className="score-breakdown-total-score">{totalScore}/{totalPossible}</span>
      </div>
    </div>
  );
};

export default ScoreBreakdown;

