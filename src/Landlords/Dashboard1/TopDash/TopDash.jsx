import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./TopDash.css";

const TopDash = () => {
  const location = useLocation();
  const [pageInfo, setPageInfo] = useState({
    title: "Dashboard",
    description:
      "Welcome back! Here's what's happening with your properties today.",
  });

  useEffect(() => {
    // Update page info based on current route
    const path = location.pathname;

    if (path === "/landlord/dashboard") {
      setPageInfo({
        title: "Dashboard",
        description:
          "Welcome back! Here's what's happening with your properties today.",
      });
    } else if (path.includes("/my_hostels")) {
      setPageInfo({
        title: "My Hostels",
        description: "Manage and view all your listed properties.",
      });
    } else if (path.includes("/add_hostels")) {
      setPageInfo({
        title: "Add Hostels",
        description: "List a new property for students to book.",
      });
    } else if (path.includes("/booked_hostels")) {
      setPageInfo({
        title: "Booked Hostels",
        description: "View all your booked properties and manage bookings.",
      });
    } else if (path.includes("/recent_activities")) {
      setPageInfo({
        title: "Recent Activities",
        description:
          "Track all recent activities and updates on your properties.",
      });
    } else if (path.includes("/profile")) {
      setPageInfo({
        title: "Profile",
        description: "Manage your account settings and personal information.",
      });
    }
  }, [location.pathname]);

  return (
    <div className="topdash-container">
      <h1 className="topdash-title">{pageInfo.title}</h1>
      <p className="topdash-description">{pageInfo.description}</p>
    </div>
  );
};

export default TopDash;
