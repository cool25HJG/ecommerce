import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Oneproduct({ product, fetch }) {
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDelete = async (id) => {
    try {
      await axios.delete(import.meta.env.VITE_HOST+`/api/Products/${id}`);
      fetch();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleDeleteClick = () => {
    setShowConfirmation(true);
  };

  const confirmDelete = () => {
    handleDelete(product.id);
    setShowConfirmation(false);
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
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
        <button onClick={handleDeleteClick}>Delete</button>
      </div>

      {showConfirmation && (
        <div className="confirmation-overlay" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999,
          pointerEvents: 'auto'
        }}>
          <div className="confirmation-popup" style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            textAlign: 'center',
            position: 'relative',
            zIndex: 10000,
            pointerEvents: 'auto',
            minWidth: '300px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this product?</p>
            <div className="confirmation-buttons">
              <button onClick={confirmDelete} className="confirm-yes">Yes</button>
              <button onClick={cancelDelete} className="confirm-no">No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
