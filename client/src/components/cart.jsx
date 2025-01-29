import React, { useContext } from "react";
import { CartContext } from "./CartContext";

const Cart = () => {
    const { cart, updateQuantity, removeFromCart, getTotal } = useContext(CartContext);
  
    const handleQuantityChange = (productId, quantity) => {
      if (quantity > 0) {
        updateQuantity(productId, quantity);
      } else {
        removeFromCart(productId);
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
          </div>
        )}
      </div>
    );
  };
  

export default Cart;