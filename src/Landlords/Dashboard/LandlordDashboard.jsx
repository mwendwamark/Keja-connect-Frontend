import React, { useState, useEffect } from "react";
import "./LandlordDashboard.css";
import Sidebar from "../Components/Sidebar/Sidebar";
import MiniNavbar from "../Components/MiniNavbar.jsx/MiniNavbar";
import { FaHome, FaUsers, FaMoneyBillWave, FaBed } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";

const LandlordDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalHostels: 0,
    totalTenants: 0,
    occupancyRate: "0%",
    monthlyRevenue: "KES 0",
    recentActivities: [],
    occupancySummary: {
      availableRooms: 0,
      occupiedRooms: 0,
      pendingMaintenance: 0
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Get the correct token from localStorage
        const token = localStorage.getItem("landlordToken");
        
        if (!token) {
          setError("You are not logged in. Please log in to view your dashboard.");
          setLoading(false);
          return;
        }

        // console.log("Using token:", token); // Debug log

        const response = await axios.get(
          `${API_BASE_URL}/api/landlords/dashboard`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        // console.log("Dashboard data response:", response.data); // Debug log
        setDashboardData({
          totalHostels: response.data.total_hostels,
          totalTenants: response.data.total_tenants,
          occupancyRate: response.data.occupancy_rate,
          monthlyRevenue: response.data.monthly_revenue,
          recentActivities: response.data.recent_activities || [],
          occupancySummary: {
            availableRooms: response.data.occupancy_summary.available_rooms,
            occupiedRooms: response.data.occupancy_summary.occupied_rooms,
            pendingMaintenance: response.data.occupancy_summary.pending_maintenance
          }
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data. Please try again later.");
        setLoading(false);
        toast.error("Failed to load dashboard data");
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="content-wrapper">
        <div className="landlord-container">
          <Sidebar />
          <div className="dashboard-body">
            <div className="dashboard-main">
              <div className="loading-spinner">Loading dashboard data...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="content-wrapper">
        <div className="landlord-container">
          <Sidebar />
          <div className="dashboard-body">
            <div className="dashboard-main">
              <div className="error-message">{error}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
                    <p>{dashboardData.totalHostels}</p>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">
                    <FaUsers />
                  </div>
                  <div className="stat-info">
                    <h3>Total Tenants</h3>
                    <p>{dashboardData.totalTenants}</p>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">
                    <FaBed />
                  </div>
                  <div className="stat-info">
                    <h3>Occupancy Rate</h3>
                    <p>{dashboardData.occupancyRate}</p>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">
                    <FaMoneyBillWave />
                  </div>
                  <div className="stat-info">
                    <h3>Monthly Revenue</h3>
                    <p>{dashboardData.monthlyRevenue}</p>
                  </div>
                </div>
              </div>

              <div className="dashboard-sections">
                <div className="recent-activities">
                  <h2>Recent Activities</h2>
                  <div className="activity-list">
                    {dashboardData.recentActivities && dashboardData.recentActivities.length > 0 ? (
                      dashboardData.recentActivities.map((activity, index) => (
                        <div className="activity-item" key={index}>
                          <p>{activity.message}</p>
                          <span>{activity.time_ago} ago</span>
                        </div>
                      ))
                    ) : (
                      <div className="activity-item">
                        <p>No recent activities</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="occupancy-summary">
                  <h2>Occupancy Summary</h2>
                  <div className="occupancy-stats">
                    <div className="occupancy-item">
                      <h4>Available Rooms</h4>
                      <p>{dashboardData.occupancySummary.availableRooms}</p>
                    </div>
                    <div className="occupancy-item">
                      <h4>Occupied Rooms</h4>
                      <p>{dashboardData.occupancySummary.occupiedRooms}</p>
                    </div>
                    <div className="occupancy-item">
                      <h4>Pending Maintenance</h4>
                      <p>{dashboardData.occupancySummary.pendingMaintenance}</p>
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
