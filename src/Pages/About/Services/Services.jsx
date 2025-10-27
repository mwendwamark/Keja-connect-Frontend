import React from "react";
import {
  BsBinoculars,
  BsCamera,
  BsImage,
  BsLock,
  BsSearch,
} from "react-icons/bs";
import "./Services.css";
import { NavLink } from "react-router-dom";

const Services = () => {
  return (
    <section className="services_section container">
      <div className="services_container body-section">
        <div className="services_section-headers">
          <div className="services_section-titles" data-aos="fade-left">
            <strong className="title-top title-top-faint">services</strong>
            <h2 className="h2-heading">
              What we are committed to offer to you
            </h2>
          </div>

          <p data-aos="fade-up">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
            sunt a explicabo excepturi! Deleniti unde ad voluptates nam sunt,
            harum earum? Velit, odio!
          </p>
        </div>

        <div className="services_cards-section" data-aos="fade-up">
          <div className="services_card">
            <div className="services-title">
              <BsSearch size={28} /> <h3>Easy Search</h3>
            </div>
            <p>
              Find your perfect student accommodation effortlessly with our
              advanced search filters. Filter by location, price range,
              amenities, and distance from your university to discover the ideal{" "}
              <NavLink to="/hostels">hostel</NavLink> that matches your
              preferences.
            </p>
          </div>

          <div className="services_card">
            <div className="services-title">
              <BsImage size={28} /> <h3>Virtual tuors</h3>
            </div>
            <p>
              Experience your future home from anywhere with our immersive
              virtual tours. Browse through high-quality photos, room views, and
              detailed floor plans to make informed decisions about your
              accommodation without physical visits.{" "}
              <NavLink to="/hostels">Explore available hostels.</NavLink>
            </p>
          </div>
          <div className="services_card">
            <div className="services-title">
              <BsLock size={28} /> <h3>Secure & Easy Reservation</h3>
            </div>
            <p>
              Reserve your chosen hostel with confidence through our secure
              booking platform. Enjoy transparent pricing, instant confirmation,
              and safe payment processing, making your accommodation booking
              process smooth and worry-free.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
