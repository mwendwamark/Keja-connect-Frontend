import React from "react";
import { NavLink } from "react-router-dom";
import "./LandlordNavbar.css";
import logo from "../../assets/logo4.png";

const LandlordNavbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".landlord-navbar");
    // When the scroll is higher than the 560 viewport height, add the "scroll-navbar" class to the tag with the "navbar" class
    if (this.scrollY >= 105) navbar.classList.add("scroll-navbar");
    else navbar.classList.remove("scroll-navbar");
  });

  return (
    <div className="landlord-navbar">
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
                Welcome,
                <NavLink to="/landlord-profile"> {user.first_name}!</NavLink>
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
