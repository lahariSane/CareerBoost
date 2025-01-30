import React, { useEffect, useState } from 'react';
import '../LandingPage/styles/SplashPage.css';
import careerboostlogo from '../../Assests/careerboostlogo.png';

const SplashPage = ({ onAnimationEnd }) => {
  const [exitAnimation, setExitAnimation] = useState(false);

  useEffect(() => {

    // Start exit animation after 5 seconds
    const exitTimer = setTimeout(() => {
      setExitAnimation(true);
    }, 3000);

    // Trigger the callback when the exit animation is complete
    const completeTimer = setTimeout(() => {
      onAnimationEnd();
    }, 4000);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onAnimationEnd]);

  return (
    <div className={`splash-page ${exitAnimation ? 'exit' : ''}`}>
      <div className="logo-title-container">
        <img
          src={careerboostlogo}
          alt="careerboost-logo"
          className="careerboost-logo-splashpage"
        />
        <div className="splash-title">CAREER BOOST</div>
      </div>
    </div>
  );
};

export default SplashPage;
