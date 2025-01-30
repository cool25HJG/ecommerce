import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CiHeart, CiShoppingCart } from "react-icons/ci";
import { CartContext } from "./CartContext";

function Detaile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const cart = useContext(CartContext);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/Products/${id}`)
      .then((resp) => setProduct(resp.data))
      .catch((error) => {
        console.log(error);
        navigate("/"); // Redirect to home if product not found
      });
  }, [id, navigate]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-details-container">
      <h2>Product Details</h2>
      <div className="product-details">
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="product-image"
        />
        <div className="product-info">
          <h4>Name: {product.name}</h4>
          <p className="full-description">Description: {product.description}</p>
          <h4>Price: ${product.price}</h4>
          <h4>Stock: {product.stock}</h4>
          <div className="action-buttons">
            <button onClick={() => cart.addToCart(product)}>
              <CiShoppingCart size={25} className="me-3" /> Add to Cart
            </button>
            <button onClick={() => cart.addToWishlist(product)}>
              <CiHeart size={25} className="me-3" /> Add to Wishlist
            </button>
            <button onClick={() => navigate("/")}>Back to Products</button>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Detaile;

