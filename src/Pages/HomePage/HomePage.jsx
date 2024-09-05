import React from "react";
import { NavLink } from "react-router-dom";
import "./HomePage.css";
import landlordimg from "../../assets/Hero-landlord.png";
import studentimg from "../../assets/Hero-student.png";

const HomePage = () => {
  return (
    <>
      <div className="home-page container">
        <div className="home-hero-section">
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
      </div>
    </>
  );
};

export default HomePage;
