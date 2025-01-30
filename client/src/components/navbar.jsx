import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiHeart, CiUser, CiShoppingCart } from "react-icons/ci";

function Navbar() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/", { state: { searchQuery } });
  };

  const handleHomeClick = () => {
    setSearchQuery("");
    navigate("/", { state: { searchQuery: "" } });
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
            <li onClick={() => navigate("/team")}>team</li>
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
                <button
                  className="dropdown-item"
                  onClick={() => navigate("/profile")}
                >
                  Manage My Account
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
