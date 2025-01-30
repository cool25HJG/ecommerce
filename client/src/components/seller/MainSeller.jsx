import React,{useState} from 'react'
import Listofproducts from './Listofproducts'
import { CiHeart, CiUser, CiShoppingCart } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
function MainSeller({product,fetch}) {
  const navigate=useNavigate()
    const [showDropdown, setShowDropdown] = useState(false);
    return (
        <div>
          {/* Navbar */}
                <nav className="navbar">
                  <div className="navbar-container">
                    <div className="navbar-left">
                      <a className="navbar-brand" href="/">
                        <img src="https://via.placeholder.com/100x40" alt="Logo" className="navbar-logo" />
                      </a>
                      <ul className="navbar-links">
                        <li><a href="/">Home</a></li>
                        <li><a onClick={()=>navigate("/main/seller/add")}>addProducts</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/contact">Contact</a></li>
                      </ul>
                    </div>
          
                    <div className="navbar-center">
                      <form className="navbar-search" onSubmit={(e) => e.preventDefault()}>
                        <input 
                          type="search" 
                          placeholder="Search products..." 
                          aria-label="Search" 
                          className="search-input"
                          
                        />
                      </form>
                    </div>
          
                    <div className="navbar-right">
                      <CiShoppingCart onClick={() => navigate("/cart")} size={25} className="icon" />
                      <CiHeart onClick={() => navigate("/wishlist")} size={25} className="icon" />
                      <div
                        className="icon dropdown"
                        onMouseEnter={() => setShowDropdown(true)}
                        onMouseLeave={() => setShowDropdown(false)}
                      >
                        <CiUser size={25} />
                        {showDropdown && (
                          <div className="dropdown-menu">
                            
                              <button className="dropdown-item" onClick={() => navigate("/login")}>
                                Log In
                              </button>
                            
                          
                                <button className="dropdown-item" onClick={() => navigate("/profile")}>
                                  Manage My Account
                                </button>
                                {/* <button className="dropdown-item" onClick={handleLogout}>
                                  Log Out
                                </button> */}
                              
                         
                          </div>
                        )}
                       
                      </div>
                    </div>
                  </div>
                </nav>
          {<Listofproducts product={product} fetch={fetch}/>}
        </div>
      )
}

export default MainSeller
