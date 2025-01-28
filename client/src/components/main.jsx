import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiHeart, CiUser, CiShoppingCart } from "react-icons/ci";


function Main() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-container">
          {/* Left: Logo and Links */}
          <div className="navbar-left">
            <a className="navbar-brand" href="/">
              <img src="/images/logo.png" alt="Logo" className="navbar-logo" />
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

      <h3>List of All Products</h3>
      <div className="column">
        <div key={""} className="product-card">
          <img src="" alt="" />
          <h4>Name</h4>
          <p>Description</p>
          <h4>Price</h4>
          <h4>Stock</h4>
          <CiShoppingCart size={25} className="me-3" />
          <CiHeart size={25} className="me-3" />
        </div>
      </div>
    </div>
  );
}

export default Main;
