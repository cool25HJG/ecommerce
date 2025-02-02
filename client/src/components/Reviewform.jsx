import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { CartContext } from './CartContext';

function ReviewForm({ productId, onReviewSubmitted }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  
  const { user } = useContext(CartContext) || {};   

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
        `${import.meta.env.VITE_HOST}/api/review/reviews`, 
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
      alert('Error submitting review!');
    }
    setShowForm(false); 
    setIsSubmitting(false);
  };

  return (
    <div>
      <button onClick={() => setShowForm(!showForm)} className='review-button'>
        {showForm ? 'Cancel Review' : 'Leave a Review'}
      </button>
      {showForm && (
        <form onSubmit={handleSubmit} className="review-form-container">
          <h3>Leave a Review</h3>
          {error && <p className="error-message">{error}</p>} {/* Display error message */}
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => handleRatingClick(star)}
                style={{ cursor: 'pointer', color: star <= rating ? 'gold' : 'gray' }}
              >
                &#9733;
              </span>
            ))}
          </div>
          <textarea
            className='review-textarea'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review here..."
          />
          <div className="review-submit-container">
            <button type="submit" className="submit-review-button" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default ReviewForm;
