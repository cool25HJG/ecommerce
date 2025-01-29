import { useState, useEffect } from 'react';
import './App.css';
import Main from './components/Main';
import Login from './components/Login';
import Register from './components/Register';
// import ListOfProduct from './components/seller/ListOfProduct';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from './components/CartContext';
import Cart from './components/cart';
import axios from "axios"
import ProductDetails from "./components/detailes"
import ListOfProduct from "./components/seller/Listofproducts"
import AddProduct from "./components/seller/addproduct"
import Profile from './components/detailes';
import List from "./components/listProduct.Client"
import Wishlist from "./components/Wishlist"
import UpdateProduct from "./components/seller/updateproduct"
function App() {
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
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />

          <Route path="/cart" element={<Cart />} />
          <Route path="/detailes" element={<ProductDetails />} />
           <Route path="/profile" element={<Profile />}/> 
          <Route path="/login" element={<Login />} />
          <Route path='/register' element={<Register />} />
           <Route path="/list" element={<List />} /> 
          <Route path="/cart" element={<Cart />} />
           <Route path="/wishlist" element={<Wishlist />}/>
          <Route path="/listofproduct" element={<ListOfProduct />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/update" element={<UpdateProduct />} />
          <Route path="/delete" element={<Delete />} /> 
        </Routes>
      </Router>
    </CartProvider>
  );
}


export default App;
