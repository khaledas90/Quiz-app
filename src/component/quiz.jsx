import React, { useState, useEffect } from 'react';
import LottieHAndler from './LottieHHandler';
import animationData from "../assets/load.json";
import { Link } from 'react-router-dom';
const Quiz = () => {
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const handleAnimationComplete = () => {
    setIsAnimationComplete(true);
  };

  useEffect(() => {
    if (isAnimationComplete) {
      const timer = setTimeout(() => {
        setShowButton(true);
      }, 1000); 

      return () => clearTimeout(timer); 
    }
  }, [isAnimationComplete]);

  return (
    <div className="Quiz wheelLoader-container">
      {showButton ?  <Link to={'/Play'} className="Start-Quiz"> Start Quiz </Link> : (
            <LottieHAndler 
            animationData={animationData} 
            loop={false}
            onComplete={handleAnimationComplete} 
          />
      )}
    </div>
  );
};

export default Quiz;
