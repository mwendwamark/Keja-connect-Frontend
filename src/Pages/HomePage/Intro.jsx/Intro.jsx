import React from "react";
import "./Intro.css";
import introImg from "../../../assets/Home-intro-img.webp";

const Intro = () => {
  return (
    <div className="intro-wrapper body-section">
      <div className="intro-main-content container ">
        <div
          className="intro-visual"
          data-aos="zoom-in-right"
          data-aos-delay="200"
          data-aos-duration="1000"
          data-aos-easing="linear"
        >
          <img
            src={introImg}
            alt="Students finding accommodation through Keja Connect"
            loading="lazy"
          />
        </div>
        <div
          className="intro-text-content"
          data-aos="fade-up-left"
          data-aos-delay="400"
          data-aos-duration="1000"
          data-aos-easing="linear"
        >
          <h3 className="intro-label title-top title-top-green">
            Introduction
          </h3>
          <h2 className="h2-heading intro-heading">
            Find your perfect home away from home
          </h2>
          <p className="intro-paragraph">
            Keja Connect is the ultimate platform for students seeking
            comfortable and affordable hostels near their universities. We
            bridge the gap between students and hostel owners, providing a
            seamless and efficient booking experience.
          </p>
        </div>
      </div>

      <div
        className="intro-stats-section container"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <div
          className="intro-stat-item"
          data-aos="zoom-in"
          data-aos-delay="300"
          data-aos-duration="800"
          data-aos-easing="linear"
        >
          <h2 className="intro-stat-number">1475+</h2>
          <p className="intro-stat-label">Students</p>
        </div>
        <div
          className="intro-stat-item"
          data-aos="zoom-in"
          data-aos-delay="300"
          data-aos-duration="800"
          data-aos-easing="linear"
        >
          <h2 className="intro-stat-number">394+</h2>
          <p className="intro-stat-label">Landlords</p>
        </div>
        <div
          className="intro-stat-item"
          data-aos="zoom-in"
          data-aos-delay="300"
          data-aos-duration="800"
          data-aos-easing="linear"
        >
          <h2 className="intro-stat-number">2065+</h2>
          <p className="intro-stat-label">Hostels</p>
        </div>
      </div>
    </div>
  );
};

export default Intro;
