import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import './styles/LandingPage.css'; 

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Jobmatchsection = () => {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const height = useTransform(scrollYProgress, [0, 0.5], ["50vh", "80vh"]);
  const width = useTransform(scrollYProgress, [0, 0.5], ["80vw", "100vw"]);
  const marginLeft = useTransform(scrollYProgress, [0, 0.5], ["10vw", "0vw"]);
  const marginRight = useTransform(scrollYProgress, [0, 0.5], ["10vw", "0vw"]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.5], ["50px", "0px"]);

  
  const data = {
    labels: ["Web Developer", "ML Engineer", "Data Scientist", "Software Engineer", "UI/UX Designer"],
    datasets: [
      {
        label: "Compatibility Score (%)",
        data: [70, 85, 65, 90, 75],
        backgroundColor: "#e6c4af",
      },
    ],
  };

  const graphVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <motion.section
      className="Jobmatch-analysis"
      style={{
        height,
        width,
        marginLeft,
        marginRight,
        borderRadius,
      }}
      ref={sectionRef}
    >
      <div className="Jobmatch-analysis-text">
        <h2>Find Your Perfect Job Match</h2>
        <p>Apply with confidence to the right opportunities</p>
        <p>Compare your resume to job postings</p>
        <p>and get compatibility scores</p>
      </div>
      <motion.div
        className="Jobmatch-analysis-illustration"
        variants={graphVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }} // Trigger animation when in view
      >
        <Bar data={data} className="Jobmatch-graph" />
      </motion.div>
    </motion.section>
  );
};

export default Jobmatchsection;
