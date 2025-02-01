import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Oneproduct({ product, fetch }) {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await axios.delete(import.meta.env.VITE_HOST+`/api/Products/${id}`);
      fetch();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const navigateToDetails = () => {
    navigate("/detaile", { state: { product } });
  };

  return (
    <div className="seller-product-card">
      <div className="seller-product-image">
        <img src={product.imageUrl} alt={product.name} />
      </div>
      <div className="seller-product-info">
        <h4 className="seller-product-title">{product.name}</h4>
        <p className="seller-product-description" onClick={navigateToDetails}>
          {product.description.length > 20
            ? `${product.description.slice(0, 20)}...`
            : product.description}
        </p>
        <h4 className="seller-product-price">${product.price}</h4>
        <h4 className="seller-product-stock">Stock: {product.stock}</h4>
      </div>
      <div className="seller-product-actions">
        <button onClick={navigateToDetails}>View Details</button>
        <button onClick={() => navigate("/update", { state: { product } })}>Update</button>
        <button onClick={() => handleDelete(product.id)}>Delete</button>
      </div>
    </div>
  );
}
