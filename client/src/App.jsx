import { useState,useEffect } from 'react'
import './App.css'
import axios from 'axios'
import Main from './components/main'
import Login from './components/login';
import Detaile from './components/detailes';
// import List from './components/listProduct.Client'
import Register from './components/Register';
// import ListOfProduct from './components/seller/ListOfProduct';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from './components/CartContext';
import Cart from './components/cart';
import axios from "axios"
function App() {
 
    const [product, setproduct] = useState([]);

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
    <CartProvider>
      <Router>
      <Routes>
     {/* for both */}
     <Route path="/" element={<Main/>} />
       <Route path="/detailes" element={<Detaile/>}/>

       {/* <Route path="/profile" element={<profile/>}/> */}
       <Route path="/login" element={<Login/>}/>
       <Route path='/register' element={<Register/>}/>

       {/* <Route path="/list" element={<List/>}/> */}

         {/* client */}
       
        
        <Route path="/cart" element={<cart/>}/>
        <Route path="/Wishlist" element={<wishlist/>}/>
        
       {/* seller */}
        <Route path="/listofproduct" element={<Listofproducts />}/>
        <Route path="/add" element={<Addproduct fetch={fetch}/>}/>
        <Route path="/update" element={<Updateproduct fetch={fetch}/>}/>
        <Route path="/delete" element={<delete/>}/>
        <Route path="/main/seller" element={<MainSeller product={product} fetch={fetch}/> } />
    
      </Routes>
      </Router>
    </CartProvider>
  );
}


export default App;