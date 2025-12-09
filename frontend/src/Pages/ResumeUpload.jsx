import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Components/LandingPage/styles/ResumeUpload.css";

const ResumeUploadPage = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [resume, setResume] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      sessionStorage.setItem("redirectAfterLogin", "/Res-Upload");
      navigate("/login");
    }
  }, [navigate]);

  const handleFileChange = (event) => {
    setResume(event.target.files[0]);
  };

  // ---------- MOCK LOGIC START ----------

  const getMockAnalysis = (jd, fileName) => {
    const text = (jd || "").toLowerCase();

    // Normalize file name to catch patterns like "sagar_genai_resume.pdf"
    const name = (fileName || "")
      .toLowerCase()
      .replace(/[_\-\.]/g, " ") // treat _, -, . as spaces
      .replace(/\s+/g, " ") // collapse multiple spaces
      .trim();

    const makeAnalysis = (
      atsScore,
      formatting,
      skillsMatch,
      keywordUsage,
      education,
      experience,
      suggestions,
      keywordDensity,
      sectionBalance
    ) => ({
      atsScore,
      breakdownData: [
        { section: "Formatting", score: formatting },
        { section: "Skills Match", score: skillsMatch },
        { section: "Keyword Usage", score: keywordUsage },
        { section: "Education", score: education },
        { section: "Experience", score: experience },
      ],
      suggestions,
      visualInsights: {
        keywordDensity,
        sectionBalance,
      },
    });

    // 1) React Frontend Developer
    if (
      text.includes("react") &&
      (text.includes("frontend") || text.includes("front-end")) &&
      name.includes("react")
    ) {
      return makeAnalysis(
        88,
        18,
        19,
        18,
        16,
        17,
        [
          "Highlight React hooks usage (useState, useEffect, useMemo) in your experience section.",
          "Add more measurable impact such as performance improvements or user engagement metrics.",
          "Include testing tools like Jest/React Testing Library if you’ve used them.",
        ],
        [
          { keyword: "react", count: 15 },
          { keyword: "javascript", count: 9 },
          { keyword: "hooks", count: 5 },
        ],
        [
          { section: "Summary", percentage: 10 },
          { section: "Experience", percentage: 45 },
          { section: "Education", percentage: 15 },
          { section: "Skills", percentage: 20 },
          { section: "Other", percentage: 10 },
        ]
      );
    }

    // 2) MERN Full Stack
    if (
      text.includes("mern") ||
      (text.includes("react") && text.includes("node") && text.includes("mongodb"))
    ) {
      return makeAnalysis(
        92,
        19,
        19,
        19,
        16,
        19,
        [
          "Mention end-to-end projects where you handled both frontend and backend.",
          "Add bullet points describing REST API design and authentication/authorization.",
          "Showcase any deployment experience (Render, Vercel, AWS, etc.).",
        ],
        [
          { keyword: "react", count: 12 },
          { keyword: "node", count: 10 },
          { keyword: "mongodb", count: 7 },
        ],
        [
          { section: "Summary", percentage: 12 },
          { section: "Experience", percentage: 50 },
          { section: "Education", percentage: 13 },
          { section: "Skills", percentage: 20 },
          { section: "Other", percentage: 5 },
        ]
      );
    }

    // 3) Backend Node.js Developer
    if (
      (text.includes("backend") || text.includes("back-end")) &&
      text.includes("node") &&
      !text.includes("react")
    ) {
      return makeAnalysis(
        85,
        17,
        18,
        18,
        15,
        17,
        [
          "Add details about database design (schemas, indexing, query optimization).",
          "Mention logging, monitoring, and error-handling patterns.",
          "Include experience with message queues or caching if applicable.",
        ],
        [
          { keyword: "node", count: 12 },
          { keyword: "express", count: 8 },
          { keyword: "api", count: 9 },
        ],
        [
          { section: "Summary", percentage: 8 },
          { section: "Experience", percentage: 52 },
          { section: "Education", percentage: 15 },
          { section: "Skills", percentage: 20 },
          { section: "Other", percentage: 5 },
        ]
      );
    }

    // 4) Data Scientist / ML Engineer
    if (
      text.includes("data scientist") ||
      text.includes("machine learning") ||
      (text.includes("ml") && text.includes("python")) ||
      name.includes("ml") ||
      name.includes("data")
    ) {
      return makeAnalysis(
        90,
        18,
        19,
        18,
        18,
        17,
        [
          "Include model performance metrics like accuracy, F1-score, or RMSE.",
          "Highlight experience with real-world datasets and cleaning/feature engineering.",
          "Add tools such as scikit-learn, TensorFlow, or PyTorch where relevant.",
        ],
        [
          { keyword: "python", count: 10 },
          { keyword: "machine learning", count: 8 },
          { keyword: "data", count: 14 },
        ],
        [
          { section: "Summary", percentage: 10 },
          { section: "Experience", percentage: 40 },
          { section: "Education", percentage: 25 },
          { section: "Skills", percentage: 20 },
          { section: "Other", percentage: 5 },
        ]
      );
    }

    // 5) Data Analyst
    if (
      text.includes("data analyst") ||
      (text.includes("excel") && text.includes("sql")) ||
      text.includes("power bi")
    ) {
      return makeAnalysis(
        82,
        17,
        17,
        17,
        16,
        15,
        [
          "Add clear bullet points summarizing dashboards or reports you have built.",
          "Mention business impact, such as improved decision-making or cost savings.",
          "Strengthen SQL section with examples of complex queries or joins.",
        ],
        [
          { keyword: "sql", count: 11 },
          { keyword: "excel", count: 9 },
          { keyword: "dashboard", count: 4 },
        ],
        [
          { section: "Summary", percentage: 9 },
          { section: "Experience", percentage: 38 },
          { section: "Education", percentage: 18 },
          { section: "Skills", percentage: 25 },
          { section: "Other", percentage: 10 },
        ]
      );
    }

    // 6) DevOps / Cloud Engineer
    if (
      text.includes("devops") ||
      text.includes("docker") ||
      text.includes("kubernetes") ||
      text.includes("aws")
    ) {
      return makeAnalysis(
        78,
        16,
        16,
        15,
        14,
        17,
        [
          "Add CI/CD tools like GitHub Actions, Jenkins, or GitLab CI/CD explicitly.",
          "Highlight infrastructure-as-code experience (Terraform, CloudFormation).",
          "Mention monitoring tools such as Prometheus or Grafana.",
        ],
        [
          { keyword: "aws", count: 7 },
          { keyword: "docker", count: 6 },
          { keyword: "ci/cd", count: 4 },
        ],
        [
          { section: "Summary", percentage: 8 },
          { section: "Experience", percentage: 48 },
          { section: "Education", percentage: 15 },
          { section: "Skills", percentage: 20 },
          { section: "Other", percentage: 9 },
        ]
      );
    }

    // 7) Android / Mobile Developer
    if (
      text.includes("android") ||
      text.includes("kotlin") ||
      text.includes("flutter") ||
      name.includes("android")
    ) {
      return makeAnalysis(
        80,
        17,
        16,
        15,
        15,
        17,
        [
          "Showcase apps you have built with links to Play Store or GitHub if possible.",
          "Mention architecture patterns such as MVVM or Clean Architecture.",
          "Add tools like Retrofit, Room, or Firebase where relevant.",
        ],
        [
          { keyword: "android", count: 10 },
          { keyword: "kotlin", count: 7 },
          { keyword: "ui", count: 5 },
        ],
        [
          { section: "Summary", percentage: 10 },
          { section: "Experience", percentage: 42 },
          { section: "Education", percentage: 18 },
          { section: "Skills", percentage: 20 },
          { section: "Other", percentage: 10 },
        ]
      );
    }

    // 8) Cybersecurity
    if (
      text.includes("security") ||
      text.includes("cyber security") ||
      text.includes("cybersecurity") ||
      text.includes("penetration testing") ||
      text.includes("owasp")
    ) {
      return makeAnalysis(
        76,
        15,
        16,
        16,
        14,
        15,
        [
          "Add certifications like CEH, Security+, or other relevant ones if you have them.",
          "Mention tools such as Burp Suite, Metasploit, or Wireshark.",
          "Highlight any CTFs or security competitions you participated in.",
        ],
        [
          { keyword: "security", count: 9 },
          { keyword: "vulnerability", count: 5 },
          { keyword: "network", count: 6 },
        ],
        [
          { section: "Summary", percentage: 9 },
          { section: "Experience", percentage: 40 },
          { section: "Education", percentage: 20 },
          { section: "Skills", percentage: 21 },
          { section: "Other", percentage: 10 },
        ]
      );
    }

    // 9) Java / Spring Boot Backend
    if (text.includes("java") && (text.includes("spring") || text.includes("spring boot"))) {
      return makeAnalysis(
        83,
        17,
        18,
        16,
        15,
        17,
        [
          "Mention microservices or monolithic architecture explicitly, depending on your projects.",
          "Highlight database technologies like MySQL/PostgreSQL with specific use cases.",
          "Add performance optimizations or scalability improvements you've worked on.",
        ],
        [
          { keyword: "java", count: 11 },
          { keyword: "spring", count: 9 },
          { keyword: "rest", count: 6 },
        ],
        [
          { section: "Summary", percentage: 8 },
          { section: "Experience", percentage: 50 },
          { section: "Education", percentage: 14 },
          { section: "Skills", percentage: 20 },
          { section: "Other", percentage: 8 },
        ]
      );
    }

    // 10) Product Manager
    if (
      text.includes("product manager") ||
      text.includes("roadmap") ||
      text.includes("stakeholders")
    ) {
      return makeAnalysis(
        70,
        16,
        15,
        14,
        14,
        11,
        [
          "Add metrics like increased user retention, revenue growth, or feature adoption.",
          "Highlight collaboration with engineering, design, and marketing teams.",
          "Include tools such as Jira, Notion, Figma, or analytics platforms.",
        ],
        [
          { keyword: "product", count: 9 },
          { keyword: "stakeholder", count: 4 },
          { keyword: "roadmap", count: 3 },
        ],
        [
          { section: "Summary", percentage: 12 },
          { section: "Experience", percentage: 36 },
          { section: "Education", percentage: 19 },
          { section: "Skills", percentage: 18 },
          { section: "Other", percentage: 15 },
        ]
      );
    }

    // 11) Fresh Graduate / Internship role
    if (
      text.includes("intern") ||
      text.includes("fresher") ||
      text.includes("entry level")
    ) {
      return makeAnalysis(
        75,
        17,
        15,
        15,
        18,
        10,
        [
          "Emphasize academic projects with clear tech stack and problem statements.",
          "Add hackathons, coding contests, or open-source contributions if any.",
          "Include a compact skills section with core languages and frameworks.",
        ],
        [
          { keyword: "project", count: 10 },
          { keyword: "academic", count: 5 },
          { keyword: "internship", count: 3 },
        ],
        [
          { section: "Summary", percentage: 10 },
          { section: "Experience", percentage: 20 },
          { section: "Education", percentage: 35 },
          { section: "Skills", percentage: 25 },
          { section: "Other", percentage: 10 },
        ]
      );
    }

    // 12) GenAI / LLM Engineer
    if (
      text.includes("gen ai") ||
      text.includes("generative ai") ||
      text.includes("llm") ||
      name.includes("genai")
    ) {
      return makeAnalysis(
        91,
        19,
        18,
        19,
        17,
        18,
        [
          "Add quantifiable results for AI model deployment or prototype impact.",
          "Showcase prompt engineering techniques and evaluation strategies.",
          "Mention any MLOps or deployment tools you’ve used (Docker, CI/CD, etc.).",
        ],
        [
          { keyword: "generative ai", count: 12 },
          { keyword: "llm", count: 6 },
          { keyword: "prompt", count: 8 },
        ],
        [
          { section: "Summary", percentage: 12 },
          { section: "Experience", percentage: 44 },
          { section: "Education", percentage: 18 },
          { section: "Skills", percentage: 20 },
          { section: "Other", percentage: 6 },
        ]
      );
    }

    // 13) Mismatch case (e.g., JD: Data Scientist, Resume: front-end)
    if (
      (text.includes("data scientist") || text.includes("machine learning")) &&
      (name.includes("frontend") || name.includes("react"))
    ) {
      return makeAnalysis(
        55,
        14,
        10,
        10,
        12,
        9,
        [
          "Your resume does not strongly match this role. Consider tailoring it to data science skills.",
          "Add more ML-related projects, tools, and metrics.",
          "Reduce emphasis on purely frontend technologies for this application.",
        ],
        [
          { keyword: "react", count: 10 },
          { keyword: "machine learning", count: 2 },
          { keyword: "data", count: 3 },
        ],
        [
          { section: "Summary", percentage: 10 },
          { section: "Experience", percentage: 30 },
          { section: "Education", percentage: 20 },
          { section: "Skills", percentage: 25 },
          { section: "Other", percentage: 15 },
        ]
      );
    }

    // 14) Generic Software Engineer
    if (
      text.includes("software engineer") ||
      text.includes("sde") ||
      text.includes("full-time developer")
    ) {
      return makeAnalysis(
        80,
        17,
        17,
        16,
        15,
        15,
        [
          "Tailor your resume to the specific tech stack mentioned in the job description.",
          "Add measurable impact for your major projects or roles.",
          "Keep the resume concise (1–2 pages) with clear headings.",
        ],
        [
          { keyword: "software", count: 9 },
          { keyword: "developer", count: 8 },
          { keyword: "project", count: 10 },
        ],
        [
          { section: "Summary", percentage: 9 },
          { section: "Experience", percentage: 44 },
          { section: "Education", percentage: 18 },
          { section: "Skills", percentage: 20 },
          { section: "Other", percentage: 9 },
        ]
      );
    }

    // 15) Fallback default case
    return makeAnalysis(
      72,
      16,
      15,
      14,
      14,
      13,
      [
        "Try aligning your resume keywords more closely with the job description.",
        "Ensure consistent formatting with clear headings and bullet points.",
        "Add a short, impactful summary highlighting your main strengths.",
      ],
      [
        { keyword: "project", count: 7 },
        { keyword: "experience", count: 6 },
        { keyword: "skills", count: 5 },
      ],
      [
        { section: "Summary", percentage: 10 },
        { section: "Experience", percentage: 40 },
        { section: "Education", percentage: 20 },
        { section: "Skills", percentage: 20 },
        { section: "Other", percentage: 10 },
      ]
    );
  };

  // ---------- MOCK LOGIC END ----------

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!jobDescription || !resume) {
      alert("Please enter a job description and upload a resume!");
      return;
    }

    setIsUploading(true);

    try {
      const mockAnalysis = getMockAnalysis(jobDescription, resume.name);

      navigate("/resume-results", {
        state: {
          atsScore: mockAnalysis.atsScore,
          breakdownData: mockAnalysis.breakdownData,
          suggestions: mockAnalysis.suggestions,
          visualInsights: mockAnalysis.visualInsights,
          fileUrl: null,
        },
      });
    } catch (error) {
      console.error("Error in mock upload:", error);
      alert("Something went wrong while generating mock results.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="ResumeUpload-container">
      <div className="Sub-Container">
        <div className="TextReveal-container">
          <h1>
            Upload your resume and job description to analyze your ATS
            compatibility.
          </h1>
        </div>

        <div className="test-score-container">
          <form onSubmit={handleSubmit} className="test-score-form">
            <label className="Input1-title" htmlFor="job-description">
              Enter Job Description
            </label>
            <textarea
              id="job-description"
              placeholder="Ex: Full-Stack Developer, Data Analyst..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              required
              disabled={isUploading}
            />

            <label className="Input2-title" htmlFor="resume-upload">
              Upload Resume (PDF)
            </label>
            <input
              type="file"
              id="resume-upload"
              accept=".pdf"
              onChange={handleFileChange}
              required
              disabled={isUploading}
            />

            <button className="Upload-btn" type="submit" disabled={isUploading}>
              {isUploading ? "Submitting..." : "Submit"}
            </button>

            <div className="Loader-container">
              {isUploading && <div className="loader"></div>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResumeUploadPage;
