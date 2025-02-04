import React from "react";
import "./Step1Intro.css";
import vid from"../../../assets/step1.mp4"

const Step1Intro = () => {
  return (
    <div>
      <div className="step1-intro-container">
        <div className="step-intro-contents">
          <h3>Step 1</h3>
          <h2>Tell us about your place</h2>
          <p>
            In this step, we'll ask you which type of property you have and if
            guests will book the entire place or just a room. Then let us know
            the location and how many guests can stay.
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
            <source
              src={vid}
              type="video/mp4"
            />
          </video>
        </div>
      </div>
    </div>
  );
};

export default Step1Intro;
