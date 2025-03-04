import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import './styles/LandingPage.css'; 

const ATSScoreSection = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const [score, setScore] = useState(0);
  
  const handleTestScoreClick = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/Res-Upload');
    } else {
      navigate('/login', { state: { from: '/Res-Upload' } });
    }
  };


  // Framer Motion hooks for scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"], // Trigger scroll based on viewport position
  });

  // Transformations based on scroll progress
  const height = useTransform(scrollYProgress, [0, 0.5], ["50vh", "80vh"]);
  const width = useTransform(scrollYProgress, [0, 0.5], ["60vw", "100vw"]);
  const marginLeft = useTransform(scrollYProgress, [0, 0.5], ["20vw", "0vw"]);
  const marginRight = useTransform(scrollYProgress, [0, 0.5], ["20vw", "0vw"]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.5], ["50px", "0px"]);


  useEffect(() => {
    // Increment score based on scroll progress when section is fully visible
    const interval = setInterval(() => {
      if (scrollYProgress.get() > 0.25 && score < 100) {
        setScore((prevScore) => Math.min(prevScore + 1, 100));
      }
    }, 10); // Update every 50ms

    return () => clearInterval(interval);
  }, [scrollYProgress, score]);

  return (
    <motion.section
      className="ATS-Score"
      style={{
        height,
        width,
        marginLeft,
        marginRight,
        borderRadius,
      }}
      ref={sectionRef}
    >
      <div className="ATS-Score-text">
        <h2>Let AI Perfect Your Resume!</h2>
        <p>Our AI analyzes your resume to provide actionable feedback</p>
        <p>Stand out in the recruiter’s pile with precision-crafted resumes</p>
        <button className="ATS-Score-button" onClick={handleTestScoreClick}>TEST SCORE </button>
      </div>
      <div className="ATS-Score-illustration">
        <p>{score}</p>
      </div>
    </motion.section>
  );
};

export default ATSScoreSection;
