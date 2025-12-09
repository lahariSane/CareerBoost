import React, { useState } from "react";
import { BarChart, PieChart } from "lucide-react";
import "./styles/VisualInsights.css";

const VisualInsights = ({ visualInsights }) => {
  const [activeView, setActiveView] = useState("keywords");

  const {
    keywordDensity = [], // [{ keyword: "react", count: 10 }, ...]
    sectionBalance = [], // [{ section: "Summary", percentage: 10 }, ...]
  } = visualInsights || {};

  // Derive weight (high/medium/low) from count
  const getWeightFromCount = (count, maxCount) => {
    if (!maxCount || maxCount <= 0) return "low";
    const ratio = count / maxCount;
    if (ratio >= 0.66) return "high";
    if (ratio >= 0.33) return "medium";
    return "low";
  };

  const maxKeywordCount =
    keywordDensity.length > 0
      ? Math.max(...keywordDensity.map((k) => k.count || 0))
      : 0;

  // Simple generic missing keyword suggestions (static for now)
  const missingKeywords = [
    "Problem Solving",
    "Team Collaboration",
    "Ownership",
    "System Design",
    "Communication Skills",
  ];

  return (
    <div className="results-card visual-insights-container">
      <div className="visual-insights-header">
        <h3 className="visual-insights-title">Visual Insights</h3>
        <p className="visual-insights-subtitle">
          Visualized analysis of your resume content
        </p>
      </div>

      <div className="insights-toggle">
        <button
          className={`insights-toggle-btn ${
            activeView === "keywords" ? "active" : ""
          }`}
          onClick={() => setActiveView("keywords")}
        >
          <BarChart
            size={14}
            style={{ marginRight: "4px", verticalAlign: "text-bottom" }}
          />
          Keywords
        </button>
        <button
          className={`insights-toggle-btn ${
            activeView === "sections" ? "active" : ""
          }`}
          onClick={() => setActiveView("sections")}
        >
          <PieChart
            size={14}
            style={{ marginRight: "4px", verticalAlign: "text-bottom" }}
          />
          Sections
        </button>
      </div>

      <div className="visual-insights-content">
        {activeView === "keywords" && (
          <>
            <div>
              <h4 className="insights-chart-title">Keyword Density</h4>
              <p className="suggestions-subtitle">
                Key terms detected in your resume
              </p>
              <div className="keyword-density">
                {keywordDensity.length === 0 && (
                  <p className="empty-state">
                    No keyword data available. Try another test case.
                  </p>
                )}

                {keywordDensity.map((item, index) => {
                  const weight = getWeightFromCount(
                    item.count || 0,
                    maxKeywordCount
                  );
                  return (
                    <span
                      key={index}
                      className="keyword-tag"
                      data-weight={weight}
                    >
                      {item.keyword} ({item.count})
                    </span>
                  );
                })}
              </div>
            </div>

            <div>
              <h4 className="insights-chart-title">Missing Keywords</h4>
              <p className="suggestions-subtitle">
                Recommended terms to include in your resume
              </p>
              <div className="keyword-density">
                {missingKeywords.map((kw, idx) => (
                  <span key={idx} className="keyword-tag" data-weight="low">
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}

        {activeView === "sections" && (
          <div className="insights-chart-container">
            <h4 className="insights-chart-title">Section Balance</h4>
            <p className="suggestions-subtitle">
              Word count distribution across resume sections
            </p>

            {sectionBalance.length === 0 ? (
              <p className="empty-state">
                No section balance data available. Try another test case.
              </p>
            ) : (
              <div
                style={{
                  display: "flex",
                  height: "200px",
                  alignItems: "flex-end",
                  gap: "20px",
                  padding: "20px 0",
                }}
              >
                {sectionBalance.map((sec, idx) => {
                  const safePercentage =
                    typeof sec.percentage === "number"
                      ? Math.max(5, sec.percentage)
                      : 500; 

                  return (
                    <div
                      key={idx}
                      style={{
                        width: "80px",
                        height: `${safePercentage}%`,
                        background: "var(--primary-500)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "white",
                        fontSize: "0.8rem",
                        borderRadius: "8px",
                        textAlign: "center",
                        padding: "4px",
                      }}
                    >
                      {sec.section}
                      <div style={{ fontSize: "0.7rem", marginTop: "4px" }}>
                        {sec.percentage}%
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VisualInsights;
