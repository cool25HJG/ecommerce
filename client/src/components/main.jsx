import 
// React,
 { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiHeart, CiUser, CiShoppingCart } from "react-icons/ci";

function Main() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div> 
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
      <div className="container">
        {/* Logo */}
        <a className="navbar-brand" href="/">
          <img
            src="/images/logo.png" // Replace with your logo's path
            alt="Logo"
            style={{ height: "40px" }}
          />
        </a>

        {/* Navbar Links and Content */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Left Side (Nav Links) */}
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/products">
                Products
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact">
                Contact
              </a>
            </li>
          </ul>

          {/* Center (Search Bar) */}
          <form className="d-flex mx-auto" style={{ maxWidth: "400px" }}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form>

          {/* Right Side (Icons) */}
          <div className="d-flex align-items-center">
            <CiShoppingCart onClick={() => navigate("/cart")} size={25} className="me-3" />
            <CiHeart onClick={() => navigate("/wishlist")} size={25} className="me-3" />

            {/* Dropdown for User */}
            <div
              className="dropdown"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
              style={{ position: "relative" }}
            >
              <CiUser size={25} />
              {/* will change if if the user is loged in 
              not exactly like this 

  {showDropdown && (
                <div
                  className="dropdown-menu show"
                  style={{
                    position: "absolute",
                    top: "100%",
                    right: 0,
                    zIndex: 1000,
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    borderRadius: "5px",
                  }}
                >
                  <button
                    className="dropdown-item"
                    onClick={() => navigate("/profile")}
                  >
                    mange my accoute
                  </button>
                <button
                    className="dropdown-item"
                    onClick={() => navigate("/login")}
                  >
                    log out 
                  </button>
                </div>


              */}
              {showDropdown && (
                <div
                  className="dropdown-menu show"
                  style={{
                    position: "absolute",
                    top: "100%",
                    right: 0,
                    zIndex: 1000,
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    borderRadius: "5px",
                  }}
                >
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
      </div>
    </nav>
<h3> list of product  </h3>



    </div>
  );
}

export default Main;
