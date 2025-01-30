import React, { useEffect, useState } from "react";
import axios from "axios";

const Wishlist = ({ userId }) => {
  const [wishlist, setWishlist] = useState([]);

  const fetchWishlist = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/wishlist/${userId}`);
      setWishlist(response.data);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  const addToWishlist = async (productId) => {
    try {
      await axios.post(`http://localhost:4000/api/wishlist/${userId}`, { productId });
      fetchWishlist();
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await axios.delete(`http://localhost:4000/api/wishlist/${userId}/${productId}`);
      fetchWishlist();
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <div>
      <h2>Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty</p>
      ) : (
        <ul>
          {wishlist.map(item => (
            <li key={item.id}>
              <img src={item.imageUrl} alt={item.name} style={{ width: "50px" }} />
              <h4>{item.name}</h4>
              <button onClick={() => removeFromWishlist(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <div>
        <input type="text" placeholder="Product ID" id="productId" />
        <button onClick={() => addToWishlist(document.getElementById('productId').value)}>Add to Wishlist</button>
      </div>
    </div>
  );
};

export default Wishlist;