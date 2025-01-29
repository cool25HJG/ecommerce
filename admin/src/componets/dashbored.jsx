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

      

          {/* Right: User Icon with Dropdown */}
          <li
            className="nav-item nav-user"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <CiUser size={25} />
            {showDropdown && (
              <div className="dropdown-menu">
                <button className="dropdown-item" > Profile</button>
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
            List of All Users
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
