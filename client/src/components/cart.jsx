import React, { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import axios from "axios";

const Cart = () => {
  const { orderItems, updateQuantity, removeFromCart, getTotal, user } = useContext(CartContext);
  const [isProcessing, setIsProcessing] = useState(false); // State to manage "Buy" button status
console.log("user",user);
console.log("orderItems",orderItems)


  const handleQuantityChange = (productId, quantity) => {
    if (quantity > 0) {
      updateQuantity(productId, quantity);
    } else {
      removeFromCart(productId);
    }
  };

  const handleBuy = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior if inside a form

    // Prevent multiple submissions
    if (isProcessing) return;
    setIsProcessing(true);

    const totalAmount = getTotal();

    try {
      // Create a new commande in the backend
      const commandeResponse = await axios.post('http://localhost:4000/api/Commande/', {
        clientId: user.id, // Use the actual user ID from context
        items: orderItems,
        status: 'pending',
        totalPrice: totalAmount,
      });

      const newCommande = commandeResponse.data.newCommande;

      // Initiate payment
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

      // Redirect to the payment URL
      window.location.href = payUrl;
    } catch (error) {
      console.error('Error during payment:', error);
      alert('Failed to initiate payment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    
    <div className="cart">
      <h2>Cart</h2>
      {orderItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <ul>
            {orderItems.map((item) => (
              <li key={item.productId}>
                <img src={item.product.imageUrl} alt={item.product.name} style={{ width: "50px" }} />
                <h4>{item.product.name}</h4>
                <p>Price: {item.price}</p>
                <p>Quantity: 
                  <input 
                    type="number" 
                    value={item.quantity} 
                    onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value))} 
                    min="1"
                  />
                </p>
                <button onClick={() => removeFromCart(item.productId)}>Remove</button>
              </li>
            ))}
          </ul>
          <h3>Total: {getTotal()}</h3>
          <button onClick={handleBuy} disabled={isProcessing}>Buy</button>
        </div>
      )}
    </div>
  );
};

export default Cart;