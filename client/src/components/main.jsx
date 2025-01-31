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
  const { favorites, toggleFavorite, addToCart } = useContext(CartContext);
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleProducts, setVisibleProducts] = useState(12);
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null); // State for selected category

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

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
  };

  const resetCategoryFilter = () => {
    setSelectedCategory(null);
  };

  const filteredProducts = data.filter((product) => {
    const matchSearchQuery = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = !selectedCategory || product.categoryId === selectedCategory;
    return matchSearchQuery && matchCategory;
  });

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
            <li >
              <button className={!selectedCategory ? "active" : ""} onClick={resetCategoryFilter}>
                All Products
              </button>
            </li>
            {categories.map((category) => (
              <li key={category.id}>
                <button
                  className={category.id === selectedCategory ? "active" : ""}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div className="main-content">
          <div className="products-grid">
            {filteredProducts
              .slice(0, visibleProducts)
              .map((el) => (
                <div key={el.id} className="product-card">
                  <div className="product-image-container">
                    <img src={el.imageUrl} alt={el.name} />
                    <div className="product-overlay-icons">
                      <div className="icon-circle">
                        <CiShoppingCart onClick={() => addToCart(el)}    style={{ 
                          
                            strokeWidth: "1",
                            cursor: "pointer",
                            fontSize: "1.5em"
                          }} />
                      </div>
                      <div className="icon-circle">
                        <CiHeart
                          onClick={() => toggleFavorite(el.id)}
                          style={{ 
                            color: isFavorite(el.id) ? "#00ff00" : "#333333",
                            fill: isFavorite(el.id) ? "#00ff00" : "transparent",
                            stroke: isFavorite(el.id) ? "#00ff00" : "#333333",
                            strokeWidth: "1",
                            cursor: "pointer",
                            fontSize: "1.5em"
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <h4>{el.name}</h4>
                  <p onClick={() => navigate(`/detail/${el.id}`)}>
                    {truncateText(el.description, 20)}
                  </p>
                  <h4>${el.price}</h4>
                  <ReviewList productId={el.id} refreshKey={refreshKey} />
                  <ReviewForm productId={el.id} onReviewSubmitted={handleReviewSubmitted} />
                  <div className="product-actions">
                    <button onClick={() => navigate(`/detail/${el.id}`)}>
                      View Details
                    </button>
                  </div>
                </div>
              ))}
          </div>

          {filteredProducts.length > visibleProducts && (
            <button onClick={loadMore} className="load-more-button">
              See More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Main;
