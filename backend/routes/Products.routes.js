const express = require("express");
const Router = express.Router();
const { Review, Products } = require('../models/index');
const {
  getAllProducts,
  addProducts,
  updateProducts,
  toggleFavorite,
  getFavoriteProducts,
  deleteProducts,
} = require("../controller/products.controller");

Router.get("/", getAllProducts);
Router.post("/", addProducts);
Router.put("/:id", updateProducts);
Router.put("/toggle-favorite/:id", toggleFavorite); // Add this route
Router.get("/favorites", getFavoriteProducts); // Add this route
Router.delete("/:id", deleteProducts);

Router.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Products.findByPk(id, {
      include: [
        {
          model: Review,
          attributes: ['rating', 'comment'],
        }
      ]
    });

    const reviews = product.Reviews;
    const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length || 0;
    const totalReviews = reviews.length;

    res.json({
      ...product.toJSON(),
      averageRating,
      totalReviews,
      reviews,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = Router;