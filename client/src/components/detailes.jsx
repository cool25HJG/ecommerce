import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { CiHeart, CiShoppingCart } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { CartContext } from "./CartContext";
import ReviewList from './ReviewList';
import ReviewForm from './Reviewform';

function Detaile() {
  const navigate = useNavigate();
  const location = useLocation();
  const [product, setProduct] = useState(location.state?.product || null);
  const [loading, setLoading] = useState(!location.state?.product);
  const { addToCart, toggleFavorite, favorites } = useContext(CartContext);
  const [refreshKey, setRefreshKey] = useState(0);

  if (!product) {
    return null;
  }

  const isFavorite = favorites.some((fav) => fav.id === product.id);

  const handleClose = () => {
    navigate(-1);
  };

  const handleReviewSubmitted = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const getStockStatus = () => {
    if (product.stock > 0) {
      return <span className="stock-status-in">In Stock</span>;
    }
    return <span className="stock-status-out">Out of Stock</span>;
  };

  return (
    <div className="product-details-page">
      <div className="product-details-container">
        <div className="product-details-card">
          <button className="close-details-button" onClick={handleClose}>
            <IoMdClose size={24} />
          </button>
          <div className="product-details-content">
            <div className="product-details-image">
              <img src={product.imageUrl} alt="Product Image" />
            </div>
            <div className="product-details-info">
              <h2 className="product-details-title">{product.name}</h2>
              <p className="product-details-description">{product.description}</p>
              <h5 className="product-details-price">Price: {product.price}DT</h5>
              <div className="stock-status-container">
                {getStockStatus()}
              </div>
              <ReviewList productId={product.id} refreshKey={refreshKey} />
              <ReviewForm productId={product.id} onReviewSubmitted={handleReviewSubmitted} />
              <div className="product-details-actions">
                <button onClick={() => addToCart(product)}>
                  <CiShoppingCart size={20} /> Add to Cart
                </button>
                <button onClick={() => toggleFavorite(product.id)}>
                  <CiHeart size={20} /> {isFavorite ? "Remove from Wishlist" : "Add to Wishlist"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detaile;
