import React from "react";
import LandlordNavbar from "../LandlordNavbar/LandlordNavbar";
import CreateHostel from "../Components/CreateHostel";

const LandlordDashboard = () => {
  return (
    <>
      <div>
        <LandlordNavbar/>
        <h1>Welcome to the dashboard</h1>
        <CreateHostel/>
      </div>
    </>
  );
};

export default LandlordDashboard;