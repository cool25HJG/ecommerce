import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { CiHeart, CiShoppingCart } from "react-icons/ci";
import { CartContext } from "./CartContext";

function Detaile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const product = state?.product;
  const { addToCart, toggleFavorite, favorites } = useContext(CartContext);

  if (!product) {
    return <div>Loading...</div>;
  }

  const isFavorite = favorites.some((fav) => fav.id === product.id);

  return (
    <div className="product-details-container">
      <div
        className="card"
        style={{
          width: "50rem", 
          margin: "2rem auto", 
          padding: "1.5rem",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", 
          borderRadius: "8px",
          textAlign: "center", 
        }}
      >
        <img
          src={product.imageUrl}
          className="card-img-top"
          alt="Product Image"
          style={{
            display: "block", 
            margin: "0 auto", 
            width: "50%", 
            height: "auto",
            borderRadius: "8px", 
            marginBottom: "1rem", 
          }}
        />
        <div className="card-body">
          <h2 className="card-title" style={{ fontSize: "2rem", marginBottom: "1rem" }}>
            {product.name}
          </h2>
          <p className="card-text" style={{ fontSize: "1.2rem", margin: "1rem 0", color: "#666" }}>
            {product.description}
          </p>
          <h5 className="card-price" style={{ fontSize: "1.5rem", marginTop: "1rem" }}>
            Price: {product.price}DT
          </h5>
          <h5 className="card-stock" style={{ fontSize: "1.5rem", marginTop: "1rem" }}>
            Stock: {product.stock}
          </h5>
          <h5 className="card-rating" style={{ fontSize: "1.5rem", marginTop: "1rem" }}>
            Rating: {product.averageRating}
          </h5>
          <h5 className="card-reviews" style={{ fontSize: "1.5rem", marginTop: "1rem" }}>
            Reviews: {product.totalReviews}
          </h5>
          <div className="product-actions" style={{ marginTop: "1.5rem" }}>
            <button 
              onClick={() => addToCart(product)}
              style={{ padding: "10px 20px", marginRight: "10px", cursor: "pointer" }}
            >
              <CiShoppingCart size={20} /> Add to Cart
            </button>
            <button 
              onClick={() => toggleFavorite(product.id)}
              style={{ padding: "10px 20px", cursor: "pointer", color: isFavorite ? "red" : "black" }}
            >
              <CiHeart size={20} /> {isFavorite ? "Remove from Wishlist" : "Add to Wishlist"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detaile;
