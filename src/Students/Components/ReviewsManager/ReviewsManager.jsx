import React, { useState, useEffect } from "react";
import axios from "axios";

const ReviewsManager = ({ hostelId, studentToken }) => {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({ rating: "", comment: "" });
  const [editReviewId, setEditReviewId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`/hostels/${hostelId}`);
      setReviews(response.data.reviews || []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (editReviewId) {
        // Update review
        const response = await axios.patch(
          `/reviews/${editReviewId}`,
          formData,
          {
            headers: { Authorization: `Bearer ${studentToken}` },
          }
        );
        setReviews((prev) =>
          prev.map((review) =>
            review.id === editReviewId ? response.data : review
          )
        );
        setEditReviewId(null);
      } else {
        // Create new review
        const response = await axios.post(
          `/hostels/${hostelId}/reviews`,
          formData,
          {
            headers: { Authorization: `Bearer ${studentToken}` },
          }
        );
        setReviews((prev) => [response.data, ...prev]);
      }
      setFormData({ rating: "", comment: "" });
    } catch (error) {
      console.error("Error saving review:", error);
      setError("Failed to save review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (review) => {
    setFormData({ rating: review.rating, comment: review.comment });
    setEditReviewId(review.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      await axios.delete(`/reviews/${id}`, {
        headers: { Authorization: `Bearer ${studentToken}` },
      });
      setReviews((prev) => prev.filter((review) => review.id !== id));
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Reviews for Hostel</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label>Rating (1-5):</label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleInputChange}
            min="1"
            max="5"
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label>Comment:</label>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleInputChange}
            rows="3"
            required
          />
        </div>
        <button type="submit" disabled={loading} style={styles.button}>
          {editReviewId ? "Update Review" : "Submit Review"}
        </button>
        {error && <p style={styles.error}>{error}</p>}
      </form>

      <div style={styles.reviewsList}>
        {reviews.length === 0 ? (
          <p>No reviews yet. Be the first to review!</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} style={styles.reviewCard}>
              <h4>{review.student_name}</h4>
              <p>
                <strong>Rating:</strong> {review.rating}
              </p>
              <p>{review.comment}</p>
              <div>
                <button
                  onClick={() => handleEdit(review)}
                  style={styles.editBtn}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(review.id)}
                  style={styles.deleteBtn}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    background: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  form: {
    marginBottom: "20px",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  button: {
    padding: "10px 15px",
    background: "#063231",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
  reviewsList: {
    marginTop: "20px",
  },
  reviewCard: {
    background: "#fff",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
    marginBottom: "10px",
  },
  editBtn: {
    padding: "5px 10px",
    background: "#3328FE",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    marginRight: "5px",
  },
  deleteBtn: {
    padding: "5px 10px",
    background: "#EA5024",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
  },
};

export default ReviewsManager;
