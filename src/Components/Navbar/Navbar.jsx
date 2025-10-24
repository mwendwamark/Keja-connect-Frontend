import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo4.png";
import { BsArrow90DegRight, BsArrowUpRight } from "react-icons/bs";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 105) {
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

  useEffect(() => {
    // Listen for changes to localStorage (login/logout in other tabs)
    const syncUser = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };
    syncUser();
    window.addEventListener("storage", syncUser);
    return () => window.removeEventListener("storage", syncUser);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  // Get initials for avatar
  const getInitials = (user) => {
    if (!user) return "";
    const first = user.first_name ? user.first_name.charAt(0).toUpperCase() : "";
    const last = user.last_name ? user.last_name.charAt(0).toUpperCase() : "";
    return first + last;
  };

  // Determine profile link based on user role
  const getProfileLink = () => {
    if (!user) return "/role-selection";
    if (user.role === "student") return "/student-profile";
    if (user.role === "landlord") return "/landlord-profile";
    return "/role-selection";
  };

  return (
    <header>
      <nav className={`navbar ${scrolled ? "scroll-navbar" : ""}`}>
        <div className="navbar-container container">
          {/* Logo */}
          <NavLink to="/" className="navbar-logo" aria-label="Keja Connect Home">
            <img src={logo} alt="Logo" loading="lazy" />
          </NavLink>

          {/* Navigation Links */}
          <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
            <NavLink to="/" onClick={closeMenu} className="nav-item" aria-label="Navigate to Home page">
              Home
            </NavLink>
            <NavLink to="/about" onClick={closeMenu} className="nav-item" aria-label="Navigate to About Us page">
              About Us
            </NavLink>
            <NavLink to="/faqs" onClick={closeMenu} className="nav-item" aria-label="Navigate to FAQs page">
              FAQs
            </NavLink>
            <NavLink to="/hostels" onClick={closeMenu} className="nav-item" aria-label="Navigate to Hostels page">
              Hostels
            </NavLink>
            <NavLink to="/contacts" onClick={closeMenu} className="nav-item" aria-label="Navigate to Contacts page">
              Contacts
            </NavLink>
            <div className="nav-right-side hide-on-large">
              {user ? (
                <NavLink
                  to={getProfileLink()}
                  onClick={closeMenu}
                  className="nav-item user-avatar-container"
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                  aria-label={`Navigate to ${user.role === "student" ? "student" : "landlord"} profile`}
                >
                  <div className="user-avatar">
                    {getInitials(user)}
                  </div>
                  <span className="avatar-username">
                    {user.first_name} {user.last_name}
                  </span>
                </NavLink>
              ) : (
                <NavLink
                  to="/role-selection"
                  onClick={closeMenu}
                  className="navbar-login-button btn"
                  aria-label="Navigate to login page"
                >
                  Login
                </NavLink>
              )}
            </div>
          </div>

          <div className="nav-right-side hide-on-small">
            {user ? (
              <NavLink
                to={getProfileLink()}
                className="nav-item user-avatar-container"
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
                aria-label={`Navigate to ${user.role === "student" ? "student" : "landlord"} profile`}
              >
                <div className="user-avatar">
                  {getInitials(user)}
                </div>
                <span className="avatar-username">
                  {user.first_name} {user.last_name}
                </span>
              </NavLink>
            ) : (
              <NavLink
                to="/role-selection"
                className="navbar-login-button btn"
                aria-label="Navigate to login page"
              >
                Login <BsArrowUpRight/>
              </NavLink>
            )}
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