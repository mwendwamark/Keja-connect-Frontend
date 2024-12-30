import React from "react";
import { NavLink } from "react-router-dom";
import './StudentNavbar.css'
import logo from "../../assets/logo4.png"

const StudentNavbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  
  return (
    <nav className="student-navbar">
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
                Welcome,{" "}
                <NavLink to="/student-profile">{user.first_name}!</NavLink>
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
