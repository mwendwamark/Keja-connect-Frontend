import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { FaStar, FaRegStar, FaEdit, FaTrash } from 'react-icons/fa';

const ReviewsList = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id: hostelId } = useParams(); // Using id from params to match your routes
  
  // Get auth data from localStorage
  const token = localStorage.getItem("token");
  const userJson = localStorage.getItem("user");
  const user = userJson ? JSON.parse(userJson) : null;
  const studentId = user ? user.id : null;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Use the correct API endpoint
        const response = await axios.get(`http://localhost:3000/hostels/${hostelId}/reviews`, {
          headers: token ? { 'Authorization': `Bearer ${token}` } : {}
        });
        setReviews(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error loading reviews:', err);
        setError('Failed to load reviews');
        setLoading(false);
      }
    };

    fetchReviews();
  }, [hostelId, token]);

  const handleDelete = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await axios.delete(`http://localhost:3000/reviews/${reviewId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setReviews(reviews.filter(review => review.id !== reviewId));
      } catch (err) {
        console.error('Error deleting review:', err);
        setError('Failed to delete review');
      }
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? 
          <FaStar key={i} className="star filled" /> : 
          <FaRegStar key={i} className="star empty" />
      );
    }
    return stars;
  };

  if (loading) return <div>Loading reviews...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="reviews-container">
      <h2>Reviews</h2>
      
      {studentId && (
        <Link to={`/write-review?hostelId=${hostelId}`} className="add-review-button">
          Write a Review
        </Link>
      )}
      
      {reviews.length === 0 ? (
        <p>No reviews yet. Be the first to review this hostel!</p>
      ) : (
        <div className="reviews-list">
          {reviews.map(review => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <div className="review-author">{review.student.name}</div>
                <div className="review-date">
                  {new Date(review.created_at).toLocaleDateString()}
                </div>
              </div>
              
              <div className="review-rating">
                {renderStars(review.rating)}
              </div>
              
              <div className="review-comment">
                {review.comment}
              </div>
              
              {studentId === review.student.id && (
                <div className="review-actions">
                  <Link to={`/reviews/${review.id}/edit`} className="edit-button">
                    <FaEdit /> Edit
                  </Link>
                  <button 
                    onClick={() => handleDelete(review.id)} 
                    className="delete-button"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewsList;