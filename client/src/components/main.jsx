import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CiHeart, CiUser, CiShoppingCart } from "react-icons/ci";
import axios from "axios"

function Main() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
 
    const [data, setData] = useState([]);
    const fetchData = () => {
        axios
          .get("http://localhost:4000/api/Products/")
          .then((resp) => setData(resp.data))
          .catch((error) => console.log(error));
      };

useEffect(()=>{fetchData()},[])
console.log(data);









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
      <div>
        
        {data.map((el)=>(
            <div key={el.id}>
          <div  className="column">
            <div style={{border: "2px solid blue", padding: "10px",  marginBottom: "20px", background: "lightblue", padding: "10px" }}  key={""} className="product-card">
              <img style={{width:"200px"}} src={el.imageUrl} alt="" />
              <h4>{el.name}</h4>
              <p>{el.description}</p>
              <h4>{el.price}</h4>
              <h4>{el.stock}</h4>
              <CiShoppingCart size={25} className="me-3" />
              <CiHeart size={25} className="me-3" />
              </div>
              </div>  
              </div>
            ))}
    </div>
    </div>
  );
}

export default Main
