import React, { useState } from "react";

export default function Oneproduct(product) {
    const [Currentproduct , setCurrentproduct] = useState(null);
    const getCurrentproduct = (id)=>{
        setCurrentproduct(id)
    }
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
            
      
    <button onClick={()=>{}}>Update</button>
    <button onClick={()=>{}}>Delete</button>



</div>

</div>
    </div>
  )
}
