import React, { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import axios from "axios";

const Cart = () => {
  const { orderItems, updateQuantity, removeFromCart, getTotal, user, toggleFavorite } = useContext(CartContext);
  const [isProcessing, setIsProcessing] = useState(false);


  const handleQuantityChange = (productId, quantity) => {
    if (quantity > 0) {
      updateQuantity(productId, quantity);
    } else {
      removeFromCart(productId);
    }
  };

  const handleBuy = async () => {
    if (!user || !user.id) {
      alert("You must be logged in to make a purchase.");
      return;
    }

    if (isProcessing) return;
    setIsProcessing(true);

    const totalAmount = getTotal();

    try {
      if (!Array.isArray(orderItems) || orderItems.length === 0) {
        alert("Your cart is empty.");
        setIsProcessing(false);
        return;
      }

      const commandeResponse = await axios.post(import.meta.env.VITE_HOST+"/api/Commande/", {
        clientId: user.id,
        items: orderItems,
        status: "pending",
        totalPrice: totalAmount,
      });

      const newCommande = commandeResponse.data.newCommande;

      const paymentResponse = await axios.post(import.meta.env.VITE_HOST+"/create-payment", {
        amount: totalAmount,
        currency: "TND",
        description: "User buy item",
        firstName: user.firstName || "Unknown",
        lastName: user.lastName || "Unknown",
        phoneNumber: user.phoneNumber || "00000000",
        email: user.email || "unknown@example.com",
        orderId: newCommande.id,
      });
console.log(("user",user));

      const { payUrl } = paymentResponse.data;
      window.location.href = payUrl;
    } catch (error) {
      console.error("Error during payment:", error);
      alert("Failed to initiate payment. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const moveToWishlist = async (item) => {
    try {
      await toggleFavorite(item.productId);
      removeFromCart(item.productId);
    } catch (error) {
      console.error("Error moving item to wishlist:", error);
    }
  };

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {orderItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <ul>
            {orderItems.map((item) => (
              <li key={item.productId} className="cart-item">
                <img src={item.product.imageUrl} alt={item.product.name} />
                <div className="cart-item-details">
                  <h4>{item.product.name}</h4>
                  <p>Price: ${item.price}</p>
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
                <div className="cart-item-actions">
                  <button onClick={() => moveToWishlist(item)}>Move to Wishlist</button>
                  <button onClick={() => removeFromCart(item.productId)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <h3>Total: {getTotal()}</h3>
          <button onClick={handleBuy} disabled={isProcessing}>
            {isProcessing ? "Processing..." : "Buy"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
