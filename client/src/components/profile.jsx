import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Import jwtDecode

function Profile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);
  const [updateForm, setUpdateForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
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

    // Decode the token to get the user ID
    const decoded = jwtDecode(token); // Use jwtDecode here
    const userId = decoded.id;

    // Fetch user details using the getOneUser route
    axios.get(`http://localhost:4000/api/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setUser(response.data);
        setUpdateForm({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          phoneNumber: response.data.phoneNumber,
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
      const decoded = jwtDecode(token); // Use jwtDecode here
      const userId = decoded.id;

      // Update user details using the updateUser route
      const response = await axios.put(
        `http://localhost:4000/api/user/${userId}`,
        {
          firstName: updateForm.firstName,
          lastName: updateForm.lastName,
          email: updateForm.email,
          phoneNumber: updateForm.phoneNumber,
          password: updateForm.password || undefined, // Only send password if it's changed
          role: user.role
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      // Update the user state with the new data
      setUser({
        ...user,
        firstName: updateForm.firstName,
        lastName: updateForm.lastName,
        email: updateForm.email,
        phoneNumber: updateForm.phoneNumber
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
          <h3>First Name: {user.firstName}</h3>
          <h3>Last Name: {user.lastName}</h3>
          <h4>Email: {user.email}</h4>
          <h4>Phone Number: {user.phoneNumber}</h4>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
          <button onClick={() => navigate("/")}>Back to Home</button>
        </div>
      ) : (
        // Edit Mode
        <form onSubmit={handleUpdate} className="profile-form">
          <div className="form-group">
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={updateForm.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={updateForm.lastName}
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
            <label>Phone Number:</label>
            <input
              type="text"
              name="phoneNumber"
              value={updateForm.phoneNumber}
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