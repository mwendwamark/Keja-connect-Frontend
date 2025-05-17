import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import StudentNavbar from "../StudentNavbar/StudentNavbar";
import "./ReviewsForm.css"; // Create this CSS file for styling

const ReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get hostelId from URL search params
  const queryParams = new URLSearchParams(location.search);
  const hostelId = queryParams.get("hostelId");
  
  // Get auth token from localStorage - FIXED TO MATCH LOGIN COMPONENT
  const token = localStorage.getItem("token");
  const userJson = localStorage.getItem("user");
  const user = userJson ? JSON.parse(userJson) : null;
  const studentId = user ? user.id : null;

  useEffect(() => {
    // Redirect if not logged in
    if (!token || !studentId) {
      navigate("/student/login", { 
        state: { from: location.pathname + location.search } 
      });
    }
    
    // Redirect if no hostelId is provided
    if (!hostelId) {
      setError("No hostel selected. Please select a hostel to review.");
    }
  }, [token, studentId, hostelId, navigate, location]);

  const handleRatingChange = (e) => {
    setRating(parseInt(e.target.value, 10));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      setError("Please select a rating");
      return;
    }
    
    if (comment.length < 10) {
      setError("Comment must be at least 10 characters long");
      return;
    }

    try {
      setLoading(true);
      setError("");
      
      // Updated to use the correct API endpoint
      const response = await axios.post(
        `http://localhost:3000/hostels/${hostelId}/reviews`,
        {
          review: {
            rating,
            comment
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (response.status === 201) {
        setSuccess(true);
        // Redirect back to hostel details after 2 seconds
        setTimeout(() => {
          navigate(`/hostels/${hostelId}`);
        }, 2000);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      setError(
        error.response?.data?.errors?.join(', ') || 
        error.response?.data?.error || 
        'An error occurred while submitting your review'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <StudentNavbar />
      <div className="review-form-container">
        <h2>Write a Review</h2>
        
        {success && (
          <div className="success-message">
            Your review has been submitted successfully! Redirecting...
          </div>
        )}
        
        {error && <div className="error-message">{error}</div>}
        
        {!success && (
          <form onSubmit={handleSubmit} className="review-form">
            <div className="form-group">
              <label htmlFor="rating">Rating:</label>
              <div className="rating-selector">
                {[1, 2, 3, 4, 5].map((value) => (
                  <div key={value} className="rating-option">
                    <input
                      type="radio"
                      id={`star${value}`}
                      name="rating"
                      value={value}
                      checked={rating === value}
                      onChange={handleRatingChange}
                    />
                    <label htmlFor={`star${value}`}>{value} Star{value !== 1 ? 's' : ''}</label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="comment">Your Review:</label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={5}
                placeholder="Share your experience with this hostel..."
                required
                minLength={10}
              />
              <small>{comment.length < 10 ? `At least ${10 - comment.length} more characters needed` : ''}</small>
            </div>
            
            <button 
              type="submit" 
              className="submit-review-button"
              disabled={loading || rating === 0 || comment.length < 10}
            >
              {loading ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default ReviewForm;