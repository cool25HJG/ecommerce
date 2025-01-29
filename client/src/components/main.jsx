<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CiHeart, CiUser, CiShoppingCart } from "react-icons/ci";
import axios from "axios";
import Detaile from "./detailes";
=======
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CiHeart, CiUser, CiShoppingCart } from "react-icons/ci";
import axios from "axios";
import { CartContext } from "./CartContext";
import Cart from "./cart";
>>>>>>> 69a920c63e236c447fc36697a1c71c7a46aa2fee

function Main() {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [showDropdown, setShowDropdown] = useState(false);
<<<<<<< HEAD
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
=======
  const [data, setData] = useState([]);
  const [currentProd, setCurrentProd] = useState(null);

  const setCurrent = (current) => {
    setCurrentProd(current);
  };

  const fetchData = () => {
    axios
      .get("http://localhost:4000/api/Products/")
      .then((resp) => setData(resp.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { image: "", text: "Discover the latest trends!", button: "Shop Now" },
    { image: "", text: "Upgrade your home essentials", button: "Explore" },
    { image: "", text: "Find the best deals", button: "Check Offers" },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };
>>>>>>> 69a920c63e236c447fc36697a1c71c7a46aa2fee

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
<<<<<<< HEAD
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
=======
        <aside className="sidebar">
          <h3>Categories :</h3>
          <ul>
            {/* {categories.map((category, index) => ( */}
            {/* // <li key={index}>{category.name}</li> */}
            {/* ))} */}
          </ul>
        </aside>

>>>>>>> 69a920c63e236c447fc36697a1c71c7a46aa2fee
        <div className="slider-container">
          <div className="slide">
            <img src={slides[currentSlide].image} alt="Slide" />
            <div className="slide-text">{slides[currentSlide].text}</div>
<<<<<<< HEAD
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
=======
            <button className="slide-button" onClick={nextSlide}>
              {slides[currentSlide].button}
            </button>
          </div>
        </div>
      </div>
      <div>
        {data.map((el) => (
          <div key={el.id}>
            <div className="column">
              <div
                style={{
                  border: "2px solid blue",
                  padding: "10px",
                  marginBottom: "20px",
                  background: "lightblue",
                }}
                key={""}
                className="product-card"
              >
                <img style={{ width: "200px" }} src={el.imageUrl} alt="" />
                <h4>{el.name}</h4>
                <p>{el.description}</p>
                <h4>{el.price}</h4>
                <h4>{el.stock}</h4>
                <CiShoppingCart
                  onClick={() => addToCart(el)}
                  size={25}
                  className="me-3"
                />
                <CiHeart size={25} className="me-3" />
              </div>
            </div>
          </div>
        ))}
      </div>
>>>>>>> 69a920c63e236c447fc36697a1c71c7a46aa2fee
    </div>
  );
}

<<<<<<< HEAD
export default Main;
=======
export default Main;
>>>>>>> 69a920c63e236c447fc36697a1c71c7a46aa2fee
