import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CiHeart, CiUser, CiShoppingCart } from "react-icons/ci";
import axios from "axios";
import { CartContext } from "./CartContext";
import Cart from "./cart";
import Detailes from "./detailes"

function Main() {
  const navigate = useNavigate();
  const cart  = useContext(CartContext);
  console.log(cart , "caaart");
  
  const [showDropdown, setShowDropdown] = useState(false);
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentProd, setCurrentProd] = useState(null);
  const [visibleProducts, setVisibleProducts] = useState(12);

  const setCurrent = (current) => {
    setCurrentProd(current);
  };

  const fetchData = () => {
    axios
      .get("http://localhost:4000/api/Products/")
      .then((resp) => setData(resp.data))
      .catch((error) => console.log(error));
  };

  const fetchCategories = () => {
    axios
      .get("http://localhost:4000/api/Category/")
      .then((resp) => setCategories(resp.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
    fetchCategories();
  }, []);
console.log("data",data);

  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { image: "", text: "Discover the latest trends!", button: "Shop Now" },
    { image: "", text: "Upgrade your home essentials", button: "Explore" },
    { image: "", text: "Find the best deals", button: "Check Offers" },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  // Filter products based on search query
  const filteredProducts = data.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const loadMore = () => {
    setVisibleProducts(prev => prev + 12);
  };

  // Add this helper function at the top of your component
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-left">
        
              <h1  onClick={() => navigate("/")}alt="Logo" className="navbar-logo" >CoolStore</h1>
           
            <ul className="navbar-links">
              <li onClick={() => navigate("/")}>Home</li>
              <li onClick={() => navigate("/about")}>About</li>
              <li onClick={() => navigate("/team")}>team</li>
              <li onClick={() => navigate("/contact")}>Contact</li>
            </ul>
          </div>

          <div className="navbar-center">
            <form className="navbar-search" onSubmit={(e) => e.preventDefault()}>
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

      {/* Main Content */}
      <div className="container">
        <aside className="sidebar">
          <h3>Categories:</h3>
          <p>({categories.length} Categories)</p>
          <ul>
            {categories.map((category) => (
              <li key={category.id}>{category.name}</li>
            ))}
          </ul>
        </aside>

        <div className="main-content">
          {searchQuery ? (
            // Show filtered products with count
            <>
              <h2>Search Results for "{searchQuery}"</h2>
              <p>({filteredProducts.length} Products found)</p>
              {filteredProducts.slice(0, visibleProducts).map((el) => (
                <div key={el.id}>
                  <div className="column">
                    <div
                      style={{
                        border: "2px solid blue",
                        padding: "10px",
                        marginBottom: "20px",
                        background: "lightblue",
                      }}
                      className="product-card"
                    >
                      <img style={{ width: "200px" }} src={el.imageUrl} alt="" />
                      <h4>{el.name}</h4>
                      <p onClick={() => navigate(`/detaile/${el.id}`)} style={{ cursor: 'pointer' }}>
                        {truncateText(el.description, 20)}
                      </p>
                      <h4>{el.price}$</h4>
                      <h4>{el.stock}</h4>
                      <button onClick={() => navigate(`/detaile/${el.id}`)}>view more details</button>
                      <CiShoppingCart
                        onClick={() => cart.addToCart(el)}
                        size={25}
                        className="me-3"
                      />
                      <CiHeart size={25} className="me-3" onClick={() => cart.addToWishlist(el)}/>
                    </div>
                  </div>
                </div>
              ))}
              {filteredProducts.length === 0 && (
                <div className="no-results">
                  <p>No products found matching "{searchQuery}"</p>
                </div>
              )}
              {filteredProducts.length > visibleProducts && (
                <button onClick={loadMore} className="load-more-button">
                  See More
                </button>
              )}
            </>
          ) : (
            // Show all products with count
            <>
              <h2>All Products</h2>
              <p>({data.length} Products available)</p>
              {data.slice(0, visibleProducts).map((el) => (
                <div key={el.id}>
                  <div className="column">
                    <div
                      style={{
                        border: "2px solid blue",
                        padding: "10px",
                        marginBottom: "20px",
                        background: "lightblue",
                      }}
                      className="product-card"
                    >
                      <img style={{ width: "200px" }} src={el.imageUrl} alt="" />
                      <h4>{el.name}</h4>
                      <p onClick={() => navigate(`/detaile/${el.id}`)} style={{ cursor: 'pointer' }}>
                        {truncateText(el.description, 20)}
                      </p>
                      <h4>{el.price}</h4>
                      <h4>{el.stock}</h4>
                      <button onClick={() => navigate(`/detaile/${el.id}`)}>view more details</button>
                      <CiShoppingCart
                        onClick={() => cart.addToCart(el)}
                        size={25}
                        className="me-3"
                      />
                      <CiHeart size={25} className="me-3" onClick={() => cart.addToWishlist(el)}/>
                    </div>
                  </div>
                </div>
              ))}
              {data.length > visibleProducts && (
                <button onClick={loadMore} className="load-more-button">
                  See More
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Main;
