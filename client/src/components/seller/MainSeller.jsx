import React,{useState} from 'react'
import Listofproducts from './Listofproducts'
import { CiHeart, CiUser, CiShoppingCart } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
function MainSeller({product,fetch}) {
  const navigate=useNavigate()
    const [showDropdown, setShowDropdown] = useState(false);
    return (
        <div>
         
          {<Listofproducts product={product} fetch={fetch}/>}
        </div>
      )
}

export default MainSeller
