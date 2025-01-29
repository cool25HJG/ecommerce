import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom';

function listOfProduct() {
// const navigate=useNavigate()
    const [Product, setProduct] = useState([]);
    
    const getallproduct = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/Products/");
        console.log(response.data);
        setProduct(response.data);
      } catch (error) {
        throw error;
      }
    };

  return (
    <div> 
<h3> list of product  </h3>
<div className="column">
     {/* {5555555.map(() => ( */}
<div key={""} className="product-card">

            <img src="" alt="" />
            <h4>name</h4>
            <p>description</p>
            <h4>price</h4>
            <h4>stock</h4>
            
      
    <button onClick={()=>{}}>Update</button>
    <button onClick={()=>{}}>Delete</button>



</div>

</div>
    </div>
  );
}

export default listOfProduct;