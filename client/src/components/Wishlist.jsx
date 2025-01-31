import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
import axios from "axios";

function Wishlist() {
  const navigate = useNavigate();
  const { favorites, removeFromWishlist, addToCart } = useContext(CartContext);

  const moveToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  return (
    <div className="wishlist">
      <h2>Wishlist</h2>
      {favorites.length === 0 ? (
        <p>Your wishlist is empty</p>
      ) : (
        <div className="products-grid">
          {favorites.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image-container">
                <img src={product.imageUrl} alt={product.name} />
              </div>
              <h4>{product.name}</h4>
              <p>{product.description}</p>
              <h4>${product.price}</h4>
              <div className="product-actions">
                <button onClick={() => moveToCart(product)}>Add to Cart</button>
                <button onClick={() => removeFromWishlist(product.id)}>
                  Remove from Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;