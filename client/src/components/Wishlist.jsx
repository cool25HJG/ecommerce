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
   
  )
};

export default Wishlist;