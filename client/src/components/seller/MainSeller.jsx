import React,{useState} from 'react'
import Listofproducts from './Listofproducts'
import { useNavigate } from 'react-router-dom';
function MainSeller({product,fetch}) {
  const navigate=useNavigate()
   
    return (
        <div>
         
          {<Listofproducts product={product} fetch={fetch}/>}
        </div>
      )
}

export default MainSeller
