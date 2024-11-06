import React, { useState} from "react";
import "./Sidebar.css";
import logo from "../../../assets/logo3.png";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faList,
  faBook,
  faDashboard,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate ()

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/landlord/login");
  };

  return (
    <>
      <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <div className="sidebar-contents">
          {/* Logo Section */}
          <div className="sidebar-logo">
            <NavLink to="/landlord/dashboard">
              <img src={logo} alt="logo" />
            </NavLink>
          </div>
          <hr className="sidebar-divider" />

          {/* Navigation Links */}
          <ul className="sidebar-links">
            <li>
              <NavLink to="/landlord/dashboard">
                <MdDashboard icon={faDashboard} className="sidebar-icon" />
                {!collapsed && "Dashboard"}
              </NavLink>
            </li>
            <li>
              <NavLink to="/landlord/addhostel">
                <FontAwesomeIcon icon={faPlus} className="sidebar-icon" />
                {!collapsed && "Add Hostel"}
              </NavLink>
            </li>
            <li>
              <NavLink to="/">
                <FontAwesomeIcon icon={faList} className="sidebar-icon" />
                {!collapsed && "Current Listings"}
              </NavLink>
            </li>
            <li>
              <NavLink to="/">
                <FontAwesomeIcon icon={faBook} className="sidebar-icon" />
                {!collapsed && "Booked Hostels"}
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="sidebar-user-profile">
          <NavLink to="/landlord-profile">
            <FontAwesomeIcon
              icon={faUserCircle}
              className="profile-sidebar-icon"
            />
            {!collapsed && `${user.first_name} ${user.last_name}`}
          </NavLink>
          <div className="sidebar-logout">
            <button onClick={handleLogout}>
              {collapsed ? <FaSignOutAlt /> : "Logout"}
            </button>
          </div>
        </div>

        {/* Collapse/Expand Button */}
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          {collapsed ? <FaAnglesRight /> : <FaAnglesLeft />}
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
