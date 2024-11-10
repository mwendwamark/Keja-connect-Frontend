import React from "react";
import { NavLink } from "react-router-dom";
import "./LandlordNavbar.css";
import logo from "../../assets/logo4.png";

const LandlordNavbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

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
              <li>
                {/* <button className="logout-button" onClick={handleLogout}>
                  Logout
                </button> */}
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
