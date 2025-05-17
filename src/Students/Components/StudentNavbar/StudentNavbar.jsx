import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./StudentNavbar.css";
import logo from "../../../assets/logo4.png";
import { FaBars, FaTimes } from "react-icons/fa";

const StudentNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header>
      <nav className={`student-navbar ${scrolled ? "scroll-navbar" : ""}`}>
        <div className="student-navbar-container container">
          {/* Logo */}
          <div className="student-logo-section">
            <NavLink to="/" onClick={closeMenu}>
              <img src={logo} alt="keja-connect-logo" loading="lazy" />
            </NavLink>
          </div>

          {/* Navigation Links */}
          <ul className={`student-navbar-links ${menuOpen ? "active" : ""}`}>
            <div className="nav-links-container">
              <li className="student-navbar-center">
                <NavLink
                  to="/hostels"
                  onClick={closeMenu}
                  className="wishlist-center-link"
                >
                  Hostels
                </NavLink>
              </li>
              <li className="student-navbar-center">
                <NavLink
                  to="/wishlist"
                  onClick={closeMenu}
                  className="wishlist-center-link"
                >
                  Wishlist
                </NavLink>
              </li>
            </div>

            {/* Mobile Avatar (shown only when menu is open) */}
            {user && menuOpen && (
              <li className="mobile-avatar-container">
                <NavLink
                  to="/student-profile"
                  onClick={closeMenu}
                  className="user-avatar-container"
                >
                  <div className="user-avatar">
                    {user.first_name.charAt(0).toUpperCase()}
                    {user.last_name
                      ? user.last_name.charAt(0).toUpperCase()
                      : ""}
                  </div>
                  <div className="avatar-username">
                    {user.first_name} {user.last_name}
                  </div>
                </NavLink>
              </li>
            )}
          </ul>

          {/* Right side content */}
          <div className="student-nav-right-side">
            {user ? (
              <NavLink
                to="/student-profile"
                className="user-avatar-container hide-on-small"
              >
                <div className="avatar-username">
                  <span>
                    {user.first_name} {user.last_name}
                  </span>
                </div>
                <div className="user-avatar">
                  {user.first_name.charAt(0).toUpperCase()}
                  {user.last_name ? user.last_name.charAt(0).toUpperCase() : ""}
                </div>
              </NavLink>
            ) : (
              <NavLink
                to="/student/login"
                onClick={closeMenu}
                className="nav-item contact-button hide-on-small"
              >
                Login
              </NavLink>
            )}
          </div>

          {/* Mobile Menu Icon */}
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

export default StudentNavbar;