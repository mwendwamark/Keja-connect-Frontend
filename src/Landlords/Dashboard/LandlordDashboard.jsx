import React, { useState, useEffect } from "react";
import "./LandlordDashboard.css";
import Sidebar from "./components/Sidebar/Sidebar";
import { FaHome, FaUsers, FaMoneyBillWave, FaBed, FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { API_BASE_URL, API_ENDPOINTS } from "../../config/api";
import PendingBookings from "./components/PendingBookings";
import { useNavigate } from "react-router-dom";

const LandlordDashboard = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState({
    totalHostels: 0,
    totalTenants: 0,
    occupancyRate: "0%",
    monthlyRevenue: "KES 0",
    recentActivities: [],
    recentReviews: [],
    availableHostels: 0,
    occupiedHostels: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hostels, setHostels] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState({ show: false, hostelId: null });

  useEffect(() => {
    // Fetch both dashboard data and hostels data
    const fetchData = async () => {
      await fetchDashboardData();
      await fetchLandlordHostels();
    };
    
    fetchData();
  }, []);

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
          totalTenants: response.data.occupied_hostels, // Now using occupied_hostels instead of total_tenants
          occupancyRate: response.data.occupancy_rate,
          monthlyRevenue: response.data.monthly_revenue,
          recentActivities: response.data.recent_activities || [],
          recentReviews: response.data.recent_reviews || [],
          availableHostels: response.data.available_hostels,
          occupiedHostels: response.data.occupied_hostels
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data. Please try again later.");
        setLoading(false);
        toast.error("Failed to load dashboard data");
      }
    };

  // Fetch landlord's hostels
  const fetchLandlordHostels = async () => {
    try {
      const token = localStorage.getItem("landlordToken");
      const landlordId = localStorage.getItem("landlord_id");
      
      if (!token) {
        toast.error("You are not logged in");
        return;
      }

      // Fetch all hostels
      const response = await axios.get(
        `${API_BASE_URL}/hostels`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Filter hostels to only show those belonging to the current landlord
      const landlordHostels = response.data.filter(hostel => 
        hostel.landlord_id === parseInt(landlordId) || 
        hostel.landlord_id === landlordId
      );
      
      console.log('Landlord ID:', landlordId);
      console.log('All hostels:', response.data);
      console.log('Filtered hostels:', landlordHostels);

      setHostels(landlordHostels);
    } catch (err) {
      console.error("Error fetching landlord hostels:", err);
      toast.error("Failed to load hostels");
    }
  };

  // Handle view, update and delete actions
  const handleViewHostel = (hostelId) => {
    navigate(`/hostels/${hostelId}`);
  };

  const handleUpdateHostel = (hostelId) => {
    navigate(`/landlord/hostels/${hostelId}/update`);
  };

  const showDeleteConfirmation = (hostelId) => {
    setDeleteConfirmation({ show: true, hostelId });
  };

  const hideDeleteConfirmation = () => {
    setDeleteConfirmation({ show: false, hostelId: null });
  };

  const handleDeleteHostel = async () => {
    try {
      const token = localStorage.getItem("landlordToken");
      
      if (!token) {
        toast.error("You are not logged in");
        return;
      }

      await axios.delete(
        `${API_BASE_URL}/hostels/${deleteConfirmation.hostelId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Remove the deleted hostel from the state
      setHostels(hostels.filter(hostel => hostel.id !== deleteConfirmation.hostelId));
      toast.success("Hostel deleted successfully");
      hideDeleteConfirmation();
    } catch (err) {
      console.error("Error deleting hostel:", err);
      toast.error("Failed to delete hostel");
      hideDeleteConfirmation();
    }
  };

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
              {/* Pending Bookings Section */}
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
              
              {/* My Hostels Section */}
              <div id="hostels" className="my-hostels-section">
                <div className="section-header">
                  <h2>My Hostels</h2>
                  <button 
                    className="add-hostel-btn"
                    onClick={() => navigate("/get-started")}
                  >
                    Add New Hostel
                  </button>
                </div>

                {hostels.length === 0 ? (
                  <div className="no-hostels">
                    <p>You haven't added any hostels yet.</p>
                    <button 
                      className="add-hostel-btn"
                      onClick={() => navigate("/get-started")}
                    >
                      Add Your First Hostel
                    </button>
                  </div>
                ) : (
                  <div className="landlord-hostels-grid">
                    {hostels.map((hostel) => (
                      <div className="landlord-hostel-card" key={hostel.id}>
                        <div className="landlord-hostel-image">
                          <img 
                            src={hostel.image_urls && hostel.image_urls.length > 0 
                              ? hostel.image_urls[0] 
                              : "https://via.placeholder.com/300x200?text=No+Image"} 
                            alt={hostel.name} 
                          />
                        </div>
                        <div className="landlord-hostel-details">
                          <h3>{hostel.name}</h3>
                          <p className="location">{hostel.location}</p>
                          <p className="price">KES {hostel.price_per_month} / month</p>
                          {/* <div className="availability">
                            <span className={`status ${hostel.available_units > 0 ? 'available' : 'unavailable'}`}>
                              {hostel.available_units > 0 ? `${hostel.available_units} units available` : 'No units available'}
                            </span>
                          </div> */}
                        </div>
                        <div className="landlord-hostel-actions">
                          <button 
                            className="landlord-action-btn view-btn"
                            onClick={() => handleViewHostel(hostel.id)}
                            title="View Hostel"
                          >
                            <FaEye />
                          </button>
                          <button 
                            className="landlord-action-btn edit-btn"
                            onClick={() => handleUpdateHostel(hostel.id)}
                            title="Edit Hostel"
                          >
                            <FaEdit />
                          </button>
                          <button 
                            className="landlord-action-btn delete-btn"
                            onClick={() => showDeleteConfirmation(hostel.id)}
                            title="Delete Hostel"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmation.show && (
        <div className="delete-modal-overlay">
          <div className="delete-modal">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this hostel? This action cannot be undone.</p>
            <div className="delete-modal-actions">
              <button 
                className="cancel-btn"
                onClick={hideDeleteConfirmation}
              >
                Cancel
              </button>
              <button 
                className="delete-btn"
                onClick={handleDeleteHostel}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      
      <ToastContainer/>
    </>
  );
};

export default LandlordDashboard;
