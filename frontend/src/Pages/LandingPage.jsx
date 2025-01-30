import React, { useState } from 'react';
import '../Components/LandingPage/styles/LandingPage.css';
import SplashPage from '../Components/LandingPage/SplashPage';
import { TypewriterEffectSmooth } from '../Components/LandingPage/HeroSection';
import { useNavigate } from 'react-router-dom';
import Footer from '../Components/Layout/Footer';
import resume6 from '../Assests/resume6.png';
import resume2 from '../Assests/resume2.png';
import resume3 from '../Assests/resume3.png';
import careerboostlogo from '../Assests/careerboostlogo.png';
import coverletter from '../Assests/coverletter.png';
import interviewimg1 from '../Assests/interviewimg1.png';
import ATSScoreSection from '../Components/LandingPage/ATSScore';
import Jobmatchsection from '../Components/LandingPage/JobMatch';
import { ContainerScroll } from '../Components/LandingPage/container-scroll-animation';

const LandingPage = () => {
  const [showSplash, setShowSplash] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {showSplash ? (
        <SplashPage onAnimationEnd={() => setShowSplash(false)} />
      ) : (
        <>
          <section className='landing-page-header'>
            <div className='landing-page-header-logo'>
              <img src={careerboostlogo} alt='careerboost-logo' className='careerboost-logo' />
              <p>CAREER BOOST</p>
            </div>
            <div className='landing-page-header-subpart'>
              <button onClick={() => navigate('/login')}>LOG IN</button>
            </div>
          </section>

          <section className='Hero-section'>
            <TypewriterEffectSmooth
              words={[
                { text: "YOUR DREAM JOB AWAITS, LET'S GET YOU THERE!!", className: "text-blue-500" },
              ]}
              className="hero-typewriter"
              cursorClassName="hero-cursor"
            />
            <h2>Create standout resumes, ace interviews, and land your dream job</h2>
            <h2> with CareerBoost's AI-driven career coaching</h2>
          </section>

          <section className='resume-templates'>
            <img src={resume6} alt='resume-temp' className='img1' />
            <img src={resume2} alt='resume-temp' className='img2' />
            <img src={resume3} alt='resume-temp' className='img3' />
          </section>

          <ATSScoreSection />

          <section className="Cover-letter">
            <ContainerScroll>
              <img
                src={coverletter}
                alt="A sample image"
                className="w-full h-full object-cover"
              />
            </ContainerScroll>
          </section>

          <Jobmatchsection />

          <section className="Interview">
            <div className="Interview-text">
              <div className="Interview-text-sub">
                <h2>Master Your Next Interview</h2>
                <p>Prepare for real-world interviews with AI-driven mock sessions</p>
                <p>Gain confidence by tackling common questions</p>
              </div>
              <section className="Progress-tracking">
                <div className="Progress-tracking-text">
                  <h2>Stay Organized, Stay Ahead</h2>
                  <p>Track your applications and interview progress effortlessly</p>
                  <p>Never miss an opportunity again</p>
                </div>
              </section>
            </div>
            <div className="Interview-illustration">
              <img src={interviewimg1} alt="Interview-Illustration" />
            </div>
          </section>

          <Footer />
        </>
      )}
    </div>
  );
};

export default LandingPage;
