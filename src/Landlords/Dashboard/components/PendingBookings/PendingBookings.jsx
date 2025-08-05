import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../../config/api";
import "./PendingBookings.css";

const PendingBookings = () => {
  const [pendingBookings, setPendingBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState({});

  useEffect(() => {
    const fetchPendingBookings = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("landlordToken");
        const response = await axios.get(
          `${API_BASE_URL}/api/landlords/pending_bookings`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        setPendingBookings(response.data);
      } catch (err) {
        setError("Failed to fetch pending bookings");
      } finally {
        setLoading(false);
      }
    };
    fetchPendingBookings();
  }, []);

  const handleAction = async (bookingId, action) => {
    setActionLoading((prev) => ({ ...prev, [bookingId]: true }));
    try {
      const token = localStorage.getItem("landlordToken");
      await axios.patch(
        `${API_BASE_URL}/api/bookings/${bookingId}/${action}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPendingBookings((prev) => prev.filter((b) => b.id !== bookingId));
    } catch (err) {
      alert(`Failed to ${action} booking.`);
    } finally {
      setActionLoading((prev) => ({ ...prev, [bookingId]: false }));
    }
  };

  if (loading) return <div>Loading pending bookings...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (pendingBookings.length === 0) return <div>No pending bookings.</div>;

  return (
    <div className="pending-bookings-section">
      <h2>Pending Bookings</h2>
      <table className="pending-bookings-table">
        <thead>
          <tr>
            <th>Student</th>
            <th>Email</th>
            <th>Hostel</th>
            <th>Location</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pendingBookings.map((booking) => (
            <tr key={booking.id}>
              <td>{`${booking.student.first_name} ${booking.student.last_name}`}</td>
              <td>{booking.student.email}</td>
              <td>{booking.hostel.name}</td>
              <td>{booking.hostel.location}</td>
              <td>{booking.start_date}</td>
              <td>{booking.end_date || "-"}</td>
              <td>
                <button
                  onClick={() => handleAction(booking.id, "approve")}
                  disabled={actionLoading[booking.id]}
                  style={{ marginRight: 8, background: '#4caf50', color: 'white', border: 'none', borderRadius: 4, padding: '0.4rem 0.7rem' }}
                >
                  {actionLoading[booking.id] === "approve" ? "Approving..." : "Approve"}
                </button>
                <button
                  onClick={() => handleAction(booking.id, "reject")}
                  disabled={actionLoading[booking.id]}
                  style={{ background: '#f44336', color: 'white', border: 'none', borderRadius: 4, padding: '0.4rem 0.7rem' }}
                >
                  {actionLoading[booking.id] === "reject" ? "Rejecting..." : "Reject"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PendingBookings;
