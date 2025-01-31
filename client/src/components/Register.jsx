import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { registerStart, registerSuccess, registerFailure } from "../store/reducer/login"
import { CiUser, CiLock, CiMail, CiPhone, CiImageOn, CiLocationOn } from "react-icons/ci";
import "./Login.css";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName:"",
    phoneNumber:"",
    email: "",
    password: "",
    image:"",
    adresse:"",
    role: "client"
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(registerStart());

    try {
      const response = await axios.post("http://localhost:4000/api/user/register", formData);
      dispatch(registerSuccess(response.data));
      navigate("/login"); // Redirect to login after successful registration
    } catch (error) {
      dispatch(registerFailure(error.response?.data?.message || "Registration failed"));
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Create Account</h2>
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <div className="input-icon">
              <CiUser className="icon" />
              <input
                id="firstName"
                type="text"
                name="firstName"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <div className="input-icon">
              <CiUser className="icon" />
              <input
                id="lastName"
                type="text"
                name="lastName"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <div className="input-icon">
              <CiPhone className="icon" />
              <input
                id="phoneNumber"
                type="tel"
                name="phoneNumber"
                placeholder="Enter your phone number"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-icon">
              <CiMail className="icon" />
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-icon">
              <CiLock className="icon" />
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="image">Image URL</label>
            <div className="input-icon">
              <CiImageOn className="icon" />
              <input
                id="image"
                type="text"
                name="image"
                placeholder="Enter your image URL"
                value={formData.image}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="adresse">Address</label>
            <div className="input-icon">
              <CiLocationOn className="icon" />
              <input
                id="adresse"
                type="text"
                name="adresse"
                placeholder="Enter your address"
                value={formData.adresse}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="role">Account Type</label>
            <select 
              id="role"
              name="role" 
              value={formData.role} 
              onChange={handleChange}
              className="role-select"
            >
              <option value="client">Client</option>
              <option value="seller">Seller</option>
            </select>
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

          <p className="auth-switch" onClick={() => navigate("/login")}>
            Already have an account? <span>Sign In</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;