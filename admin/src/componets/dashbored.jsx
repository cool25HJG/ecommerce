import React, { useState } from "react";
import { CiUser } from "react-icons/ci";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="dashboard-container">
      {/* Main Horizontal Navbar */}
      <nav className="main-nav">
        <ul className="nav-list">
          {/* Left: Dashboard Title */}
          <li className="nav-item nav-title">Dashboard</li>

          {/* Center: Search Bar */}
          <li className="nav-item nav-search">
            <form>
              <input
                className="form-control"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </form>
          </li>

          {/* Right: User Icon with Dropdown */}
          <li
            className="nav-item nav-user"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <CiUser size={25} />
            {showDropdown && (
              <div className="dropdown-menu">
                <button
                  className="dropdown-item"
                  onClick={() => navigate("/logout")}
                >
                  Log Out
                </button>
              </div>
            )}
          </li>
        </ul>
      </nav>

      {/* Vertical Sidebar */}
      <aside className="side-nav">
        <ul className="side-nav-list">
          <li
            className="side-nav-item"
            onClick={() => navigate("/clients")}
          >
            List of All Clients
          </li>
          <li
            className="side-nav-item"
            onClick={() => navigate("/sellers")}
          >
            List of All Sellers
          </li>
          <li
            className="side-nav-item"
            onClick={() => navigate("/products")}
          >
            List of All Products
          </li>
          <li
            className="side-nav-item"
            onClick={() => navigate("/categories")}
          >
            List of Categories
          </li>
          <li
            className="side-nav-item"
            onClick={() => navigate("/add-category")}
          >
            Add a Category
          </li>
        </ul>
      </aside>

      {/* Page Content */}
      <main className="page-content">
        <h1>Welcome to the Dashboard</h1>
        <p>Select an option from the side menu.</p>
      </main>
    </div>
  );
};

export default Dashboard;
