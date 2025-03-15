import React from "react";
import { Star } from "lucide-react";
import "./RatingDisplay.css";

const RatingDisplay = ({ rating, reviewsCount = 0 }) => {
  // Convert rating to number and handle undefined/null cases
  const numericRating = Number(rating) || 0;
  
  // Generate stars based on rating
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(numericRating);
    const hasHalfStar = numericRating - fullStars >= 0.5;
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="star-filled" fill="gold" stroke="gold" size={16} />);
    }
    
    // Half star
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="half-star-container">
          <Star className="star-filled half" fill="gold" stroke="gold" size={16} />
          <Star className="star-empty half" stroke="gray" size={16} />
        </div>
      );
    }
    
    // Empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="star-empty" stroke="gray" size={16} />);
    }
    
    return stars;
  };

  return (
    <div className="rating-container">
      <div className="rating-stars">
        {renderStars()}
      </div>
      <div className="rating-text">
        <span className="rating-value">{numericRating.toFixed(1)}</span>
        <span className="review-count">
          ({reviewsCount} {reviewsCount === 1 ? "review" : "reviews"})
        </span>
      </div>
    </div>
  );
};

export default RatingDisplay;