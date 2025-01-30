import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);
  const [updateForm, setUpdateForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");

  // Fetch user data
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
      return;
    }

    axios.get("http://localhost:4000/api/user/current-user", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setUser(response.data);
        setUpdateForm({
          name: response.data.name,
          email: response.data.email,
          password: "",
          confirmPassword: ""
        });
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
        if (error.response?.status === 401) {
          localStorage.removeItem("accessToken");
          navigate("/login");
        }
      });
  }, [navigate]);

  const handleChange = (e) => {
    setUpdateForm({
      ...updateForm,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");

    if (updateForm.password !== updateForm.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.put(
        `http://localhost:4000/api/user/${user.id}`,
        {
          name: updateForm.name,
          email: updateForm.email,
          password: updateForm.password || undefined, // Only send password if it's changed
          role: user.role
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setUser({
        ...user,
        name: updateForm.name,
        email: updateForm.email
      });
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      setError(error.response?.data?.message || "Error updating profile");
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      {error && <div className="error-message">{error}</div>}
      
      {!isEditing ? (
        // View Mode
        <div className="profile-info">
          <h3>Name: {user.name}</h3>
          <h4>Email: {user.email}</h4>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
          <button onClick={() => navigate("/")}>Back to Home</button>
        </div>
      ) : (
        // Edit Mode
        <form onSubmit={handleUpdate} className="profile-form">
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={updateForm.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={updateForm.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>New Password:</label>
            <input
              type="password"
              name="password"
              value={updateForm.password}
              onChange={handleChange}
              placeholder="Leave blank to keep current password"
            />
          </div>

          <div className="form-group">
            <label>Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={updateForm.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
            />
          </div>

          <div className="button-group">
            <button type="submit">Save Changes</button>
            <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Profile;
