import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/reducer/login";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(formData))
      .unwrap()
      .then((response) => {
        const userRole = response?.user?.role;

        // ✅ Save user info to localStorage for persistence
        localStorage.setItem("user", JSON.stringify(response?.user));

        if (userRole === "admin") {
          window.location.href = "http://localhost:5173/";
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          <p className="auth-switch" onClick={() => navigate("/register")}>
            Don't have an account? <span>Register</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
