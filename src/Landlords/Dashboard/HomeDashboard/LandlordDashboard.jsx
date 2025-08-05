import React, { useState, useEffect } from "react";
import "./LandlordDashboard.css";
import DashboardLayout from "../components/Layout/DashboardLayout";
import { FaHome, FaUsers, FaMoneyBillWave, FaBed } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import axios from "axios";
import { API_BASE_URL } from "../../../config/api";
import PendingBookings from "../components/PendingBookings/PendingBookings";
import { NavLink, useNavigate } from "react-router-dom";

const LandlordDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalHostels: 0,
    totalTenants: 0,
    occupancyRate: "0%",
    monthlyRevenue: "KES 0",
    recentActivities: [],
    recentReviews: [],
    availableHostels: 0,
    occupiedHostels: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  const [hostels, setHostels] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    show: false,
    hostelId: null,
  });

  const getInitials = (user) => {
    if (!user) return "";
    const first = user.first_name
      ? user.first_name.charAt(0).toUpperCase()
      : "";
    const last = user.last_name ? user.last_name.charAt(0).toUpperCase() : "";
    return first + last;
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchDashboardData();
      // await fetchLandlordHostels(); // Uncomment if you re-enable hostel fetching
    };

    fetchData();

    // Set up interval to update current time every second
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Still update every second to ensure the minute changes promptly

    // Clean up the interval on component unmount
    return () => clearInterval(timer);
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("landlordToken");

      if (!token) {
        setError(
          "You are not logged in. Please log in to view your dashboard."
        );
        setLoading(false);
        return;
      }

      const response = await axios.get(
        `${API_BASE_URL}/api/landlords/dashboard`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDashboardData({
        totalHostels: response.data.total_hostels,
        totalTenants: response.data.occupied_hostels,
        occupancyRate: response.data.occupancy_rate,
        monthlyRevenue: response.data.monthly_revenue,
        recentActivities: response.data.recent_activities || [],
        recentReviews: response.data.recent_reviews || [],
        availableHostels: response.data.available_hostels,
        occupiedHostels: response.data.occupied_hostels,
      });
      setLoading(false);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Failed to load dashboard data. Please try again later.");
      setLoading(false);
      toast.error("Failed to load dashboard data");
    }
  };


  return (
    <DashboardLayout>
      <div className="landlord-dashboard_home dashboard-body">
        <div className="dashboard-main-content">
          <div className="dashboard-navbar">
            <div className="current-datetime">
              {currentDateTime
                .toLocaleDateString("en-US", {
                  weekday: "long", 
                  day: "numeric", 
                  month: "long", 
                  year: "numeric", 
                })
                .toUpperCase()}{" "}
            </div>

            <div className="dashboard-user_avatar">
              <ul className="dashboard_avatar">
                {user ? (
                  <>
                    <li className="dashboard-username">
                      <span>Welcome,</span>{" "}
                      <NavLink to="/landlord-profile">
                        {getInitials(user)}
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <li>
                    <NavLink to="/landlord/login">Login</NavLink>
                  </li>
                )}
              </ul>
            </div>
          </div>
          <div className="dashboard-main-loader">
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

            <div className="add-more-hostels">
              <h2>Add more hostels</h2>
              <button>Add Hostel</button>
            </div>

            <div className="dashboard-sections">
              <div className="recent-activities">
                <h2>Recent Activities</h2>
                <div className="activity-list">
                  {dashboardData.recentActivities &&
                  dashboardData.recentActivities.length > 0 ? (
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
                    <h4>Available Hostels</h4>
                    <p>{dashboardData.availableHostels}</p>
                  </div>
                  <div className="occupancy-item">
                    <h4>Occupied Hostels</h4>
                    <p>{dashboardData.occupiedHostels}</p>
                  </div>
                  <div className="occupancy-item">
                    <h4>Occupancy Rate</h4>
                    <p>{dashboardData.occupancyRate}</p>
                  </div>
                </div>
              </div>
            </div>
            <PendingBookings />
          </div>
        </div>
      </div>

      <ToastContainer />
    </DashboardLayout>
  );
};

export default LandlordDashboard;
