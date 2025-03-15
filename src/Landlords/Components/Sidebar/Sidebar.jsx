import React from "react";
import "./Sidebar.css";
import logo from "../../../assets/logo4.png";
import { NavLink, useNavigate } from "react-router-dom";
import { IoMdSpeedometer } from "react-icons/io";
import { MdOutlineAddBusiness } from "react-icons/md";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { SiTicktick } from "react-icons/si";
import { CgProfile } from "react-icons/cg";
import { BsQuestionCircle } from "react-icons/bs";
import { FaQuestionCircle } from "react-icons/fa";
import { AiTwotoneHome } from "react-icons/ai";

const Sidebar = () => {
  return (
    <div className="sidebar grid">
      <div className="logoDiv flex">
        <img src={logo} alt="Image Name" loading="lazy"/>
      </div>
      <div className="menuDiv">
        <div className="divTitle">
          <h3>QUICK MENU</h3>
          <ul className="menuLists grid">
            <li className="listItem">
              <NavLink to="/landlord/dashboard" className="menuLink flex">
                <IoMdSpeedometer className="dash-icon" />{" "}
                <span className="smallText">Dashboard</span>
              </NavLink>
            </li>{" "}
            <li className="listItem">
              <NavLink to="/get-started" className="menuLink flex">
                <MdOutlineAddBusiness className="dash-icon" />{" "}
                <span className="smallText">Add Hostel</span>
              </NavLink>
            </li>{" "}
            <li className="listItem">
              <NavLink to="/" className="menuLink flex">
                <HiOutlineClipboardDocumentList className="dash-icon" />{" "}
                <span className="smallText">Current Listing</span>
              </NavLink>
            </li>{" "}
            <li className="listItem">
              <NavLink to="/" className="menuLink flex">
                <SiTicktick className="dash-icon" />{" "}
                <span className="smallText">Booked Hostels</span>
              </NavLink>
            </li>{" "}
          </ul>
        </div>
      </div>
      <div className="settingsDiv">
        <div className="divTitle">
          <h3>SETTINGS</h3>
          <ul className="menuLists grid">
            <li className="listItem">
              <NavLink to="/landlord-profile" className="menuLink flex">
                <CgProfile className="dash-icon" />{" "}
                <span className="smallText">Profile</span>
              </NavLink>
            </li>
            <li className="listItem">
              <NavLink to="/faqs" className="menuLink flex">
                <FaQuestionCircle className="dash-icon" />{" "}
                <span className="smallText">FAQs</span>
              </NavLink>
            </li>
            <li className="listItem">
              <NavLink to="/" className="menuLink flex">
                <AiTwotoneHome className="dash-icon" />{" "}
                <span className="smallText">Home</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="sideBarCard">
        <BsQuestionCircle className="dash-icon" />
        <div className="cardContent">
          <div className="circle1"></div>
          <div className="circle2"></div>

          <h3>Help Center</h3>
          <p>
            Having trouble in Keja Connect, please contact us for more
            information
          </p>
          <button className="btn">Go to help center</button>
        </div>
      </div>{" "}
    </div>
  );
};

export default Sidebar;
