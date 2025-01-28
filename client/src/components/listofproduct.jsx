import React from 'react'
import { useNavigate } from 'react-router-dom';

function listOfProduct() {
const navigate=useNavigate()


  return (
    <div> 
<h3> list of product  </h3>
<div>
    <ul>
        <li>
            <img src="" alt="" />
        </li>

        <li>
            <h4>name</h4>
        </li>
        
        <li>
            <p>description</p>
        </li>
        <li>
            <h4>price</h4>

        </li>
        <li>
            <h4>stock</h4>
            
        </li>
    </ul>
    <button onClick={()=>{}}>Update</button>
    <button onClick={()=>{}}>Delete</button>



</div>


    </div>
  );
}

export default listOfProduct;