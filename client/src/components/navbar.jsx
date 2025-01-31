import React, { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CiHeart, CiUser, CiShoppingCart } from "react-icons/ci";
import { useSelector } from "react-redux";

function Navbar() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/", { state: { searchQuery } });
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
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>

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
