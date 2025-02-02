import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function ListOfProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

      setProducts(productsWithDefaultSeller);
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

  return (
    <div className="admin-products-container">
      <h2>All Products</h2>
      <div className="products-table-container">
        <table className="products-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>${product.price}</td>
                <td>{product.stock}</td>
                <td>{product.categoryId}</td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="edit-button"
                      onClick={() => handleEdit(product.id)}
                    >
                      <FaEdit />
                    </button>
                    <button 
                      className="delete-button"
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