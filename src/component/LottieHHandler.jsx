import React from "react";
import Lottie from "lottie-react";

const LottieHAndler = ({ animationData, onComplete, loop }) => {
  return (
    <div className="lottie-container d-flex justify-content-center align-content-center">
      <Lottie
        animationData={animationData}
        loop={loop} 
        style={{ width: 400, height: 400, marginTop: "20px" }}
        onComplete={onComplete}
      />
    </div>
  );
};

export default LottieHAndler;
