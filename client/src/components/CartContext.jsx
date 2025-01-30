import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create a context
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [orderItems, setOrderItems] = useState([]);
  const [user, setUser] = useState(null);

  // Load cart data from local storage on mount
  useEffect(() => {
    const storedOrderItems = localStorage.getItem('orderItems');
    if (storedOrderItems) {
      setOrderItems(JSON.parse(storedOrderItems));
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

  // Save cart data to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('orderItems', JSON.stringify(orderItems));
  }, [orderItems]);

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

  const getTotal = () => {
    return orderItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ orderItems, addToCart, updateQuantity, removeFromCart, getTotal, user }}>
      {children}
    </CartContext.Provider>
  );
};