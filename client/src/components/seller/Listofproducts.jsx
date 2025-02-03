import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ListOfProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_HOST}/api/Products`);
      
      // Map products and add a default seller name
      const productsWithDefaultSeller = response.data.map(product => ({
        ...product,
        sellerName: 'Unknown Seller' // Default seller name
      }));

      // Filter products for the current user
      const userProducts = productsWithDefaultSeller.filter(el => String(el.sellerId) === String(user?.id));

      setProducts(userProducts);
      setError(null);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_HOST}/api/Products/${id}`);
        fetchProducts(); // Refresh the list
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product');
      }
    }
  };

  const handleEdit = (productId) => {
    navigate(`/update/${productId}`);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
      </div>
    );
  }

  const containerStyle = {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const tableContainerStyle = {
    background: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    overflowX: 'auto',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    minWidth: '800px',
  };

  const thStyle = {
    padding: '12px',
    textAlign: 'left',
    borderBottom: '1px solid #eee',
    backgroundColor: '#f8f9fa',
    fontWeight: '600',
    color: '#333',
  };

  const tdStyle = {
    padding: '12px',
    textAlign: 'left',
    borderBottom: '1px solid #eee',
  };

  const actionButtonStyle = {
    display: 'flex',
    gap: '10px',
  };

  const editButtonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };

  const deleteButtonStyle = {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <h2>All Products</h2>
      <div style={tableContainerStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Image</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Description</th>
              <th style={thStyle}>Price</th>
              <th style={thStyle}>Stock</th>
              <th style={thStyle}>Category</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td style={tdStyle}>
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                  />
                </td>
                <td style={tdStyle}>{product.name}</td>
                <td style={tdStyle}>{product.description}</td>
                <td style={tdStyle}>${product.price}</td>
                <td style={tdStyle}>{product.stock}</td>
                <td style={tdStyle}>{product.categoryId}</td>
                <td style={tdStyle}>
                  <div style={actionButtonStyle}>
                    <button 
                      style={editButtonStyle}
                      onClick={() => handleEdit(product.id)}
                    >
                      <FaEdit />
                    </button>
                    <button 
                      style={deleteButtonStyle}
                      onClick={() => handleDelete(product.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListOfProducts;