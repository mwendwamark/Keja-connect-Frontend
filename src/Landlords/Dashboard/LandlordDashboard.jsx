import React from "react";
import "./LandlordDashboard.css";
import Sidebar from "../Components/Sidebar/Sidebar";
import MiniNavbar from "../Components/MiniNavbar.jsx/MiniNavbar";
import { FaHome, FaUsers, FaMoneyBillWave, FaBed } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
// import DashboardLayout from "./DashboardLayout";

const LandlordDashboard = () => {
  // Sample data - replace with actual data from your backend
  const dashboardStats = {
    totalHostels: 5,
    totalTenants: 120,
    occupancyRate: "85%",
    monthlyRevenue: "KES 250,000",
  };

  return (
    <>
      <div className="content-wrapper">
        <div className="landlord-container">
          <Sidebar />
          <div className="dashboard-body">
            <div className="dashboard-main">
              
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">
                    <FaHome />
                  </div>
                  <div className="stat-info">
                    <h3>Total Hostels</h3>
                    <p>{dashboardStats.totalHostels}</p>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">
                    <FaUsers />
                  </div>
                  <div className="stat-info">
                    <h3>Total Tenants</h3>
                    <p>{dashboardStats.totalTenants}</p>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">
                    <FaBed />
                  </div>
                  <div className="stat-info">
                    <h3>Occupancy Rate</h3>
                    <p>{dashboardStats.occupancyRate}</p>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">
                    <FaMoneyBillWave />
                  </div>
                  <div className="stat-info">
                    <h3>Monthly Revenue</h3>
                    <p>{dashboardStats.monthlyRevenue}</p>
                  </div>
                </div>
              </div>

              <div className="dashboard-sections">
                <div className="recent-activities">
                  <h2>Recent Activities</h2>
                  <div className="activity-list">
                    <div className="activity-item">
                      <p>New tenant registered - Room 204</p>
                      <span>2 hours ago</span>
                    </div>
                    <div className="activity-item">
                      <p>Rent payment received - Room 156</p>
                      <span>5 hours ago</span>
                    </div>
                    <div className="activity-item">
                      <p>Maintenance request - Room 301</p>
                      <span>1 day ago</span>
                    </div>
                  </div>
                </div>

                <div className="occupancy-summary">
                  <h2>Occupancy Summary</h2>
                  <div className="occupancy-stats">
                    <div className="occupancy-item">
                      <h4>Available Rooms</h4>
                      <p>15</p>
                    </div>
                    <div className="occupancy-item">
                      <h4>Occupied Rooms</h4>
                      <p>85</p>
                    </div>
                    <div className="occupancy-item">
                      <h4>Pending Maintenance</h4>
                      <p>3</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </>
  );
};

export default LandlordDashboard;
