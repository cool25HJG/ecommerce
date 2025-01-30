import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  CiFacebook, 
  CiTwitter, 
  CiInstagram, 
  CiLinkedin, 
  CiMail, 
  CiLocationOn, 
  CiPhone,
  CiShoppingCart,
  CiUser,
  CiHeart,
  CiCircleQuestion,
  CiLock,
  CiShop,
  CiMobile3
} from 'react-icons/ci';
import { IoIosArrowForward } from 'react-icons/io';
import './App.css';

function Footer() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Subscribed email:", email);
    setEmail("");
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Exclusive Section */}
        <div className="footer-section">
          <h3>Exclusive</h3>
          <div className="subscribe">
            <h4>Subscribe</h4>
            <p>Get 10% off your first order</p>
            <form onSubmit={handleSubmit} className="subscribe-form">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit">
                <IoIosArrowForward />
              </button>
            </form>
          </div>
        </div>

        {/* Support Section */}
        <div className="footer-section">
          <h3>Support</h3>
          <p><CiLocationOn size={20} /> 111 Bijoy sarani, Dhaka,</p>
          <p className="indent">DH 1515, Bangladesh.</p>
          <p><CiMail size={20} /> exclusive@gmail.com</p>
          <p><CiPhone size={20} /> +88015-88888-9999</p>
        </div>

        {/* Account Section */}
        <div className="footer-section">
          <h3>Account</h3>
          <ul>
            <li onClick={() => navigate("/profile")}><CiUser size={20} /> My Account</li>
            <li onClick={() => navigate("/login")}><CiLock size={20} /> Login / Register</li>
            <li onClick={() => navigate("/cart")}><CiShoppingCart size={20} /> Cart</li>
            <li onClick={() => navigate("/wishlist")}><CiHeart size={20} /> Wishlist</li>
            <li onClick={() => navigate("/shop")}><CiShop size={20} /> Shop</li>
          </ul>
        </div>

        {/* Quick Link Section */}
        <div className="footer-section">
          <h3>Quick Link</h3>
          <ul>
            <li onClick={() => navigate("/privacy-policy")}><CiLock size={20} /> Privacy Policy</li>
            <li onClick={() => navigate("/terms")}><CiCircleQuestion size={20} /> Terms Of Use</li>
            <li onClick={() => navigate("/faq")}><CiCircleQuestion size={20} /> FAQ</li>
            <li onClick={() => navigate("/contact")}><CiPhone size={20} /> Contact</li>
          </ul>
        </div>

        {/* Download App Section */}
        <div className="footer-section">
          <h3>Download App</h3>
          <p className="save-text">Save $3 with App New User Only</p>
          <div className="qr-section">
            <div className="qr-code">
              {/* Add your QR code image here */}
              <img src="/path-to-qr-code.png" alt="QR Code" />
            </div>
            <div className="app-buttons">
              <button className="app-store">
                <CiMobile3 size={20} /> Google Play
              </button>
              <button className="app-store">
                <CiMobile3 size={20} /> App Store
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="social-links">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <CiFacebook size={25} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <CiTwitter size={25} />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <CiInstagram size={25} />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <CiLinkedin size={25} />
        </a>
      </div>

      {/* Copyright */}
      <div className="copyright">
        <p>© Copyright Rimel 2022. All right reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
