import React from "react";
import { MdLocalShipping } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { RiSecurePaymentLine } from "react-icons/ri";
import play from '../assets/image/play.jpg'
import women from '../assets/image/weman.jpg'
import product from '../assets/image/product.jpg'

function Lastsection() {
  return (
    <div>
<section className="new-arrival">
      <h2>New Arrival</h2>
      <div className="arrival-grid">
        <div className="arrival-large">
          <div className="arrival-card dark-theme">
            <img src={play} alt="PlayStation 5" />
            <div className="arrival-content">
              <h3>PlayStation 5</h3>
              <p>Black and White version of the PS5 coming out on sale.</p>
              <button onClick={() => navigate('/category/gaming')}>Shop Now</button>
            </div>
          </div>
        </div>
        
        <div className="arrival-small">
          <div className="arrival-card dark-theme">
            <img src={women} alt="Women's Collections" />
            <div className="arrival-content">
              <h3>Women's Collections</h3>
              <p>Featured woman collections that give you another vibe.</p>
              <button onClick={() => navigate('/category/women')}>Shop Now</button>
            </div>
          </div>
        </div>
        
        <div className="arrival-small">
          <div className="arrival-card dark-theme">
            <img src={product} alt="product" />
            <div className="arrival-content">
              <h3>New products</h3>
              <p>new products collections that give you another vibe</p>
              <button onClick={() => navigate('/category')}>Shop Now</button>
            </div>
          </div>
        </div>
        
      
    
      </div>
    </section>


    <section className="service-features">
      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">
            <MdLocalShipping />
          </div>
          <h3>FREE AND FAST DELIVERY</h3>
          <p>Free delivery for all orders over $140</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <BiSupport />
          </div>
          <h3>24/7 CUSTOMER SERVICE</h3>
          <p>Friendly 24/7 customer support</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <RiSecurePaymentLine />
          </div>
          <h3>MONEY BACK GUARANTEE</h3>
          <p>We return money within 30 days</p>
        </div>
      </div>
    </section>
    </div>
  );
}

export default Lastsection;