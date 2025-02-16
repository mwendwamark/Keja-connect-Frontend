import React from "react";
import vid from "../../../../assets/step2.mp4";

const Step2Intro = () => {
  return (
    <div>
      <div>
        <div className="steps-intro-container">
          <div className="steps-intro-contents">
            <h3>Step 2</h3>
            <h2>Make your place stand out</h2>
            <p>
              In this step, you’ll add some of the amenities your place offers,
              plus photos. Then, you’ll create a title and description.
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
            </video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2Intro;
