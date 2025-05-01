

import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import './styles/ResumeBuilderCTA.css';

const ResumeBuilderCTA = () => {
  return (
    <div className="resume-builder-cta">
      <div className="resume-builder-cta-content">
        <div className="resume-builder-cta-left">
          <h3 className="resume-builder-cta-title">Ready to optimize your resume?</h3>
          <p className="resume-builder-cta-description">
            Use our Resume Builder to create an ATS-optimized resume that gets past screening 
            systems and impresses hiring managers.
          </p>
          
          <div className="resume-builder-cta-features">
            <div className="resume-builder-cta-feature">
              <CheckCircle className="resume-builder-cta-feature-icon" size={16} />
              <span>ATS-friendly templates</span>
            </div>
            <div className="resume-builder-cta-feature">
              <CheckCircle className="resume-builder-cta-feature-icon" size={16} />
              <span>Keyword optimization</span>
            </div>
            <div className="resume-builder-cta-feature">
              <CheckCircle className="resume-builder-cta-feature-icon" size={16} />
              <span>Expert-approved designs</span>
            </div>
          </div>
        </div>
        
        <button className="resume-builder-cta-button">
          Build Your Resume <ArrowRight size={16} style={{ marginLeft: '2px', verticalAlign: 'text-bottom' }} />
        </button>
      </div>
    </div>
  );
};

export default ResumeBuilderCTA;

