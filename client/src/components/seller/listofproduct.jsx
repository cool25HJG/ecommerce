// import React from 'react'
// import { useNavigate } from 'react-router-dom';

function listOfProduct() {
// const navigate=useNavigate()


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