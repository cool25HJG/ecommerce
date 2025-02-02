// ReviewForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function ReviewForm({ productId, onReviewSubmitted }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
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
      toast.error('Please log in to submit a review');
      setIsSubmitting(false);
      return;
    }

    if (rating === 0) {
      setError('Please select a rating');
      toast.warning('Please select a rating');
      setIsSubmitting(false);
      return;
    }

    if (!comment.trim()) {
      setError('Please write a review');
      toast.warning('Please write a review');
      setIsSubmitting(false);
      return;
    }

    try {
      const reviewData = {
        productId: productId,
        userId: user.id,
        rating,
        comment: comment.trim()
      };

      const response = await axios.post(
        `${import.meta.env.VITE_HOST}/api/review/reviews`, 
        reviewData
      );

      if (response.status === 201 || response.status === 200) {
        setComment('');
        setShowForm(false);
        toast.success('Review submitted successfully!');
        if (onReviewSubmitted) {
          onReviewSubmitted();
        }
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      if (error.response?.status === 400) {
        setError('You have already reviewed this product');
        toast.error('You have already reviewed this product');
      } else {
        setError('Failed to submit review. Please try again.');
        toast.error('Failed to submit review. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="review-login-message">
        <p>Please log in to submit a review.</p>
      </div>
    );
  }

  return (
    <div className="review-component">
      <button 
        onClick={() => setShowForm(!showForm)} 
        className='review-button'
        disabled={isSubmitting}
      >
        {showForm ? "Cancel Review" : "Leave a Review"}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="review-form-container">
          <h3>Leave a Review</h3>
          
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => handleRatingClick(star)}
                style={{ 
                  cursor: "pointer", 
                  color: star <= rating ? "gold" : "gray",
                  fontSize: "24px",
                  padding: "0 2px"
                }}
              >
                &#9733;
              </span>
            ))}
          </div>

          {error && <div className="error-message">{error}</div>}

          <textarea
            className='review-textarea'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review here..."
            disabled={isSubmitting}
            required
          />

          <div className="review-submit-container">
            <button 
              type="submit" 
              className="submit-review-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default ReviewForm;