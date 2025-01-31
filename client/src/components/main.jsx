// Main.js
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CiHeart, CiShoppingCart } from "react-icons/ci";
import axios from "axios";
import { CartContext } from "./CartContext";
import ReviewList from './ReviewList';
import ReviewForm from './Reviewform';

function Main() {
  const navigate = useNavigate();
  const location = useLocation();
  const cart = useContext(CartContext);
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleProducts, setVisibleProducts] = useState(12);
  const [refreshKey, setRefreshKey] = useState(0);

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

  useEffect(() => {
    if (location.state?.searchQuery) {
      setSearchQuery(location.state.searchQuery);
    }
  }, [location]);

  const filteredProducts = data.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const loadMore = () => {
    setVisibleProducts((prev) => prev + 12);
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  const handleReviewSubmitted = () => {
    setRefreshKey((prev) => prev + 1); // Increment refreshKey to trigger re-fetch
  };

  const toggleFavorite = async (productId) => {
    try {
      await axios.put(`http://localhost:4000/api/Products/toggle-favorite/${productId}`);
      fetchData(); // Refresh data after toggling favorite
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <div>
      {searchQuery ? (
        <div className="search-results-header">
          <h2>Search Results for "{searchQuery}"</h2>
          <p>({filteredProducts.length} Products found)</p>
        </div>
      ) : (
        <div className="search-results-header">
          <h2>All Products</h2>
          <p>({data.length} Products available)</p>
        </div>
      )}

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
          <div className="products-grid">
            {(searchQuery ? filteredProducts : data)
              .slice(0, visibleProducts)
              .map((el) => (
                <div key={el.id} className="product-card">
                  <div className="product-image-container">
                    <img src={el.imageUrl} alt={el.name} />
                    <div className="product-overlay-icons">
                      <div className="icon-circle">
                        <CiShoppingCart onClick={() => cart.addToCart(el)} />
                      </div>
                      <div className="icon-circle">
                        <CiHeart
                          onClick={() => toggleFavorite(el.id)}
                          style={{ color: el.isFavorite ? "red" : "gray" }}
                        />
                      </div>
                    </div>
                  </div>
                  <h4>{el.name}</h4>
                  <p onClick={() => navigate("/detaile",{state:{product:el}})}>{truncateText(el.description, 20)}</p>
                  <h4>${el.price}</h4>
                  <ReviewList productId={el.id} refreshKey={refreshKey} />
                  <ReviewForm productId={el.id} onReviewSubmitted={handleReviewSubmitted} />
                  <div className="product-actions">
                    <button onClick={() => navigate("/detaile",{state:{product:el}})}>View Details</button>
                  </div>
                </div>
              ))}
          </div>
          
          {searchQuery ? (
            filteredProducts.length > visibleProducts && (
              <button onClick={loadMore} className="load-more-button">
                See More
              </button>
            )
          ) : (
            data.length > visibleProducts && (
              <button onClick={loadMore} className="load-more-button">
                See More
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Main;