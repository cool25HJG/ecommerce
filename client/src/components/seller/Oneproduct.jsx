import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Oneproduct({ product, fetch }) {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await axios.delete(import.meta.env.VITE_HOST+`/api/Products/${id}`);
      fetch(); // Refresh the product list
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="container">
      <div className="main-content">
        <div className="products-grid" >
          <div className="product-card">
            {/* Product Image & Icons */}
            <div className="product-image-container">
              <img src={product.imageUrl} alt={product.name} />
              <div className="product-overlay-icons">
                
               
              </div>
            </div>

            {/* Product Details */}
            <h4>{product.name}</h4>
            <p onClick={() => navigate("/detaile")}>
              {product.description.length > 20
                ? `${product.description.slice(0, 20)}...`
                : product.description}
            </p>
            <h4>${product.price}</h4>
            <h4>Stock: {product.stock}</h4>

            {/* Action Buttons */}
            <div className="product-actions">
              <button onClick={() => navigate("/detaile")}>View Details</button>
              <button onClick={() => navigate("/update", { state: { product } })}>Update</button>
              <button onClick={() => handleDelete(product.id)}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
