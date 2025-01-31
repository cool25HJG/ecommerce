import React, { useState, useContext, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CiHeart, CiUser, CiShoppingCart } from "react-icons/ci";
import { useSelector } from "react-redux";
import { CartContext } from "./CartContext"; // Import the CartContext

function Navbar() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { orderItems, favorites } = useContext(CartContext); // Use the CartContext to get orderItems and favorites
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);
console.log("faaaaav",favorites);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/", { state: { searchQuery } });
  };
// Reset search when the input is cleared
const handleSearchChange = (e) => {
  setSearchQuery(e.target.value);
  if (e.target.value.trim() === "") {
    navigate("/", { state: { searchQuery: "" } });
  }
}; 

  const handleHomeClick = () => {
    setSearchQuery("");
    navigate("/", { state: { searchQuery: "" } });
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.reload();
  };

  const startCloseTimer = () => {
    timeoutRef.current = setTimeout(() => {
      setShowDropdown(false);
    }, 1000);
  };

  const clearCloseTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleMouseEnter = () => {
    clearCloseTimer();
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    startCloseTimer();
  };

  const getDropdownItems = () => {
    if (!user) {
      return [
        { label: "Log In", action: () => navigate("/login") },
        // extra for testing

        { label: "Manage My Account", action: () => navigate("/profile") },
        { label: "My Products", action: () => navigate("/main/seller") },
        { label: "add product", action: () => navigate("/main/seller/add") },
      ];
    }

    if (user.role === "seller") {
      return [
        { label: "Manage My Account", action: () => navigate("/profile") },
        { label: "My Products", action: () => navigate("/main/seller") },
        { label: "My Orders", action: () => navigate("/") },
        { label: "My Reviews", action: () => navigate("/") },
        { label: "Logout", action: handleLogout }
      ];
    }

    return [
      { label: "Manage My Account", action: () => navigate("/profile") },
      { label: "My Orders", action: () => navigate("/orders") },
      { label: "My Reviews", action: () => navigate("/reviews") },
      { label: "Logout", action: handleLogout }
    ];
  };

  const getItemsCount = () => {
    return orderItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getWishlistCount = () => {
    return favorites.length;
  };
  
console.log("favorite",favorites.length);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <h1 onClick={handleHomeClick} alt="Logo" className="navbar-logo">
            CoolStore
          </h1>
          <ul className="navbar-links">
            <li onClick={handleHomeClick}>Home</li>
            <li onClick={() => navigate("/about")}>About</li>
            <li onClick={() => navigate("/contact")}>Contact</li>
          </ul>
        </div>

        <div className="navbar-center">
          <form className="navbar-search" onSubmit={handleSearch}>
            <input
              type="search"
              placeholder="Search products..."
              aria-label="Search"
              className="search-input"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </form>
        </div>

        <div className="navbar-right">
          <div className="cart-icon-wrapper">
            <CiShoppingCart
              onClick={() => navigate("/cart")}
              size={25}
              className="icon"
            />
            {getItemsCount() > 0 && (
              <span 
                className="cart-notification"
                style={{ 
                  position: "absolute",
                  backgroundColor: "red",
                  color: "white",
                  borderRadius: "50%", 
                  padding: "2px 6px",
                  fontSize: "12px",
                }}
              >
                {getItemsCount()}
              </span>
            )}
          </div>
          <div className="wishlist-icon-wrapper">
            <CiHeart
              onClick={() => navigate("/wishlist")}
              size={25}
              className="icon"
            />
            {getWishlistCount() > 0 && (
              <span 
                className="wishlist-notification"
                style={{ 
                  position: "absolute",
                  backgroundColor: "red",
                  color: "white",
                  borderRadius: "50%", 
                  padding: "2px 6px",
                  fontSize: "12px",
                }}
              >
                {getWishlistCount()}
              </span>
            )}
          </div>
          <div
            className="icon dropdown"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={dropdownRef}
          >
            <CiUser size={25} />
            {showDropdown && (
              <div 
                className="dropdown-menu"
                onClick={(e) => e.stopPropagation()}
                onMouseEnter={clearCloseTimer}
                onMouseLeave={startCloseTimer}
              >
                {getDropdownItems().map((item, index) => (
                  <button
                    key={index}
                    className="dropdown-item"
                    onClick={() => {
                      item.action();
                      setShowDropdown(false);
                      clearCloseTimer();
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;