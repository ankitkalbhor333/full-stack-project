import React, { useState } from "react";

const StarRating = ({ totalStars = 5 }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);

  return (
    <div>
      {[...Array(totalStars)].map((_, index) => {
        const currentRating = index + 1;
        return (
          <span
            key={index}
            className="star"
            style={{
              cursor: "pointer",
              fontSize: "2rem",
              color: currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9",
            }}
            onClick={() => setRating(currentRating)}
            onMouseEnter={() => setHover(currentRating)}
            onMouseLeave={() => setHover(null)}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
