import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create a context
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [orderItems, setOrderItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/Products/");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchFavorites = () => {
    axios
      .get("http://localhost:4000/api/Products/favorites")
      .then((resp) => setFavorites(resp.data))
      .catch((error) => console.error("Error fetching favorites:", error));
  };

  useEffect(() => {
    fetchProducts();
    fetchFavorites();
    
    // Load cart data from local storage on mount
    const storedOrderItems = localStorage.getItem('orderItems');
    if (storedOrderItems) {
      setOrderItems(JSON.parse(storedOrderItems));
    }

    // Fetch user data
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/user/1');
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  // Save cart data to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('orderItems', JSON.stringify(orderItems));
  }, [orderItems]);

  const addToCart = (product) => {
    setOrderItems((prevItems) => {
      const existingItem = prevItems.find(item => item.productId === product.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.productId === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        // If the product was in favorites, remove it when adding to cart
        if (favorites.some(fav => fav.id === product.id)) {
          toggleFavorite(product.id);
        }
        return [...prevItems, { 
          productId: product.id, 
          quantity: 1, 
          price: product.price, 
          product: product 
        }];
      }
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
    setOrderItems(prevItems => prevItems.filter(item => item.productId !== productId));
  };

  const getTotal = () => {
    return orderItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const toggleFavorite = async (productId) => {
    try {
      // Optimistically update UI first
      setFavorites(prev => {
        const isCurrentlyFavorite = prev.some(fav => fav.id === productId);
        if (isCurrentlyFavorite) {
          // Remove from favorites
          return prev.filter(fav => fav.id !== productId);
        } else {
          // Add to favorites
          const productToAdd = products.find(p => p.id === productId);
          if (productToAdd) {
            return [...prev, productToAdd];
          }
          return prev;
        }
      });

      // Then make API call
      await axios.put(`http://localhost:4000/api/Products/toggle-favorite/${productId}`);
      
      // Optionally fetch to ensure sync with server
      // Only if you need to ensure complete sync
      // await fetchFavorites();
    } catch (error) {
      console.error("Error toggling favorite:", error);
      // Revert the optimistic update if the API call fails
      fetchFavorites();
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      // Optimistically update UI
      setFavorites(prev => prev.filter(fav => fav.id !== productId));
      
      // Make API call
      await axios.put(`http://localhost:4000/api/Products/toggle-favorite/${productId}`);
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      // Revert on error
      fetchFavorites();
    }
  };

  return (
    <CartContext.Provider value={{ 
      favorites, 
      orderItems, 
      addToCart, 
      updateQuantity, 
      removeFromCart, 
      getTotal,
      toggleFavorite,
      removeFromWishlist,
      user 
    }}>
      {children}
    </CartContext.Provider>
  );
};