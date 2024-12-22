import React from 'react';
import '../styles/LandingPage.css'; 
import { ContainerScroll } from './container-scroll-animation';
import { TypewriterEffectSmooth } from './HeroSection';
import resume6 from '../assests/resume6.png'
import resume2 from '../assests/resume2.png'
import resume3 from '../assests/resume3.png'
import interviewimg1 from '../assests/interviewimg1.png'
import ATSScoreSection from './ATSScore';
import Jobmatchsection from './JobMatch';
import Footer from '../Layout/Footer';
import coverletter from '../assests/coverletter.png'

const LandingPage = () => {

  return (
    <div className="landing-page">
      <section className='landing-page-header'>
        <div className='landing-page-header-logo'>
          <p>CAREER BOOST</p>
        </div>
        <div className='landing-page-header-subpart'>
          <button>LOG IN</button>
          <button>SIGN UP</button>
        </div>
      </section>

      <section className='Hero-section'>
        <TypewriterEffectSmooth
            words={[
            { text: "YOUR DREAM JOB AWAITS, LET'S GET YOU THERE ! ! ", className: "text-blue-500" },
            ]}
            className="hero-typewriter"
            cursorClassName="hero-cursor" />
        <h2>Create standout resumes, ace interviews, and land your dream job</h2>
        <h2> with CareerBoost's AI-driven career coaching</h2>
      </section>

      <section className='resume-templates'>
        <img src= {resume6} alt='resume-temp' className='img1'></img>
        <img src= {resume2} alt='resume-temp' className='img2'></img>
        <img src= {resume3} alt='resume-temp' className='img3'></img>
      </section>

      <ATSScoreSection />

      <section className='Cover-letter'>
        <ContainerScroll >
          <img src= {coverletter} alt="A sample image" className="w-full h-full object-cover"/>
        </ContainerScroll>
      </section>

      <Jobmatchsection />

      <section className='Interview'>
        <div className='Interview-text'>
          <div className='Interview-text-sub'>
            <h2>Master Your Next Interview</h2>
            <p>Prepare for real-world interviews with AI-driven mock sessions</p>
            <p>Gain confidence by tackling common questions</p>
          </div>
          <section className='Progress-tracking'>
            <div className='Progress-tracking-text'>
            <h2>Stay Organized, Stay Ahead</h2>
            <p>Track your applications and interview progress effortlessly</p>
            <p> Never miss an opportunity again</p>
            </div>
          </section>
        </div>
        <div className='Interview-illustartion'>
          <img src={interviewimg1} alt='Interview-Illustration'></img>
        </div>
      </section>

      <Footer />

    </div>
  );
};

export default LandingPage;
