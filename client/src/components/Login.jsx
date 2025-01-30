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
        window.location.href = "http://localhost:5174";
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
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        
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

        <button type="submit" className="login-button">
          Login
        </button>
       <div>
        <p onClick={()=>navigate("/register")}>you dont have an account? register</p>
       </div>
      </form>
    </div>
  );
}

export default Login;
