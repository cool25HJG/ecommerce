import React, { useEffect, useState } from "react";
import axios from "axios";

const Wishlist = ({ userId }) => {
  const [wishlist, setWishlist] = useState([]);

  const fetchWishlist = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/Products`);
      // Filter products where isFavorite is true
      const favoriteProducts = response.data.filter(product => product.isFavorite);
      setWishlist(favoriteProducts);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  const removeFromWishlist = async (product) => {
    try {
      await axios.put(`http://localhost:4000/api/Products/${product.id}`, {
        ...product,
        isFavorite: false
      });
      fetchWishlist();
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <div className="wishlist-container">
      <h2>Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty</p>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map(item => (
            <div key={item.id} className="wishlist-item">
              <img src={item.imageUrl} alt={item.name} />
              <h4>{item.name}</h4>
              <p>${item.price}</p>
              <button onClick={() => removeFromWishlist(item)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;