import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./WhyChooseUs.css";
import chooseUs1 from "../../../assets/chooseus1.webp";
import chooseUs2 from "../../../assets/choose2.webp";
import { BsArrowBarRight, BsArrowRight } from "react-icons/bs";
import { annotate } from "rough-notation";

const WhyChooseUs = () => {
  useEffect(() => {
    const pink = document.querySelector("#chooseus_landlords_badge");
    const annotation = annotate(pink, { type: "box" });
    annotation.show();
    annotation.color = "var(--dark-pink)";

    const blue = document.querySelector("#chooseus_students_badge");
    const blueAnnotation = annotate(blue, { type: "box" });
    blueAnnotation.show();
    blueAnnotation.color = "var(--green-color)";

    const landlordBg = document.querySelector("#chooseus_landlords_background");
    const annotateLandlordBg = annotate(landlordBg, { type: "highlight" });
    annotateLandlordBg.show();
    annotateLandlordBg.color = "var(--dark-pink)";

    const studentBg = document.querySelector("#chooseus_students_background");
    const annotateStudentBg = annotate(studentBg, { type: "highlight" });
    annotateStudentBg.show();
    annotateStudentBg.color = "var(--green-color)";
  });
  return (
    <div className="chooseus-wrapper container body-section">
      <div
        className="chooseus-header"
        data-aos="fade-up"
        data-aos-delay="100"
        data-aos-duration="800"
        data-aos-easing="linear"
      >
        <strong className="title-top title-top-faint">DISCOVER & GROW</strong>
        <h2 className="h2-heading chooseus-title">Why choose us?</h2>
      </div>

      <div
        className="chooseus-students-section section"
        data-aos="fade-right"
        data-aos-delay="200"
        data-aos-duration="1000"
        data-aos-easing="linear"
      >
        <div
          className="chooseus-students-text"
          data-aos="fade-up"
          data-aos-delay="300"
          data-aos-duration="800"
          data-aos-easing="linear"
        >
          <strong className="chooseus-category" id="chooseus_students_badge">
            For Students
          </strong>
          <h3 className="chooseus-section-heading">
            Reduce the hassle for hostel hunting
          </h3>
          <p className="chooseus-description">
            Discover a wide range of hostels with detailed information,
            including location, price, amenities, and images. Easily book your
            preferred hostel, manage your bookings, and view your booking
            history. Your home away from home is just a few clicks away!
          </p>
          <NavLink
            to="/student/signup"
            className="chooseus-student-btn btn"
            aria-label="Create a student account to find and book hostels"
          >
            Student account <BsArrowRight />
          </NavLink>
        </div>
        <div
          className="chooseus-students-visual"
          data-aos="zoom-in"
          data-aos-delay="400"
          data-aos-duration="800"
          data-aos-easing="linear"
        >
          <img
            src={chooseUs1}
            alt="Students benefiting from Keja Connect services"
            loading="lazy"
            id="chooseus_students_background"
          />
        </div>
      </div>

      <div
        className="chooseus-landlords-section section"
        data-aos="fade-left"
        data-aos-delay="200"
        data-aos-duration="1000"
      >
        <div
          className="chooseus-landlords-visual"
          data-aos="zoom-in"
          data-aos-delay="400"
          data-aos-duration="800"
        >
          <img
            src={chooseUs2}
            alt="Landlords managing properties on Keja Connect"
            loading="lazy"
            id="chooseus_landlords_background"
          />
        </div>
        <div
          className="chooseus-landlords-text"
          data-aos="fade-up"
          data-aos-delay="300"
          data-aos-duration="800"
        >
          <strong className="chooseus-category" id="chooseus_landlords_badge">
            for landlords
          </strong>
          <h3 className="chooseus-section-heading">
            Scale up your rental business effortlessly
          </h3>
          <p className="chooseus-description">
            List your hostels and reach thousands of potential student tenants.
            Manage your listings, track bookings, and calculate your earnings
            effortlessly through your personalized dashboard. Keja Connect makes
            it simple to fill your rooms and grow your business.
          </p>
          <NavLink
            to="/landlord/signup"
            className="chooseus-landlord-btn btn"
            aria-label="Create a landlord account to list and manage properties"
          >
            Landlord account <BsArrowRight />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
