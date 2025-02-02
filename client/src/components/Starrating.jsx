import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const StarRating = ({ rating, totalReviews }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div style={styles.container}>
      {/* Full Stars */}
      {[...Array(fullStars)].map((_, index) => (
        <FaStar key={index} style={styles.star} />
      ))}

      {/* Half Star */}
      {hasHalfStar && <FaStarHalfAlt style={styles.star} />}

      {/* Empty Stars */}
      {[...Array(emptyStars)].map((_, index) => (
        <FaRegStar key={index} style={styles.star} />
      ))}

      {/* Review Count */}
      <span style={styles.reviewCount}>({totalReviews})</span>
    </div>
  );
};

// CSS Styles
const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    fontSize: "24px",
    color: "orange",
  },
  star: {
    marginRight: "4px",
  },
  reviewCount: {
    marginLeft: "8px",
    fontSize: "20px",
    color: "gray",
  },
};

export default StarRating;
