import React, { useState } from "react";
import "./Navbar.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo4.png";

const Navbar = () => {
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    // When the scroll is higher than the 560 viewport height, add the "scroll-navbar" class to the tag with the "navbar" class
    if (this.scrollY >= 105) navbar.classList.add("scroll-navbar");
    else navbar.classList.remove("scroll-navbar");
  });

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header>
      <nav className="navbar">
        <div className="navbar-container container">
          {/* Logo */}
          <NavLink to="/" className="navbar-logo">
            <img src={logo} alt="Logo" />
          </NavLink>

          {/* Navigation Links */}
          <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
            <NavLink to="/" onClick={closeMenu} className="nav-item">
              Home
            </NavLink>
            <NavLink to="/about" onClick={closeMenu} className="nav-item">
              About Us
            </NavLink>
            <NavLink to="/faqs" onClick={closeMenu} className="nav-item">
              FAQs
            </NavLink>
            <NavLink to="/contacts" onClick={closeMenu} className="nav-item">
              Contacts
            </NavLink>

            <div className="nav-right-side hide-on-large">
              <NavLink
                to="/role-selection"
                onClick={closeMenu}
                className="nav-item contact-button"
              >
                Login
              </NavLink>
            </div>
          </div>

          <div className="nav-right-side hide-on-small">
            <NavLink
              to="/role-selection"
              onClick={closeMenu}
              className="nav-item contact-button"
            >
              Login
            </NavLink>
          </div>
          <div className="navbar-menu-icon" onClick={toggleMenu}>
            {menuOpen ? (
              <FaTimes style={{ color: "var(--light-green)" }} />
            ) : (
              <FaBars />
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
