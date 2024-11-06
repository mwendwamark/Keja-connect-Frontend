import React from "react";
import LandlordNavbar from "../LandlordNavbar/LandlordNavbar";
import CreateHostel from "../Components/CreateHostel";
import "./LandlordDashboard.css"
import Sidebar from "../Components/Sidebar/Sidebar";
import MiniNavbar from "../Components/MiniNavbar.jsx/MiniNavbar";

const LandlordDashboard = () => {
  return (
    <>
      <div className="landlord-dashboard">
        {/* <LandlordNavbar/>
        <h1>Welcome to the dashboard</h1>
        <CreateHostel/> */}
        <MiniNavbar/>
        <Sidebar/>
      </div>
    </>
  );
};

export default LandlordDashboard;