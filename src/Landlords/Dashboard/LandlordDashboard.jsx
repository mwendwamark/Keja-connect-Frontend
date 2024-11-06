import React from "react";
import LandlordNavbar from "../LandlordNavbar/LandlordNavbar";
import CreateHostel from "../Components/CreateHostel";
import Sidebar from "../Components/Sidebar/Sidebar";

const LandlordDashboard = () => {
  return (
    <>
      <div>
        {/* <LandlordNavbar/>
        <h1>Welcome to the dashboard</h1>
        <CreateHostel/> */}
        <Sidebar/>
      </div>
    </>
  );
};

export default LandlordDashboard;