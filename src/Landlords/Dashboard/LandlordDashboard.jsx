import React from "react";
import "./LandlordDashboard.css";
import Sidebar from "../Components/Sidebar/Sidebar";
import MiniNavbar from "../Components/MiniNavbar.jsx/MiniNavbar";

const LandlordDashboard = () => {
  return (
    <>
      <div className="content-wrapper">
        <div className="landlord-container">
          <Sidebar />
          {/* <div className="dashboard-body">
            <MiniNavbar />
            <div className="mainContent"></div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default LandlordDashboard;
