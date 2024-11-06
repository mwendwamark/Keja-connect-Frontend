import React from "react";
import "./MiniNavbar.css";
import { IoSearchOutline } from "react-icons/io5";

const MiniNavbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  // Get today's date and format it
  const today = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = today.toLocaleDateString(undefined, options);

  return (
    <div className="mini-navbar">
      <div className="mini-navbar-contents">
        <div className="mini-navbar-title">
          <h3>Personalized Dashboard</h3>
        </div>

        <div className="mini-navbar-search-bar">
          <input
            type="text"
            placeholder="Search..."
            className="mini-navbar-input"
          />
          <IoSearchOutline className="search-icon" />
        </div>

        <div className="mini-navbar-date">
          <p>{formattedDate}</p>
        </div>

        <div className="mini-navbar-welcome-message">
          <p>Welcome, {user.first_name}</p>
        </div>
      </div>
    </div>
  );
};

export default MiniNavbar;
