import React from "react";
import { NavLink } from "react-router-dom";
import "./HomePage.css";
import landlordimg from "../../assets/Hero-landlord.png";
import studentimg from "../../assets/Hero-student.png";
import introImg from "../../assets/Home-intro-img.png";

const HomePage = () => {
  return (
    <>
      <div className="home-page">
        <div className="home-hero-section container">
          <div className="hero-title">
            <h2>Jamii hostels</h2>
            <h1>Streamline your hostel hunting experience</h1>{" "}
            <p>
              Students can find and reserve the perfect hostels, while landlords
              list and manage their properties—all in one place.
            </p>
            <NavLink to="/choose-role">Get started </NavLink>
          </div>

          <div className="hero-images">
            <div className="hero-image-student">
              <div className="hero-student-contents">
                <p className="hero-welcome">Welcome!</p>
                <p className="hero-role">I am a student</p>
                <NavLink className="hero-register" to="/student-signup">
                  Register
                </NavLink>
              </div>
              <div className="student-img">
                <img src={studentimg} alt="student-image" />
              </div>
            </div>

            <div className="hero-image-landlord">
              <div className="hero-landlord-contents">
                {" "}
                <p className="hero-welcome">Welcome!</p>
                <p className="hero-role">I am a Landlord</p>
                <NavLink className="hero-register" to="/landlord-signup">
                  Register
                </NavLink>
              </div>{" "}
              <div className="landlord-img">
                <img src={landlordimg} alt="landlord-image" />
              </div>
            </div>
          </div>
        </div>

        <div className="home-introduction-section">
          <div className="intro-image-contents container">
            <div className="intro-image">
              <img src={introImg} alt="" />
            </div>
            <div className="intro-contents">
              <h1>Introducing Jamii hostels</h1>
              <h2>Find your perfect home away from home</h2>
              <p>
                Jamii Hostels is the ultimate platform for students seeking
                comfortable and affordable accommodation near their
                universities. We bridge the gap between students and hostel
                owners, providing a seamless and efficient booking experience.
              </p>
              <div className="intro-section-data">
                <div className="data-item">
                  <h2 className="data-number">8475+</h2>
                  <p className="data-label">Students</p>
                </div>
                <div className="data-item">
                  <h2 className="data-number">594+</h2>
                  <p className="data-label">Landlords hosted</p>
                </div>
                <div className="data-item">
                  <h2 className="data-number">12065+</h2>
                  <p className="data-label">Hostels listed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
