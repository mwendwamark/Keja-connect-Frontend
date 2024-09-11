import React from "react";
import { NavLink } from "react-router-dom";

const StudentNavbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="logo">
          My Platform
        </NavLink>
        <ul className="navbar-links">
          {user && (
            <li className="navbar-username">Welcome, {user.first_name}!</li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default StudentNavbar;
