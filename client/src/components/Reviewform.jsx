// ReviewForm.js
import React, { useState } from 'react';
import axios from 'axios';

function ReviewForm({ productId, onReviewSubmitted }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating < 1 || rating > 5) {
      alert("Rating must be between 1 and 5!");
      return;
    }

    try {
      await axios.post(import.meta.env.VITE_HOST+"/api/review/reviews", {
        rating,
        comment,
        productId, // Ensure productId is included here
        userId: 1, // Replace with actual logged-in user ID
      });
      alert("Review submitted successfully!");
      onReviewSubmitted(); // Trigger re-fetch of reviews
    } catch (error) {
      console.error("Error submitting review:", error); // Debugging line
      alert("Error submitting review!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Leave a Review</h3>
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => handleRatingClick(star)}
            style={{ cursor: "pointer", color: star <= rating ? "gold" : "gray" }}
          >
            &#9733;
          </span>
        ))}
      </div>
      <textarea className='review-form'
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your review here..."
      />
      <button  className='submit-review-button'type="submit">Submit Review</button>
    </form>
  );
}

export default ReviewForm;