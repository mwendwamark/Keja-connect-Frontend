import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo4.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 105) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header>
      <nav className={`navbar ${scrolled ? "scroll-navbar" : ""}`}>
        <div className="navbar-container container">
          {/* Logo */}
          <NavLink to="/" className="navbar-logo">
            <img src={logo} alt="Logo" loading="lazy" />
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
            <NavLink to="/hostels" onClick={closeMenu} className="nav-item">
              Hostels
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