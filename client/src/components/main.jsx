import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CiHeart, CiUser, CiShoppingCart } from "react-icons/ci";
import axios from "axios";
import Detaile from "./detailes";

function Main() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // Sample slides (replace with real images)
  const slides = [
    { image: "https://via.placeholder.com/600x300", text: "Discover the latest trends!", button: "Shop Now" },
    { image: "https://via.placeholder.com/600x300", text: "Upgrade your home essentials", button: "Explore" },
    { image: "https://via.placeholder.com/600x300", text: "Find the best deals", button: "Check Offers" },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  // Fetch Products & Categories from API
  const fetchData = async () => {
    try {
      const productsResponse = await axios.get("http://localhost:4000/api/Products");
      setProducts(productsResponse.data);
      const categoriesResponse = await axios.get("http://localhost:4000/api/Category");
      setCategories(categoriesResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-left">
            <a className="navbar-brand" href="/">
              <img src="https://via.placeholder.com/100x40" alt="Logo" className="navbar-logo" />
            </a>
            <ul className="navbar-links">
              <li><a href="/">Home</a></li>
              <li><a href="/products">Products</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          <div className="navbar-center">
            <form className="navbar-search">
              <input type="search" placeholder="Search" aria-label="Search" className="search-input" />
            </form>
          </div>

          <div className="navbar-right">
            <CiShoppingCart onClick={() => navigate("/cart")} size={25} className="icon" />
            <CiHeart onClick={() => navigate("/wishlist")} size={25} className="icon" />
            <div
              className="icon dropdown"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <CiUser size={25} />
              {showDropdown && (
                <div className="dropdown-menu">
                  <button className="dropdown-item" onClick={() => navigate("/login")}>Log In</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container">
        {/* Sidebar */}
        <aside className="sidebar">
          <h3>Categories:</h3>
          <ul>
            {categories.map((category, index) => (
              <li key={index}>{category.name}</li>
            ))}
          </ul>
        </aside>

        {/* Slider */}
        <div className="slider-container">
          <div className="slide">
            <img src={slides[currentSlide].image} alt="Slide" />
            <div className="slide-text">{slides[currentSlide].text}</div>
            <button className="slide-button" onClick={nextSlide}>{slides[currentSlide].button}</button>
          </div>
        </div>
      </div>

      {/* Product List */}
      <div>
      <h2>Product List</h2>
      <div className="product-list">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-card"
            style={{ border: "2px solid blue", padding: "10px", marginBottom: "20px", background: "lightblue" }}
            // Navigate to the details page
          >
            <img   style={{ width: "200px" }} src={product.imageUrl} alt={product.name} />
            <h4>{product.name}</h4>
            <p>{product.description}</p>
            <h4>Price: {product.price} $</h4>
            <h4>Stock: {product.stock}</h4>
            <button  onClick={() => navigate(`/detailes/${product.id}`)} >view more detailes</button>
            <CiShoppingCart size={25} className="me-3" />
            <CiHeart size={25} className="me-3" />
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default Main;
