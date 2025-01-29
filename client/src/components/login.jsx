import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.login);

  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    role: "client",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    dispatch({ type: "AUTH_START" });
  
    try {
      if (!isCreatingAccount) {
        const response = await axios.post("http://localhost:4000/auth/login", {
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
  
        // Redirect based on role
        if (user.role === "admin") {
          window.location.href = "http://localhost:5173/";
        } else {
          navigate("/");
        }
      } else {
        console.log("Registration form submitted", formData);
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
      <h2>{isCreatingAccount ? "Create Account" : "Login"}</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        {isCreatingAccount && (
          <>
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
            <select 
              name="role" 
              value={formData.role} 
              onChange={handleChange}
            >
              <option value="admin">Admin</option>
              <option value="client">Client</option>
              <option value="seller">Seller</option>
            </select>
          </>
        )}
        {!isCreatingAccount && (
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        )}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">{isCreatingAccount ? "Sign Up" : "Login"}</button>
      </form>
      {!isCreatingAccount && (
        <p className="forgot-password" onClick={() => navigate("/forgot-password")}>
          Forgot Password?
        </p>
      )}
      <p onClick={() => setIsCreatingAccount(!isCreatingAccount)} className="toggle-form">
        {isCreatingAccount ? "Already have an account? Login" : "Create an account"}
      </p>
    </div>
  );
}

export default Login;

