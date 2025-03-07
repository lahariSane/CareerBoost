import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Components/LandingPage/styles/ResumeUpload.css";
// import { TextReveal } from "../Components/ResUpload/TextReveal.tsx";
// import Footer from "../Components/Layout/Footer.jsx";

const ResumeUploadPage = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [resume, setResume] = useState(null);
  // const [progress, setProgress] = useState(0);
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
    setResume(event.target.files[0]); // Store the selected file
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!jobDescription || !resume) {
      alert("Please enter a job description and upload a resume!");
      return;
    }

    setIsUploading(true);
    // setProgress(0);

    const formData = new FormData();
    formData.append("jobDescription", jobDescription);
    formData.append("resume", resume);

    try {
      const token = localStorage.getItem("token"); // Get JWT token
      const response = await fetch("http://localhost:5000/api/resume/upload", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to upload resume");

      const data = await response.json();
      console.log("Uploaded File Link:", data.fileUrl);

      // setProgress(100);
      // alert("Resume uploaded successfully!");
      navigate("/resume-results", { state: { fileUrl: data.fileUrl, score: 85, suggestions: ["Use more keywords", "Add a summary section"] } });
    } catch (error) {
      console.error("Error uploading resume:", error);
      alert("Error uploading resume. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="ResumeUpload-container">
      <div className="Sub-Container">
    <div className="TextReveal-container">
      {/* <h1>Optimize Your Resume for Maximum Impact</h1> */}
      <h1>Upload your resume and job description to analyze your ATS compatibility.</h1>
      {/* <h1>Get an instant ATS score and expert recommendations to boost your chances of landing the job.</h1> */}
    </div>


    <div className="test-score-container">
      <form onSubmit={handleSubmit} className="test-score-form">
        <label className="Input1-title" htmlFor="job-description">Enter Job Description</label>
        <textarea
          id="job-description"
          placeholder="Ex: Full-Stack Developer, Data Analyst..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          required
          disabled={isUploading}
        />

        <label className="Input2-title" htmlFor="resume-upload">Upload Resume (PDF)</label>
        <input
          type="file"
          id="resume-upload"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          required
          disabled={isUploading}
        />

        
        <button className="Upload-btn" type="submit" disabled={isUploading}>
          {isUploading ? "Submit" : "Submit"}
        </button>

        <div className="Loader-container" >
          {isUploading && (
            <div className="loader"></div>
          )}
        </div>

      </form>
    </div>
    </div>
{/* 
      <Footer /> */}
    </div>
  );
};

export default ResumeUploadPage;
