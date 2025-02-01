import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { CiHeart, CiShoppingCart } from "react-icons/ci";
import { CartContext } from "./CartContext";

function Detaile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [product, setProduct] = useState(location.state?.product || null);
  const [loading, setLoading] = useState(!location.state?.product);
  const { addToCart, toggleFavorite, favorites } = useContext(CartContext);
console.log("product",product);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!product && id) {
        try {
          console.log("Fetching product ID:", id);
          const response = await axios.get(`${import.meta.env.VITE_HOST}/api/Products/products/${id}`);
          console.log("Product data:", response.data);
          if (response.data) {
            setProduct(response.data);
          }
        } catch (error) {
          console.error("Error fetching product:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProduct();
  }, [id, product]);

  if (loading) {
    return (
      <div style={{ 
        textAlign: 'center', 
        marginTop: '50px',
        fontSize: '1.2rem',
        color: '#666'
      }}>
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ 
        textAlign: 'center', 
        marginTop: '50px',
        color: '#b20505'
      }}>
        Product not found
      </div>
    );
  }

  const isFavorite = favorites.some((fav) => fav.id === product.id);

  return (
    <div className="product-details-container">
      <div className="card" style={{
        width: "50rem",
        margin: "2rem auto",
        padding: "1.5rem",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        borderRadius: "8px",
        textAlign: "center",
        position: "relative"
      }}>
        <button 
          onClick={() => navigate(-1)}
          style={{
            position: 'absolute',
            left: '20px',
            top: '20px',
            padding: '8px 16px',
            backgroundColor: '#b20505',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Back
        </button>

        <img
          src={product.imageUrl}
          alt={product.name}
          style={{
            width: "50%",
            height: "auto",
            margin: "20px auto",
            borderRadius: "8px"
          }}
        />

        <div className="card-body">
          <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>{product.name}</h2>
          <p style={{ fontSize: "1.2rem", color: "#666" }}>{product.description}</p>
          <h5 style={{ fontSize: "1.5rem", margin: "1rem 0" }}>Price: {product.price}DT</h5>
          <h5 style={{ fontSize: "1.5rem", margin: "1rem 0" }}>Stock: {product.stock}</h5>

          <div style={{ marginTop: "1.5rem" }}>
            <button
              onClick={() => addToCart(product)}
              style={{
                padding: "10px 20px",
                marginRight: "10px",
                backgroundColor: "#b20505",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              <CiShoppingCart size={20} /> Add to Cart
            </button>
            <button
              onClick={() => toggleFavorite(product.id)}
              style={{
                padding: "10px 20px",
                backgroundColor: isFavorite ? "#b20505" : "white",
                color: isFavorite ? "white" : "#b20505",
                border: "1px solid #b20505",
                borderRadius: "4px",
                cursor: "pointer"
              }}
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
