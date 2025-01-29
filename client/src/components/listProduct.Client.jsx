import React, { useEffect, useState } from 'react'
import { CiHeart, CiUser, CiShoppingCart } from "react-icons/ci";

function listProduct() {
    const [data, setData] = useState([]);
    const fetchData = () => {
        axios
          .get("http://localhost:4000/api/Products/")
          .then((resp) => setData(resp.data))
          .catch((error) => console.log(error));
      };

useEffect(()=>{fetchData},[])
console.log(data);



  return (
    <div>
    <h3>List of All Products</h3>
          <div className="column">
            <div key={""} className="product-card">
              <img src="" alt="" />
              <h4>Name</h4>
              <p>Description</p>
              <h4>Price</h4>
              <h4>Stock</h4>
              <CiShoppingCart size={25} className="me-3" />
              <CiHeart size={25} className="me-3" />
              </div>
              </div>  
    </div>
  )
}

export default listProduct
