import React, { useState } from "react";
import axios from 'axios'
// import { useNavigate } from 'react-router-dom';

function listOfProduct() {
// const navigate=useNavigate()
const [product, setproduct] = useState([]);
const getallproduct = async () => {
  try {
    const response = await axios.get("http://localhost:4000/api/Products/");
    console.log(response.data);
    setproduct(response.data);
  } catch (error) {
    throw error;
  }
};

  return (
    <div> 
{      product.map((el) => {
                      return  (
                      <div key={el.id}>
                      <Oneproduct
                      product={product}
                      />  
                    </div>
                    )
      })}

  
    </div>
  );
}

export default listOfProduct;