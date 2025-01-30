import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { registerStart, registerSuccess, registerFailure } from "../store/reducer/login"

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
    <div className="register-container">
      <h2>Create Account</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        /><input
        type="text"
        name="lastName"
        placeholder="lastName"
        value={formData.lastName}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="phoneNumber"
        placeholder="phoneNumber"
        value={formData.phoneNumber}
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
        <select 
          name="role" 
          value={formData.role} 
          onChange={handleChange}
        >
          <option value="client">Client</option>
          <option value="seller">Seller</option>
        </select>
        <button type="submit" disabled={loading}>
          {loading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>
      <p onClick={() => navigate("/login")} className="toggle-form">
        Already have an account? Login
      </p>
    </div>
  );
}

export default Register;