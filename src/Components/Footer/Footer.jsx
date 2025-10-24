import React from "react";
import "./Footer.css";
import { NavLink } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer body-section">
      <div className="footer-content container">
        <div className="footer-main">
          <div className="footer-brand">
            <h3>Keja Connect</h3>
            <p>
              Your trusted platform for student accommodation. Making hostel
              hunting easier and more efficient.
            </p>
            <div className="social-links">
              <NavLink to="" aria-label="Facebook">
                <FaFacebookF />
              </NavLink>
              <NavLink to="" aria-label="Twitter">
                <FaTwitter />
              </NavLink>
              <NavLink to="" aria-label="Instagram">
                <FaInstagram />
              </NavLink>
              <NavLink to="" aria-label="LinkedIn">
                <FaLinkedinIn />
              </NavLink>
            </div>
          </div>

          <div className="footer-links">
            <div className="link-group">
              <strong>Quick Links</strong>
              <ul>
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/about">About Us</NavLink>
                </li>
                <li>
                  <NavLink to="/contact">Contact</NavLink>
                </li>
                <li>
                  <NavLink to="/faqs">FAQs</NavLink>
                </li>
                <li>
                  <NavLink to="/mission">Mission</NavLink>
                </li>
                <li>
                  <NavLink to="/vision">Vision</NavLink>
                </li>
              </ul>
            </div>

            <div className="link-group">
              <strong>For Students</strong>
              <ul>
                <li>
                  <NavLink to="/student/signup">Register</NavLink>
                </li>
                <li>
                  <NavLink to="/student/login">Login</NavLink>
                </li>
                <li>
                  <NavLink to="/hostels">Find Hostels</NavLink>
                </li>
                <li>
                  <NavLink to="/faqs">Booking Guide</NavLink>
                </li>
              </ul>
            </div>

            <div className="link-group">
              <strong>For Landlords</strong>
              <ul>
                <li>
                  <NavLink to="/landlord/signup">Register</NavLink>
                </li>
                <li>
                  <NavLink to="/landlord/login">Login</NavLink>
                </li>
                <li>
                  <NavLink to="/landlord/login">List Property</NavLink>
                </li>
                <li>
                  <NavLink to="/faqs">Landlord Guide</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} Keja Connect. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <NavLink to="/terms">Terms of Service</NavLink>
            <NavLink to="/privacy">Privacy Policy</NavLink>
            <NavLink to="/cookies">Cookie Policy</NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
