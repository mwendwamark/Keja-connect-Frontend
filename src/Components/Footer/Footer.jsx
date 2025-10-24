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
            <div className="footer-social-links">
              <NavLink to="" aria-label="Visit Keja Connect Facebook page">
                <FaFacebookF />
              </NavLink>
              <NavLink to="" aria-label="Visit Keja Connect Twitter page">
                <FaTwitter />
              </NavLink>
              <NavLink to="" aria-label="Visit Keja Connect Instagram page">
                <FaInstagram />
              </NavLink>
              <NavLink to="" aria-label="Visit Keja Connect LinkedIn page">
                <FaLinkedinIn />
              </NavLink>
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-link-group">
              <strong>Quick Links</strong>
              <ul>
                <li>
                  <NavLink to="/" aria-label="Navigate to Keja Connect Home page">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/about" aria-label="Navigate to Keja Connect About page">About Us</NavLink>
                </li>
                <li>
                  <NavLink to="/contact" aria-label="Navigate to Keja Connect Contact page">Contact</NavLink>
                </li>
                <li>
                  <NavLink to="/faqs" aria-label="Navigate to Keja Connect FAQs page">FAQs</NavLink>
                </li>
                <li>
                  <NavLink to="/mission" aria-label="Navigate to Keja Connect Mission page">Mission</NavLink>
                </li>
                <li>
                  <NavLink to="/vision" aria-label="Navigate to Keja Connect Vision page">Vision</NavLink>
                </li>
              </ul>
            </div>

            <div className="footer-link-group">
              <strong>For Students</strong>
              <ul>
                <li>
                  <NavLink to="/student/signup" aria-label="Register as a student">Register</NavLink>
                </li>
                <li>
                  <NavLink to="/student/login" aria-label="Login as a student">Login</NavLink>
                </li>
                <li>
                  <NavLink to="/hostels" aria-label="Find available hostels">Find Hostels</NavLink>
                </li>
                <li>
                  <NavLink to="/faqs" aria-label="View booking guide">Booking Guide</NavLink>
                </li>
              </ul>
            </div>

            <div className="footer-link-group">
              <strong>For Landlords</strong>
              <ul>
                <li>
                  <NavLink to="/landlord/signup" aria-label="Register as a landlord">Register</NavLink>
                </li>
                <li>
                  <NavLink to="/landlord/login" aria-label="Login as a landlord">Login</NavLink>
                </li>
                <li>
                  <NavLink to="/landlord/login" aria-label="List your property">List Property</NavLink>
                </li>
                <li>
                  <NavLink to="/faqs" aria-label="View landlord guide">Landlord Guide</NavLink>
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
            <NavLink to="/terms" aria-label="View Terms of Service">Terms of Service</NavLink>
            <NavLink to="/privacy" aria-label="View Privacy Policy">Privacy Policy</NavLink>
            <NavLink to="/cookies" aria-label="View Cookie Policy">Cookie Policy</NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
