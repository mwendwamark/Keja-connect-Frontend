import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./StudentNavbar.css";
import logo from "../../assets/logo4.png";

const StudentNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 100) {
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

  return (
    <nav className={`student-navbar ${scrolled ? "scroll-navbar" : ""}`}>
      <div className="student-navbar-container container">
        <div className="landlord-logo-section">
          <NavLink to="/hostels">
            <img src={logo} alt="" />
          </NavLink>
        </div>
        <ul className="student-navbar-links">
          {user ? (
            <>
              <li className="student-navbar-username">
                <span className="welcome-username">Welcome,</span>{" "}
                <NavLink to="/student-profile">{user.first_name}  <span className="welcome-username">!</span></NavLink>
              </li>
            </>
          ) : (
            <li>
              <NavLink to="/student/login">Login</NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default StudentNavbar;