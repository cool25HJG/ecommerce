import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.login);

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
      const response = await axios.post("http://localhost:4000/api/user/login", {
        email: formData.email,
        password: formData.password,
      });

      const { token, user } = response.data;

      if (!user) {
        throw new Error("User data is missing in the response");
      }

      dispatch({
        type: "AUTH_SUCCESS",
        payload: response.data,
      });

      localStorage.setItem("token", token);

      if (user.role === "admin") {
        window.location.href = "http://localhost:5173/";
      } else {
        navigate("/");
      }
    } catch (error) {
      dispatch({
        type: "AUTH_FAIL",
        payload: error.response?.data?.message || "Authentication failed",
      });
      console.error("Authentication error:", error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
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
        <button type="submit">Login</button>
      </form>
      <p className="forgot-password" onClick={() => navigate("/forgot-password")}>
        Forgot Password?
      </p>
      <p className="register-link" onClick={() => navigate("/register")}>
        Don't have an account? <span style={{ color: "blue", cursor: "pointer" }}>Register</span>
      </p>
    </div>
  );
}

export default Login;