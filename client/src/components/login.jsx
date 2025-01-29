import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
// need to change what is in comment 
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     password: "",
//     email: "",
//     role: "client",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form Submitted", formData);
//   };

  return (
    <div className="login-container">
      <h2>{isCreatingAccount ? "Create Account" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        {isCreatingAccount && (
          <>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={""}
              onChange={""}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={""}
              onChange={""}
              required
            />
            <select name="role" value={""} onChange={""}>
              <option value="admin">Admin</option>
              <option value="client">Client</option>
              <option value="seller">Seller</option>
            </select>
          </>
        )}
        {!isCreatingAccount && (
          <input
            type="text"
            name="username"
            placeholder="Username or Email"
            value={""}
            onChange={""}
            required
          />
        )}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={""}
          onChange={""}
          required
        />
        <button type="submit">{isCreatingAccount ? "Sign Up" : "Login"}</button>
      </form>
      {!isCreatingAccount && (
        <p className="forgot-password" onClick={() => navigate("/forgot-password")}>Forgot Password?</p>
      )}
      <p onClick={() => setIsCreatingAccount(!isCreatingAccount)} className="toggle-form">
        {isCreatingAccount ? "Already have an account? Login" : "Create an account"}
      </p>
    </div>
  );
}

export default Login;

