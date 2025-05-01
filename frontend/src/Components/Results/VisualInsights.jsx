// // src/Components/Results/VisualInsights.jsx
// import React from "react";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
// import { PieChart, Pie, Cell } from "recharts";
// import "./styles/VisualInsights.css";

// // Sample data for the charts
// const jobMatchData = [
//   { name: "Skills Match", value: 75 },
//   { name: "Experience Match", value: 65 },
//   { name: "Keyword Match", value: 80 },
//   { name: "Formatting", value: 90 }
// ];

// const skillCoverageData = [
//   { name: "Python", value: 30 },
//   { name: "JavaScript", value: 25 },
//   { name: "SQL", value: 20 },
//   { name: "React", value: 15 },
//   { name: "CSS", value: 10 }
// ];

// const VisualInsights = () => {
//   return (
//     <div className="visual-insights">
//       <h3>Visual Insights</h3>

//       <div className="charts-container">
//         {/* Job Match Bar Chart */}
//         <div className="chart">
//           <h4>Job Match Analysis</h4>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={jobMatchData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="value" fill="#8884d8" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Skill Coverage Pie Chart */}
//         <div className="chart">
//           <h4>Skill Coverage</h4>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie
//                 data={skillCoverageData}
//                 dataKey="value"
//                 nameKey="name"
//                 outerRadius={100}
//                 fill="#82ca9d"
//                 label
//               >
//                 {skillCoverageData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#ff7300" : "#00c49f"} />
//                 ))}
//               </Pie>
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VisualInsights;
import React, { useState } from 'react';
import { BarChart, PieChart } from 'lucide-react';
import './styles/VisualInsights.css';

const VisualInsights = () => {
  const [activeView, setActiveView] = useState('keywords');

  const keywords = [
    { text: 'Project Management', weight: 'high' },
    { text: 'JavaScript', weight: 'high' },
    { text: 'React', weight: 'high' },
    { text: 'Node.js', weight: 'medium' },
    { text: 'Agile', weight: 'medium' },
    { text: 'Team Leadership', weight: 'medium' },
    { text: 'Communication', weight: 'medium' },
    { text: 'TypeScript', weight: 'medium' },
    { text: 'CI/CD', weight: 'low' },
    { text: 'Docker', weight: 'low' },
    { text: 'AWS', weight: 'low' },
    { text: 'Python', weight: 'low' },
    { text: 'UX/UI', weight: 'low' },
    { text: 'REST API', weight: 'low' },
  ];

  return (
    <div className="results-card visual-insights-container">
      <div className="visual-insights-header">
        <h3 className="visual-insights-title">Visual Insights</h3>
        <p className="visual-insights-subtitle">Visualized analysis of your resume content</p>
      </div>

      <div className="insights-toggle">
        <button 
          className={`insights-toggle-btn ${activeView === 'keywords' ? 'active' : ''}`}
          onClick={() => setActiveView('keywords')}
        >
          <BarChart size={14} style={{ marginRight: '4px', verticalAlign: 'text-bottom' }} />
          Keywords
        </button>
        <button 
          className={`insights-toggle-btn ${activeView === 'sections' ? 'active' : ''}`}
          onClick={() => setActiveView('sections')}
        >
          <PieChart size={14} style={{ marginRight: '4px', verticalAlign: 'text-bottom' }} />
          Sections
        </button>
      </div>

      <div className="visual-insights-content">
        {activeView === 'keywords' && (
          <>
            <div>
              <h4 className="insights-chart-title">Keyword Density</h4>
              <p className="suggestions-subtitle">Key terms detected in your resume</p>
              <div className="keyword-density">
                {keywords.map((keyword, index) => (
                  <span 
                    key={index} 
                    className="keyword-tag" 
                    data-weight={keyword.weight}
                  >
                    {keyword.text}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="insights-chart-title">Missing Keywords</h4>
              <p className="suggestions-subtitle">Recommended terms to include in your resume</p>
              <div className="keyword-density">
                <span className="keyword-tag" data-weight="low">Data Analysis</span>
                <span className="keyword-tag" data-weight="low">Full Stack</span>
                <span className="keyword-tag" data-weight="low">Problem Solving</span>
                <span className="keyword-tag" data-weight="low">Strategic Planning</span>
                <span className="keyword-tag" data-weight="low">Cross-functional</span>
              </div>
            </div>
          </>
        )}

        {activeView === 'sections' && (
          <div className="insights-chart-container">
            <h4 className="insights-chart-title">Section Balance</h4>
            <p className="suggestions-subtitle">Word count distribution across resume sections</p>
            <div style={{ display: 'flex', height: '200px', alignItems: 'flex-end', gap: '20px', padding: '20px 0' }}>
              <div style={{ width: '80px', height: '40%', background: 'var(--primary-400)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white', fontSize: '0.8rem' }}>
                Summary
              </div>
              <div style={{ width: '80px', height: '85%', background: 'var(--primary-600)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white', fontSize: '0.8rem' }}>
                Experience
              </div>
              <div style={{ width: '80px', height: '60%', background: 'var(--primary-500)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white', fontSize: '0.8rem' }}>
                Skills
              </div>
              <div style={{ width: '80px', height: '35%', background: 'var(--primary-300)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white', fontSize: '0.8rem' }}>
                Education
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisualInsights;
