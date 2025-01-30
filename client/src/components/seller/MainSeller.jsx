import React, { useState,useEffect} from "react";
import Listofproducts from './Listofproducts'

import axios from "axios";
function MainSeller() {
  
    const [product, setProduct] = useState([]);
  
  
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/Products/");
        console.log(response.data);
        setProduct(response.data);
      } catch (error) {
        throw error;
      }
    };
  
    useEffect(() => {
      fetch();
    }, []);

    return (
        <div>
     
          {<Listofproducts product={product} fetch={fetch}/>}
        </div>
      )
}

export default MainSeller
