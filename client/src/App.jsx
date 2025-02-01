import { useState,useEffect } from 'react'
import './App.css'
import axios from 'axios'
import Main from './components/main'
import Login from './components/Login';
import Detaile from './components/detailes';

import Register from './components/Register';
import Listofproducts from './components/seller/Listofproducts';
import Updateproduct from './components/seller/updateproduct';
import Addproduct from './components/seller/addproduct';
// import MainSeller from './components/seller/MainSeller';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from './components/CartContext';
import Cart from './components/cart';
import Profile from "./components/profile"
import Wishlist from './components/Wishlist';
import PaymentForm from './components/PaymentForm';
import Navbar from './components/navbar';
import Footer from './components/footer';
import ReviewList from './components/ReviewList'
import About from './components/about';
import Contact from './components/contact';
function App() {
  const [product, setProduct] = useState([]);

  const fetch = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_HOST+"/api/Products/");
      console.log(response.data);
      setProduct(response.data);
    } catch (error) {
      throw error;
    }
  };

  return (
    <CartProvider>
      <BrowserRouter>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Main />} />
              {/* pages */}
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />

              <Route path="/payment" element={<PaymentForm />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/detaile" element={<Detaile />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/wishlist" element={<Wishlist />} />

              <Route path="/main/seller" element={<Listofproducts  product={product} fetch={fetch} />} />
              <Route path="/main/seller/add" element={<Addproduct fetch={fetch} />} />
              <Route path="/update" element={<Updateproduct fetch={fetch} />} />
              <Route path="/review" element={<ReviewList  />} />
              {/* <Route
                path="/main/seller"
                element={<MainSeller product={product} fetch={fetch} />}
              /> */}
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;