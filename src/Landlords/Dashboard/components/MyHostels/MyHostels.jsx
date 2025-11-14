// src/components/MyHostels/MyHostels.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../../config/api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import "./MyHostels.css"; // We will create this CSS file

const MyHostels = () => {
  const navigate = useNavigate();
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState({ show: false, hostelId: null });

  useEffect(() => {
    fetchLandlordHostels();
  }, []);

  const fetchLandlordHostels = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("landlordToken");
      const landlordId = localStorage.getItem("landlord_id");

      if (!token) {
        toast.error("You are not logged in");
        setError("You are not logged in.");
        setLoading(false);
        return;
      }

      const response = await axios.get(
        `${API_BASE_URL}/hostels`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const landlordHostels = response.data.filter(hostel =>
        hostel.landlord_id === parseInt(landlordId) ||
        hostel.landlord_id === landlordId
      );

      setHostels(landlordHostels);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching landlord hostels:", err);
      setError("Failed to load your hostels.");
      setLoading(false);
      toast.error("Failed to load hostels");
    }
  };

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
    return <div className="loading-spinner">Loading your hostels...</div>;
  }

  if (error) {
    return <div className="error-message" style={{color: 'red'}}>{error}</div>;
  }

  return (
    <>
      <div id="hostels" className="my-hostels-section">
        <div className="section-header">
          <h2>My Hostels</h2>
          <button
            className="add-hostel-btn"
            onClick={() => navigate("/landlord/dashboard/get_started")}
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
      <ToastContainer />
    </>
  );
};

export default MyHostels;