import React from "react";
import "./Step3Intro.css";
import vid from "../../../assets/step3.mp4";

const Step3intro = () => {
  return (
    <div>
      <div>
        <div className="step3-intro-container">
          <div className="step-intro-contents">
            <h3>Step 3</h3>
            <h2>Finish up and publish</h2>
            <p>
              Finally, you will set up your pricing and publish your property
              for listing
            </p>
          </div>

          <div className="step-intro-video">
            <video
              className="step1-video"
              autoPlay
              playsInline
              muted
              crossOrigin="anonymous"
            >
              <source src={vid} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3intro;
