// ReviewForm.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { CartContext } from './CartContext';

function ReviewForm({ productId, onReviewSubmitted }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const handleRatingClick = (value) => {
    setRating(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    if (!user) {
      setError('Please log in to submit a review');
      setIsSubmitting(false);
      return;
    }

    try {
      const reviewData = {
        productId: productId,
        userId: user.id,
        rating,
        comment
      };

      const response = await axios.post(
        import.meta.env.VITE_HOST+"/api/review/reviews", 
        reviewData
      );

      if (response.status === 201 || response.status === 200) {
        setComment('');
        if (onReviewSubmitted) {
          onReviewSubmitted();
        }
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      if (error.response?.status === 400) {
        setError('You have already reviewed this product');
      } else {
        setError('Failed to submit review. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return <p>Please log in to submit a review.</p>;
  }

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