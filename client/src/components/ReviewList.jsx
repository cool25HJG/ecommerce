// ReviewList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StarRating from './StarRating';

function ReviewList({ productId, refreshKey }) {
  const [reviews, setReviews] = useState([]);
  const [showReviews, setShowReviews] = useState(false);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/review/products/${productId}/reviews`);
      setReviews(response.data);
    } catch (error) {
      console.log("Error fetching reviews", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId, refreshKey]);

  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  return (
    <div>
      <StarRating rating={getAverageRating()} totalReviews={reviews.length} />
      <button onClick={() => setShowReviews(!showReviews)}>
        {showReviews ? "Hide Reviews" : "Show Reviews"}
      </button>
      {showReviews && reviews.map((review) => (
        <div key={review.id} className="review-card">
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} style={{ color: star <= review.rating ? "gold" : "gray" }}>
                &#9733;
              </span>
            ))}
          </div>
          <p>{review.comment}</p>
        </div>
      ))}
    </div>
  );
}

export default ReviewList;