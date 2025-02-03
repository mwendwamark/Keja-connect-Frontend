import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./LandlordNavbar.css";
import logo from "../../assets/logo4.png";

const LandlordNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

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

  return (
    <div className={`landlord-navbar ${scrolled ? "scroll-navbar" : ""}`}>
      <div className="landlord-navbar-container container">
        <div className="landlord-logo-section">
          <NavLink to="/landlord/dashboard">
            <img src={logo} alt="" />
          </NavLink>
        </div>
        <ul className="landlord-navbar-links">
          {user ? (
            <>
              <li className="navbar-username">
              <span className="welcome-username">Welcome,</span>{" "}
                <NavLink to="/landlord-profile">{user.first_name}  <span className="welcome-username">!</span>{" "}</NavLink>
              </li>
            </>
          ) : (
            <li>
              <NavLink to="/landlord/login">Login</NavLink>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default LandlordNavbar;