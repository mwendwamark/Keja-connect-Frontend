import { NavLink } from "react-router-dom";
import "./Hero.css";
import landlordimg from "../../../assets/Hero-landlord.png";
import studentimg from "../../../assets/Hero-student.png";
import { useEffect } from "react";
import { annotate } from "rough-notation";
import { BsArrowUpRight } from "react-icons/bs";

const Hero = () => {
  useEffect(() => {
    const kejaConnectElement = document.querySelector("#hero_notation");
    const annotation = annotate(kejaConnectElement, { type: "highlight" });
    annotation.show();
    annotation.color = "#96d5d3";
  }, []);
  return (
    <div className="hero-wrapper">
      <div className="hero-section-container container section">
        <div
          className="hero-content-area"
          data-aos="fade-up"
          data-aos-delay="100"
          data-aos-duration="1000"
        >
          <h1 className="hero-main-heading">
            Streamline your hostel hunting experience with{" "}
            <br />
            <strong id="hero_notation">Keja Connect</strong>
          </h1>
          <p className="hero-description">
            Students can find and reserve the perfect hostels, while landlords
            list and manage their properties—all in one place.
          </p>
          <NavLink
            to="/role-selection"
            className="btn hero-cta-link"
            aria-label="Get started with Keja Connect by selecting your role"
          >
            Get started  <BsArrowUpRight/>
          </NavLink>
        </div>

        <div
          className="hero-cards-wrapper"
          data-aos="fade-left"
          data-aos-delay="300"
          data-aos-duration="1200"
          data-aos-easing="linear"
        >
          <div
            className="hero-card hero-student-card"
            data-aos="flip-left"
            data-aos-delay="500"
            data-aos-duration="800"
            data-aos-easing="linear"
          >
            <div className="hero-card-content">
              <p className="hero-card-role" id="student_role">I am a student</p>
              <NavLink
                className="hero-card-register-student btn"
                to="/student/signup"
                aria-label="Register as a student on Keja Connect"
              >
                Register <BsArrowUpRight className="hero_card_icon"/>
              </NavLink>
            </div>
            <div className="hero-card-image">
              <img
                src={studentimg}
                alt="Student using Keja Connect platform"
                // width="235"
                // height="200"
                loading="eager"
                fetchpriority="high"
              />
            </div>
          </div>

          <div
            className="hero-card hero-landlord-card"
            data-aos="flip-right"
            data-aos-delay="900"
            data-aos-duration="1000"
            data-aos-easing="linear"
          >
            <div className="hero-card-content">
              <p className="hero-card-role" id="landlord_role">I am a Landlord</p>
              <NavLink
                className="hero-card-register-landlord btn"
                to="/landlord/signup"
                aria-label="Register as a landlord on Keja Connect"
              >
                Register <BsArrowUpRight className="hero_card_icon"/>
              </NavLink>
            </div>
            <div className="hero-card-image">
              <img
                src={landlordimg}
                alt="Landlord using Keja Connect platform"
                // width="235"
                // height="200"
                fetchpriority="high"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
