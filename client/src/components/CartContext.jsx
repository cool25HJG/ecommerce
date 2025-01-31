import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create a context
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [orderItems, setOrderItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [user, setUser] = useState(null);

  // Load cart and wishlist data from local storage on mount
  useEffect(() => {
    const storedOrderItems = localStorage.getItem('orderItems');
    if (storedOrderItems) {
      setOrderItems(JSON.parse(storedOrderItems));
    }

    const storedWishlistItems = localStorage.getItem('wishlistItems');
    if (storedWishlistItems) {
      setWishlistItems(JSON.parse(storedWishlistItems));
    }

    // Fetch user data when the component mounts
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/user/1'); // Replace with actual user ID or API endpoint
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  // Save cart and wishlist data to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('orderItems', JSON.stringify(orderItems));
  }, [orderItems]);

  useEffect(() => {
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToCart = (product) => {
    setOrderItems((prevItems) => {
      const existingItem = prevItems.find(item => item.productId === product.id);

      if (existingItem) {
        // Update quantity if the product already exists in the cart
        return prevItems.map(item =>
          item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Add new product to the cart
        return [...prevItems, { productId: product.id, quantity: 1, price: product.price, product }];
      }
    });
  };

  const addToWishlist = (product) => {
    setWishlistItems((prevItems) => {
      const existingItem = prevItems.find(item => item.productId === product.id);

      if (!existingItem) {
        // Add new product to the wishlist
        return [...prevItems, { productId: product.id, product }];
      }
      return prevItems;
    });
  };

  const updateQuantity = (productId, quantity) => {
    setOrderItems((prevItems) =>
      prevItems.map(item =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setOrderItems((prevItems) =>
      prevItems.filter(item => item.productId !== productId)
    );
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems((prevItems) =>
      prevItems.filter(item => item.productId !== productId)
    );
  };

  const getTotal = () => {
    return orderItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const toggleFavorite = async (productId) => {
  try {
    await axios.put(`http://localhost:4000/api/Products/toggle-favorite/${productId}`);
    const updatedProduct = await axios.get(`http://localhost:4000/api/Products/${productId}`);
    if (updatedProduct.data.isFavorite) {
      addToWishlist(updatedProduct.data);
    } else {
      removeFromWishlist(productId);
    }
  } catch (error) {
    console.error("Error toggling favorite:", error);
  }
};

  return (
    <CartContext.Provider value={{ orderItems, addToCart, updateQuantity, removeFromCart, getTotal, addToWishlist, removeFromWishlist, wishlistItems, toggleFavorite, user }}>
      {children}
    </CartContext.Provider>
  );
};