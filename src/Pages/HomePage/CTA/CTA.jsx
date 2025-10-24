import React from "react";
import { NavLink } from "react-router-dom";
import "./CTA.css";

const CTA = () => {
  return (
    <div
      className="cta-wrapper container body-section "
      data-aos="fade-up"
      data-aos-delay="100"
      data-aos-duration="1000"
    >
      <div className="cta-section">
        <div
          className="cta-content-box body-section"
          data-aos="zoom-in"
          data-aos-delay="300"
          data-aos-duration="800"
        >
          <h2 className="cta-heading">
            Ready to find your perfect student accommodation?
          </h2>
          <p className="cta-text">
            Seamlessly connect with trusted landlords and discover ideal hostels
            near your university. Your hassle-free accommodation search starts
            here.
          </p>
          <div
            className="cta-action-buttons"
            data-aos="fade-up"
            data-aos-delay="500"
            data-aos-duration="800"
          >
            <NavLink
              to="/hostels"
              className="cta-primary-button btn"
              aria-label="View available hostels"
              data-aos="fade-right"
              data-aos-delay="600"
              data-aos-duration="800"
            >
              Browse Hostels
            </NavLink>
            <NavLink
              to="/about"
              className="cta-secondary-button btn"
              aria-label="Learn more about Jamii Hostels"
              data-aos="fade-left"
              data-aos-delay="700"
              data-aos-duration="800"
            >
              List property
            </NavLink>
          </div>
        </div>

        {/* Decorative Circles */}
        <div className="cta-circles">
          <div className="cta-circle cta-circle-1"></div>
          <div className="cta-circle cta-circle-2"></div>
          <div className="cta-circle cta-circle-3"></div>
          <div className="cta-circle cta-circle-4"></div>
        </div>
      </div>
    </div>
  );
};

export default CTA;
