import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Oneproduct(product) {
    const navigate=useNavigate()
    
    const handleDelete = async (id) => {
        try {
          const response = await axios.delete(`http://localhost:4000/api/Products/${id}`);
        } catch (error) {
          throw error;
        }
      };

  return (
    <div>
      <h3> list of product  </h3>
<div className="column">
<div  className="product-card">

            <img src={product.imageUrl} alt="" />
            <h4>{product.name}</h4>
            <p>{product.description}</p>
            <h4>{product.price}</h4>
            <h4>{product.stock}</h4>
            
    <button onClick={()=>navigate("/update",{state:{product:product}})}>Update</button>
    <button onClick={()=>{handleDelete(product.id)}}>Delete</button>

</div>

</div>
    </div>
  )
}
