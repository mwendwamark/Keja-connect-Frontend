import React, { useState } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import logo from "../../assets/logo4.png";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);

  function handleShowNavbar() {
    setShowNavbar(!showNavbar);
  }

  return (
    <nav className="navbar">
      <div className="navbar-container container">
        <div className="logo-section">
          <NavLink to="/">
            <img src={logo} alt="" />
          </NavLink>
        </div>

        <div className={`nav-elements ${showNavbar && "active"}`}>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>{" "}
            <li>
              <NavLink to="/about">About</NavLink>
            </li>{" "}
            <li>
              <NavLink to="/faqs">FAQs</NavLink>
            </li>{" "}
            <li>
              <NavLink to="/contacts">Contacts</NavLink>
            </li>{" "}
          </ul>
        </div>
        <div className="nav-login">
          <ul>
            <li>
              <NavLink className="nav-login-btn" to="/role-selection">
                Login
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          {showNavbar ? <IoMdClose /> : <IoMdMenu />}{" "}
          {/* Show close icon when navbar is open */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
