import { useState,useEffect } from 'react'
import './App.css'
import axios from 'axios'
import Main from './components/main'
import Login from './components/login';
import Detaile from './components/detailes';
// import List from './components/listProduct.Client'
import Register from './components/Register';
import Listofproducts from './components/seller/Listofproducts';
import Updateproduct from './components/seller/updateproduct';
import Addproduct from './components/seller/addproduct';
import MainSeller from './components/seller/MainSeller';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from './components/CartContext';
import Cart from './components/cart';
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
          <Route path="/" element={<Main />} />
          {/* <Route path="/detailes" element={<ProductDetails />} /> */}
          {/* <Route path="/profile" element={<Profile />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path='/register' element={<Register />} />
          {/* <Route path="/list" element={<List />} /> */}
          <Route path="/cart" element={<Cart />} /> {/* Render Cart component for /cart route */}
          {/* <Route path="/wishlist" element={<Wishlist />} /> */}

          <Route path="/listofproduct" element={<Listofproducts />}/>
        <Route path="/add" element={<Addproduct fetch={fetch}/>}/>
        <Route path="/update" element={<Updateproduct fetch={fetch}/>}/>
        <Route path="/main/seller" element={<MainSeller product={product} fetch={fetch}/> } />
        </Routes>
      </Router>
    </CartProvider>
  );
}


export default App;