import React, { useState } from "react";

function Wishlist() {

 

  const addToCart = (product) => {
    console.log(`Added ${product.name} to cart`);
    // Implement cart logic here
  };

  return (
    <div> 
      <h3>Wishlist</h3>
      <div className="column">
        {wishlist.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.imageUrl} alt="product-image" />
            <h4>Name: {product.name}</h4>
            <p>Description: {product.description}</p>
            <h4>Price: {product.price}</h4>
            <h4>Stock: {product.stock}</h4>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;

