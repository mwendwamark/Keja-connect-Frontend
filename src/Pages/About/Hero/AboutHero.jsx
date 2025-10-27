import React from "react";
import { NavLink } from "react-router-dom";
import hostel1 from "../../../assets/hostel4.webp";
import "./AboutHero.css";

const AboutHero = () => {
  return (
    <section className="about_page_hero-section body-section container">
      <div className="about_page_hero-container ">
        <div className="about_page_hero-headers">
          <div className="about_page_hero-titles" data-aos="fade-right">
            <strong className="title-top title-top-faint">About</strong>
            <h1>About Keja Connect</h1>
          </div>
          <div className="about_page_hero-description" data-aos="fade-up">
            <p>
              <NavLink to="/" aria-label="Navigate to Home page">
                Keja Connect
              </NavLink>{" "}
              is a platform that reduces the hassle for hostel hunting among
              university students seeking for accommodation throughout the
              semester. Lorem ipsum dolor sit amet consectetur, adipisicing
              elit. Soluta, minus! Aspernatur dolorem quos hic repudiandae nobis
              rerum exercitationem at veritatis sequi soluta libero itaque quas,
              dicta animi ad.
            </p>

            <div className="about_page_hero-button">
              <NavLink className="btn" to="/role-selection">
                Create Account
              </NavLink>
            </div>
          </div>
        </div>{" "}
        <div className="about_page_hero-img" data-aos="fade-up">
          <img src={hostel1} alt="Keja connect hostels" width="400px" />
        </div>
        <div className="about_page_hero-stats" data-aos="fade-up">
          <div className="about_page_hero-stat">
            <h2>1475 +</h2>
            <p>Students</p>
          </div>

          <div className="about_page_hero-stat">
            <h2>394 +</h2>
            <p>Landlords</p>
          </div>

          <div className="about_page_hero-stat">
            <h2>2065 +</h2>
            <p>Hostels</p>
          </div>

          <div className="about_page_hero-stat">
            <h2>63 +</h2>
            <p>Universities</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
