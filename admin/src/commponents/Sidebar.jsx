import React, { useState } from 'react';

function Sidebar({ changeView, addCategory }) {
  const [name, setName] = useState("");
  const [show, setShow] = useState("");
  const [activeLink, setActiveLink] = useState("home"); // State to track the active link

  const toggle = (action) => {
    if (show === action) {
      setShow("");
    } else {
      setShow(action);
    }
  };

  const handleLinkClick = (view, link) => {
    changeView(view);
    setActiveLink(link); // Update active link when a sidebar link is clicked
    setShow(""); // Close any open submenu if the link is clicked
  };

  return (
    <div>
      <div className="sidebar">
      <a
          className={activeLink === "dashboard" ? "active" : ""}
          href="#dashboard"
          onClick={() => handleLinkClick("dashboard", "dashboard")}
        >
          Dashboard
        </a>
        <a
          className={activeLink === "user" ? "active" : ""}
          href="#user"
          onClick={() => handleLinkClick("user", "user")}
        >
          List Users
        </a>
        <a
          className={activeLink === "product" ? "active" : ""}
          href="#product"
          onClick={() => handleLinkClick("product", "product")}
        >
          List Product
        </a>
        <a
          className={activeLink === "category" ? "active" : ""}
          href="#category"
          onClick={() =>{ handleLinkClick("category", "category"),toggle("wari")}}
        >
          List Categories
        </a>
        {show === "wari" && (
          <a href="#" onClick={() => toggle("yes")}>
            Add Category
          </a>
        )}
        {show === "yes" && (
          <div style={{ display: "flex", justifyContent: "center", marginTop: "5px" }}>
            <input
              className="form-control"
              type="text"
              placeholder="Enter category name"
              aria-label="Enter category name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}
        {show === "yes" && (
          <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                addCategory({ name });
                changeView("category");
                toggle("houssem");
              }}
            >
              ADD
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
