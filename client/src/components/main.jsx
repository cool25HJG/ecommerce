import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiHeart, CiUser, CiShoppingCart } from "react-icons/ci";


function Main() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);


    const [currentSlide, setCurrentSlide] = useState(0);
  
    const slides = [
      { image: "", text: "Discover the latest trends!", button: "Shop Now" },
      { image: "", text: "Upgrade your home essentials", button: "Explore" },
      { image: "", text: "Find the best deals", button: "Check Offers" },
    ];
    const nextSlide = () => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    };


  return (
    <div>
      <nav className="navbar">
        <div className="navbar-container">
          {/* Left: Logo and Links */}
          <div className="navbar-left">
            <a className="navbar-brand" href="/">
              <img src="" alt="Logo" className="navbar-logo" />
            </a>
            <ul className="navbar-links">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/products">Products</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </div>

          {/* Center: Search Bar */}
          <div className="navbar-center">
            <form className="navbar-search">
              <input
                type="search"
                placeholder="Search"
                aria-label="Search"
                className="search-input"
              />
            </form>
          </div>

          {/* Right: Icons */}
          <div className="navbar-right">
            <CiShoppingCart
              onClick={() => navigate("/cart")}
              size={25}
              className="icon"
            />
            <CiHeart
              onClick={() => navigate("/wishlist")}
              size={25}
              className="icon"
            />
            <div
              className="icon dropdown"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <CiUser size={25} />
              {showDropdown && (
                <div className="dropdown-menu">
                  <button
                    className="dropdown-item"
                    onClick={() => navigate("/login")}
                  >
                    Log In
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h3>Categories</h3>

        <ul>
          {/* {categories.map((category, index) => ( */}
            {/* // <li key={index}>{category.name}</li> */}
            
          {/* ))} */}
        </ul>
      </aside>

      {/* Slider Section */}
      <div className="slider-container">
        <div className="slide">
          <img src={slides[currentSlide].image} alt="Slide" />
          <div className="slide-text">{slides[currentSlide].text}</div>
          <button className="slide-button" onClick={nextSlide}>{slides[currentSlide].button}</button>
        </div>
      </div>
    </div>




    </div>
  );
}

export default Main;
