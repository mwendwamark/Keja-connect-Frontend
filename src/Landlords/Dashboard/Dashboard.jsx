import React from "react";
import DashboardLayout from "./components/Layout/DashboardLayout";
import PendingBookings from "./components/PendingBookings/PendingBookings";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <PendingBookings />
    </DashboardLayout>
  );
};

export default Dashboard;
