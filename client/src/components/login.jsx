import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
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
    dispatch({ type: "AUTH_START" });

    try {
      const response = await axios.post("http://localhost:4000/api/user/login", formData);
      const { accessToken, refreshToken, user } = response.data;

      if (!user) {
        throw new Error("User data is missing in the response");
      }

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      dispatch({ type: "AUTH_SUCCESS", payload: response.data });

      // Redirect based on role
      if (user.role === "admin") {
        window.location.href = "http://localhost:5173/";
      } else if (user.role === "seller") {
        navigate("/main/seller");
      } else {
        navigate("/");
      }
    } catch (error) {
      dispatch({
        type: "AUTH_FAIL",
        payload: error.response?.data?.message || "Authentication failed",
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome Back</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
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
          <button type="submit" disabled={loading}>
            {loading ? <span className="loading-spinner"></span> : "Login"}
          </button>
        </form>
        <p className="forgot-password" onClick={() => navigate("/forgot-password")}>
          Forgot Password?
        </p>
        <p className="toggle-form" onClick={() => navigate("/register")}>
          Don't have an account? Sign up
        </p>
      </div>
    </div>
  );
}

export default Login;
