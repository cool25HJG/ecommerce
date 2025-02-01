import React, { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import axios from "axios";

const Cart = () => {
  // Destructure necessary functions and state from CartContext
  const { orderItems, updateQuantity, removeFromCart, getTotal, user, toggleFavorite } = useContext(CartContext);
  // State to manage "Buy" button status and prevent double submissions
  const [isProcessing, setIsProcessing] = useState(false);
  console.log("user", user);
  console.log("orderItems", orderItems);

  // Handler for updating item quantity in cart
  // If quantity > 0, update the quantity; if 0, remove item from cart
  const handleQuantityChange = (productId, quantity) => {
    if (quantity > 0) {
      updateQuantity(productId, quantity);
    } else {
      removeFromCart(productId);
    }
  };

  // Handler for processing the purchase
  const handleBuy = async () => {
    // Prevent multiple submissions while processing
    if (isProcessing) return;
    setIsProcessing(true);

    const totalAmount = getTotal();

    try {
      // Step 1: Create a new order in the backend
      const commandeResponse = await axios.post('http://localhost:4000/api/Commande/', {
        clientId: user.id,
        items: orderItems,
        status: 'pending',
        totalPrice: totalAmount,
      });

      const newCommande = commandeResponse.data.newCommande;

      // Step 2: Initialize payment process with payment gateway
      const paymentResponse = await axios.post('http://localhost:4000/create-payment', {
        amount: totalAmount,
        currency: 'TND',
        description: 'User buy item',
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        email: user.email,
        orderId: newCommande.id
      });

      const { payUrl } = paymentResponse.data;

      // Step 3: Redirect user to payment gateway
      window.location.href = payUrl;
    } catch (error) {
      console.error('Error during payment:', error);
      alert('Failed to initiate payment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Handler for moving items from cart to wishlist
  const moveToWishlist = async (item) => {
    try {
      // First add to wishlist
      await toggleFavorite(item.productId);
      // Then remove from cart
      removeFromCart(item.productId);
    } catch (error) {
      console.error("Error moving item to wishlist:", error);
    }
  };

  // Render cart UI
  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {/* Show empty cart message if no items, otherwise show cart contents */}
      {orderItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {/* List of cart items */}
          <ul>
            {orderItems.map((item) => (
              <li key={item.productId} className="cart-item">
                {/* Item image */}
                <img src={item.product.imageUrl} alt={item.product.name} />
                {/* Item details section */}
                <div className="cart-item-details">
                  <h4>{item.product.name}</h4>
                  <p>Price: ${item.price}</p>
                  {/* Quantity control input */}
                  <div className="quantity-control">
                    <label>Quantity:</label>
                    <input 
                      type="number" 
                      value={item.quantity} 
                      onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value))} 
                      min="1"
                    />
                  </div>
                </div>
                {/* Item action buttons */}
                <div className="cart-item-actions">
                  <button onClick={() => moveToWishlist(item)}>Move to Wishlist</button>
                  <button onClick={() => removeFromCart(item.productId)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
          {/* Cart total and buy button */}
          <h3>Total: {getTotal()}</h3>
          <button onClick={handleBuy} disabled={isProcessing}>Buy</button>
        </div>
      )}
    </div>
  );
};

export default Cart;