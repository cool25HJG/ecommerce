import React, { useState, useContext, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CiHeart, CiUser, CiShoppingCart } from "react-icons/ci";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { CartContext } from "./CartContext";
import { logout } from "../store/reducer/login";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth); // Retrieve user from Redux
  const { orderItems, favorites } = useContext(CartContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ✅ Load user from localStorage on refresh
  useEffect(() => {
    if (!user) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        console.log("User loaded from localStorage", JSON.parse(storedUser));
      }
    }
  }, [user]);

  // ✅ Update cart and wishlist item counts
  useEffect(() => {
    setCartCount(orderItems.reduce((sum, item) => sum + item.quantity, 0));
    setWishlistCount(favorites.length);
  }, [orderItems, favorites]);

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // Navigate immediately when search is empty
    if (value.trim() === "") {
      navigate("/", { state: { searchQuery: "" } });
    }
  };

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/", { state: { searchQuery: searchQuery.trim() } });
  };

  // Handle home click
  const handleHomeClick = () => {
    setSearchQuery("");
    navigate("/", { state: { searchQuery: "" } });
  };

  // Handle logout
  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    localStorage.removeItem("user"); // ✅ Remove user from localStorage
    navigate("/login"); // Redirect to login page
  };

  // Handle dropdown close timer
  const startCloseTimer = () => {
    timeoutRef.current = setTimeout(() => {
      setShowDropdown(false);
    }, 1000);
  };

  // Clear dropdown close timer
  const clearCloseTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  // Handle mouse enter for dropdown
  const handleMouseEnter = () => {
    clearCloseTimer();
    setShowDropdown(true);
  };

  // Handle mouse leave for dropdown
  const handleMouseLeave = () => {
    startCloseTimer();
  };

  // Get dropdown items based on user role
  const getDropdownItems = () => {
    // Define common items for all authenticated users
    const commonItems = [
      { label: "Manage My Account", action: () => navigate("/profile") },
      { label: "Logout", action: handleLogout },
    ];

    // Define seller-specific items
    const sellerItems = [
      { label: "My Products", action: () => navigate("/main/seller") },
      { label: "Add Product", action: () => navigate("/main/seller/add") },
    ];

    // Handle unauthenticated users
    if (!user) {
      return [{ label: "Log In", action: () => navigate("/login") }];
    }

    // Handle seller role
    if (user.role === "seller") {
      return [...commonItems, ...sellerItems];
    }

    // Default case for other roles (e.g., buyer, admin)
    return commonItems;
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when navigating
  const handleNavigation = (path) => {
    setIsMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <h1 onClick={handleHomeClick} className="navbar-logo">
            CoolStore
          </h1>
          
          {/* Desktop Navigation */}
          <ul className="navbar-links desktop-nav">
            <li onClick={() => handleNavigation("/")}>Home</li>
            <li onClick={() => handleNavigation("/about")}>About</li>
            <li onClick={() => handleNavigation("/contact")}>Contact</li>
          </ul>
          
          {/* Mobile Menu Button */}
          <button className="mobile-menu-button" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <RiCloseLine size={24} /> : <RiMenu3Line size={24} />}
          </button>
        </div>

        {/* Search Bar */}
        <div className="navbar-center">
          <form className="navbar-search" onSubmit={handleSearch}>
            <input
              type="search"
              placeholder="Search products..."
              className="search-input"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </form>
        </div>

        {/* Icons Section */}
        <div className="navbar-right">
          <div className="cart-icon-wrapper">
            <CiShoppingCart
              onClick={() => handleNavigation("/cart")}
              size={25}
              className="icon"
            />
            {cartCount > 0 && (
              <span className="cart-notification">{cartCount}</span>
            )}
          </div>
          
          <div className="wishlist-icon-wrapper">
            <CiHeart
              onClick={() => handleNavigation("/wishlist")}
              size={25}
              className="icon"
            />
            {wishlistCount > 0 && (
              <span className="wishlist-notification">{wishlistCount}</span>
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

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <ul className="mobile-nav-links">
            <li onClick={() => handleNavigation("/")}>Home</li>
            <li onClick={() => handleNavigation("/about")}>About</li>
            <li onClick={() => handleNavigation("/contact")}>Contact</li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
