import React from "react";
import "./Step1Intro.css";
import vid from "../../../assets/step1.webm";
// import vid from "../../../assets/step1-unscreen.gif";


const Step1Intro = () => {
  return (
    <div className="steps-intro-container">
      <div className="steps-intro-contents">
        <h3>Step 1</h3>
        <h2>Tell us about your place</h2>
        <p>
          In this step, we'll ask you which type of property you have and if
          guests will book the entire place or just a room. Then let us know the
          location and how many guests can stay.
        </p>
      </div>

      <div className="steps-intro-video">
        <video
          className="step1-video"
          autoPlay
          playsInline
          muted
          crossOrigin="anonymous"
        >
          <source src={vid} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default Step1Intro;