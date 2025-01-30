import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";

function Wishlist() {
  const { wishlist, removeFromWishlist, moveToCart } = useContext(CartContext);
  const navigate = useNavigate();

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-empty">
        <h3>Your Wishlist is Empty</h3>
        <button onClick={() => navigate("/")}>Continue Shopping</button>
      </div>
    );
  }

  return (
    <div className="wishlist-container"> 
      <h3>My Wishlist</h3>
      <div className="wishlist-grid">
        {wishlist.map((product) => (
          <div key={product.id} className="product-card">
            <img 
              src={product.imageUrl} 
              alt={product.name}
              onClick={() => navigate(`/detaile/${product.id}`)}
            />
            <h4>{product.name}</h4>
            <p>{product.description}</p>
            <h4>${product.price}</h4>
            <div className="wishlist-actions">
              <button onClick={() => moveToCart(product)}>Move to Cart</button>
              <button onClick={() => removeFromWishlist(product.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => navigate("/")} className="continue-shopping">
        Continue Shopping
      </button>
    </div>
  );
}

export default Wishlist;

