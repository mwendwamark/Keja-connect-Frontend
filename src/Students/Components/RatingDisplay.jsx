// import React from "react";
// import { Star } from "lucide-react";

// const RatingDisplay = ({ rating, reviewsCount = 0 }) => {
//   // Convert rating to number and handle undefined/null cases
//   const numericRating = Number(rating) || 0;

//   return (
//     <div className="flex items-center gap-2">
//       <div className="flex items-center">
//         <Star
//           className={`w-3 h-5 ${
//             numericRating > 0
              // "?" "fill-yellow-400 text-yellow-400"
//               : "text-gray-300"
//           }`}
//         />
//         <span className="ml-1 text-sm font-medium">
//           {numericRating.toFixed(1)}
//         </span>
//       </div>
//       <span className="text-sm text-gray-500">
//         ({reviewsCount} {reviewsCount === 1 ? "review" : "reviews"})
//       </span>
//     </div>
//   );
// };

// export default RatingDisplay;

import React from "react";
import { Star } from "lucide-react";
import "./RatingDisplay.css"; // Don't forget to create this CSS file

const RatingDisplay = ({ rating, reviewsCount = 0 }) => {
  // Convert rating to number and handle undefined/null cases
  const numericRating = Number(rating) || 0;

  return (
    <div className="rating-container">
      <div className="rating-star-container">
        <Star
          className={`rating-star ${numericRating > 0 ? "star-active" : "star-inactive"}`}
        />
        <span className="rating-value">
          {numericRating.toFixed(1)}
        </span>
      </div>
      <span className="review-count">
        ({reviewsCount} {reviewsCount === 1 ? "review" : "reviews"})
      </span>
    </div>
  );
};

export default RatingDisplay;