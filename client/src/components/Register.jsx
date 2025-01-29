import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
      role: "client", 
    });
  
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError(null);
  
      try {
        const response = await axios.post("http://localhost:4000/auth/register", formData);
        console.log("Registration successful:", response.data);
  
        navigate("/login"); // Redirect to login page after successful registration
      } catch (error) {
        setError(error.response?.data?.message || "Registration failed.");
        console.error("Registration error:", error);
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div className="register-container">
        <h2>Register</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="client">Client</option>
            <option value="seller">Seller</option>
          </select>
          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p onClick={() => navigate("/login")} className="toggle-form">
          Already have an account? Login
        </p>
      </div>
    );
}

export default Register
