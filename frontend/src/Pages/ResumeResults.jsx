import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AtsScoreGauge from "../Components/Results/ATSScoreGuage";
import ScoreBreakdown from "../Components/Results/ScoreBreakdown";
import Suggestions from "../Components/Results/Suggestions";
import VisualInsights from "../Components/Results/VisualInsights";
import ResumeBuilderCTA from "../Components/Results/ResumeBuilderCTA";
import "../Components/Results/styles/ResumeResults.css";

const ResumeResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    atsScore = 0,
    breakdownData = [],
    suggestions = [],
    visualInsights = { keywordDensity: [], sectionBalance: [] },
  } = location.state || {};

  React.useEffect(() => {
    if (!location.state) {
      navigate("/Res-Upload");
    }
  }, [location.state, navigate]);

  return (
    <div className="resume-results-page">
      <div className="results-section1">
        <AtsScoreGauge score={atsScore} />
      </div>

      <div className="results-section2">
        <ScoreBreakdown breakdownData={breakdownData} />
      </div>

      <div className="results-section3">
        <Suggestions suggestions={suggestions} />
      </div>

      <div className="results-section4">
        <VisualInsights visualInsights={visualInsights} />
      </div>

      <div className="results-section5">
        <ResumeBuilderCTA />
      </div>
    </div>
  );
};

export default ResumeResultsPage;
