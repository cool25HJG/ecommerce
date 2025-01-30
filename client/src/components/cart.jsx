import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import axios from "axios";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, getTotal } = useContext(CartContext);

  const handleQuantityChange = (productId, quantity) => {
    if (quantity > 0) {
      updateQuantity(productId, quantity);
    } else {
      removeFromCart(productId);
    }
  };

  const handleBuy = async () => {
    const totalAmount = getTotal();
    const orderId = `order-${Date.now()}`;

    try {
      // Create a new commande in the backend
      await axios.post('http://localhost:4000/api/Commande/', {
        totalPrice: totalAmount,
      });

      // Initiate payment
      const response = await axios.post('http://localhost:4000/create-payment', {
        amount: totalAmount,
        currency: 'TND',
        description: 'testtt',
        firstName: 'Ghassen',
        lastName: 'kharrr',
        phoneNumber: '99466666',
        email: 'houssem@gmail.com',
        orderId: orderId
      });

      const { payUrl } = response.data;

      // Redirect to the payment URL
      window.location.href = payUrl;
    } catch (error) {
      console.error('Error during payment:', error);
      alert('Failed to initiate payment. Please try again.');
    }
  };

  return (
    <div className="cart">
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                <img src={item.imageUrl} alt={item.name} style={{ width: "50px" }} />
                <h4>{item.name}</h4>
                <p>Price: {item.price}</p>
                <p>Quantity: 
                  <input 
                    type="number" 
                    value={item.quantity} 
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))} 
                    min="1"
                  />
                </p>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <h3>Total: {getTotal()}</h3>
          <button onClick={handleBuy}>Buy</button>
        </div>
      )}
    </div>
  );
};

export default Cart;