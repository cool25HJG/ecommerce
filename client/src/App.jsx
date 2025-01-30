import { useState,useEffect } from 'react'
import './App.css'
import axios from 'axios'
import Main from './components/main'
import Login from './components/Login';
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
import Profile from "./components/profile"
import Wishlist from './components/Wishlist';
import PaymentForm from './components/PaymentForm';

function App() {
 
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/payment" element={<PaymentForm />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/detaile/:id" element={<Detaile />} />
           <Route path="/profile" element={<Profile />}/> 
          <Route path="/login" element={<Login />} />
          <Route path='/register' element={<Register />} />
          {/* <Route path="/list" element={<List />} /> */}
          <Route path="/cart" element={<Cart />} /> {/* Render Cart component for /cart route */}
          <Route path="/wishlist" element={<Wishlist />} />

          <Route path="/listofproduct" element={<Listofproducts />}/>
        <Route path="/add" element={<Addproduct />}/>
        <Route path="/update" element={<Updateproduct />}/>
        <Route path="/main/seller" element={<MainSeller /> } />
        </Routes>
      </Router>
    </CartProvider>
  );
}


export default App;