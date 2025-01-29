import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";



function Detaile() {
    // const navigate=useNavigate()
    // const {state}=useLocation()
    // console.log(state)
    const product=state?.product
    console.log(product)
  return (
    <div>
      
      <img src={product.imageUrl} alt="product-image" />
            <h4>name: {product.name}</h4>
            <p>description:  {product.description}</p>
            <h4>price: {product.price}</h4>
            <h4>stock: {product.stock} </h4>
   


      </div>
      
  )
}
export default Detaile;
