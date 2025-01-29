import React, { useContext } from "react";
import { CartContext } from "./CartContext";

const Cart = () => {
    const { cart, removeFromCart, getTotal } = useContext(CartContext);
  
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
                  <p>Quantity: {item.quantity}</p>
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