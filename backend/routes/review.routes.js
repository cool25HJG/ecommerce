const express = require('express');
const { Review } = require('../models');

const router = express.Router();

// Create a new review
router.post('/reviews', async (req, res) => {
  const { rating, comment, productId, userId } = req.body;

  if (!productId || !userId) {
    return res.status(400).json({ error: "Product ID and User ID are required" });
  }

  try {
    const review = await Review.create({ rating, comment, productId, userId });
    res.status(201).json(review); // Respond with the created review
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get reviews for a product
router.get('/products/:productId/reviews', async (req, res) => {
  try {
    const reviews = await Review.findAll({ where: { productId: req.params.productId } });
    res.status(200).json(reviews);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;