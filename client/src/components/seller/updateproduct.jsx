import React, { useState } from "react";
import axios from 'axios'
import { useLocation } from 'react-router'
import { useNavigate } from "react-router-dom";
function Updateproduct({fetch}) {
     const navigate=useNavigate()
    const {state}=useLocation()
    const product=state?.product
    console.log("product",product)
        const [name, setname] = useState(product?.name||"");
        const [description, setdescription] = useState(product?.description||"");
        const [price, setprice] = useState(product?.price||"");
        const [stock, setstock] = useState(product?.stock||"");
        const [imageUrl, setimageUrl] = useState(product?.imageUrl||"");

        const handleUpdateproduct = async ({name,description,price,stock,imageUrl}) => {
            try {
              const response = await axios.put(`http://localhost:4000/api/Products/${product.id}`,{name,description,price,stock,imageUrl})
              navigate("/main/seller")
              fetch()
            } catch (error) {
              throw error;
            }
          }
  return (
    <div>
          <div>
        <div>
           <label>Name</label>
          <input onChange={(e) => setname(e.target.value)} defaultValue={name}/>
        </div>

        <div>
           <label>description</label>
          <input onChange={(e) => setdescription(e.target.value)} defaultValue={description}/>
        </div>

        <div>
           <label>price</label>
          <input onChange={(e) => setprice(e.target.value)} defaultValue={price}/>
        </div>

        <div>
           <label>stock</label>
          <input onChange={(e) => setstock(e.target.value)} defaultValue={stock}/>
        </div>

        <div>
           <label>imageUrl</label>
          <input onChange={(e) => setimageUrl(e.target.value)} defaultValue={imageUrl}/>
        </div>


      <div >
        <button
          onClick={() => handleUpdateproduct({name,description,price,stock,imageUrl})}
        >
          Update
        </button>
      </div>
    </div>
    </div>
  )
}

export default Updateproduct
