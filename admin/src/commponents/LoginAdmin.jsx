import React,{useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { CiUser, CiLock } from "react-icons/ci";
import "./Login.css";
function LoginAdmin({changeView,getAdmin}) {
    
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
            getAdmin(formData.email)
         changeView("profile")
        } else {
          alert ("you dont have the access")
        }
      } catch (error) {
        dispatch({
          type: "AUTH_FAIL",
          payload: error.response?.data?.message || "Authentication failed",
        });
        }
    };
  
    return (
      <div className="auth-container">
        <div className="auth-box">
          <h2>Login</h2>
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <div className="input-icon">
                <CiUser className="icon" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
  
            <div className="form-group">
              <div className="input-icon">
                <CiLock className="icon" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
  
            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
            
            
          </form>
        </div>
      </div>
    )
}

export default LoginAdmin
