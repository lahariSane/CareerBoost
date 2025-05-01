import React from "react";
import AtsScoreGauge from "../Components/Results/ATSScoreGuage";
import ScoreBreakdown from "../Components/Results/ScoreBreakdown";
import Suggestions from "../Components/Results/Suggestions";
import VisualInsights from "../Components/Results/VisualInsights";
import ResumeBuilderCTA from "../Components/Results/ResumeBuilderCTA";
import "../Components/Results/styles/ResumeResults.css";

const ResumeResultsPage = () => {
  const atsScore = 85; 
  const breakdownData = [
    { section: "Formatting", score: 15 },
    { section: "Skills Match", score: 12 },
    { section: "Keyword Usage", score: 14 },
    { section: "Education", score: 18 },
    { section: "Experience", score: 16 }
  ];
  const suggestions = [
    "Include a professional summary at the top",
    "Add more role-specific keywords from the job description",
    "Quantify achievements in your experience section",
    "Use consistent formatting for dates and titles"
  ];

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
        <VisualInsights />
        </div>
        <div className="results-section5">
        <ResumeBuilderCTA />
        </div>
    </div>
  );
};

export default ResumeResultsPage;
