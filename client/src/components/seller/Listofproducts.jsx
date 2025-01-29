import React, { useState } from "react";
import Oneproduct from "./Oneproduct";
function Listofproducts({product,fetch}) {



  return (
    <div> 
{      product.map((product) => {
                      return  (
                      <div key={product.id}>
                      <Oneproduct
                      product={product}
                      fetch={fetch}
                      />  
                    </div>
                    )
      })}

  
    </div>
  )
  
}

export default Listofproducts
