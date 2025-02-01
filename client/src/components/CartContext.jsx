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
    
    const storedOrderItems = localStorage.getItem("orderItems");
    if (storedOrderItems) {
      setOrderItems(JSON.parse(storedOrderItems));
    }

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      fetchUserData();
    }
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_HOST+"/api/user/1");
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUser({ id: null });
    }
  };

  useEffect(() => {
    localStorage.setItem("orderItems", JSON.stringify(orderItems));
  }, [orderItems]);

  // ✅ Define `addToCart` function BEFORE using it in the provider
  const addToCart = (product) => {
    setOrderItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.productId === product.id);
      
      if (existingItem) {
        return prevItems.map((item) =>
          item.productId === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        if (favorites.some((fav) => fav.id === product.id)) {
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
      prevItems.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setOrderItems((prevItems) => prevItems.filter((item) => item.productId !== productId));
  };

  const getTotal = () => {
    return orderItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const toggleFavorite = async (productId) => {
    try {
      setFavorites((prev) => {
        const isCurrentlyFavorite = prev.some((fav) => fav.id === productId);
        if (isCurrentlyFavorite) {
          return prev.filter((fav) => fav.id !== productId);
        } else {
          const productToAdd = products.find((p) => p.id === productId);
          return productToAdd ? [...prev, productToAdd] : prev;
        }
      });

      await axios.put(import.meta.env.VITE_HOST+`/api/Products/toggle-favorite/${productId}`);
    } catch (error) {
      console.error("Error toggling favorite:", error);
      fetchFavorites();
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      setFavorites((prev) => prev.filter((fav) => fav.id !== productId));
      await axios.put(import.meta.env.VITE_HOST+`/api/Products/toggle-favorite/${productId}`);
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      fetchFavorites();
    }
  };

  return (
    <CartContext.Provider value={{ 
      favorites, 
      orderItems, 
      addToCart,  // ✅ Now `addToCart` is properly included
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
