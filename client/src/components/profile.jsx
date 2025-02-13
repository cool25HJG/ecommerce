import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Image } from "cloudinary-react";


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
    confirmPassword: "",
    role: "",
    adresse: "",
    image: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
      return;
    }

    const decoded = jwtDecode(token);
    const userId = decoded.id;

    axios
      .get(import.meta.env.VITE_HOST+`/api/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser(response.data);
        setUpdateForm({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          phoneNumber: response.data.phoneNumber,
          role: response.data.role,
          adresse: response.data.adresse,
          image: response.data.image || "", 
        });
      })
      .catch((error) => {
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
      [e.target.name]: e.target.value,
    });
  };

  const handleImageFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (!imageFile) return;

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "Ghassen123");
    formData.append("cloud_name", "dqh6arave"); 

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dqh6arave/image/upload`,
        formData
      );

      setUpdateForm({ ...updateForm, image: response.data.secure_url });
    } catch (error) {
      console.error("Error uploading image:", error);
      setError("Failed to upload image. Please try again.");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");

    if (updateForm.password && updateForm.password !== updateForm.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      const decoded = jwtDecode(token);
      const userId = decoded.id;


      const updateData = {
        firstName: updateForm.firstName,
        lastName: updateForm.lastName,
        email: updateForm.email,
        phoneNumber: updateForm.phoneNumber,
        role: updateForm.role,
        adresse: updateForm.adresse,
        image: updateForm.image,
      };

      if (updateForm.password) {
        updateData.password = updateForm.password;
      }

      const response = await axios.put(
        import.meta.env.VITE_HOST+`/api/user/${userId}`,
        updateData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUser({
        ...user,
        ...updateData
      });
      
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Update error:", error);
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
        <div className="profile-info">
          <div className="profile-image">
            {user.image && <img src={user.image} alt="Profile" />}
          </div>
          <h3>First Name: {user.firstName}</h3>
          <h3>Last Name: {user.lastName}</h3>
          <h4>Email: {user.email}</h4>
          <h4>Phone Number: {user.phoneNumber}</h4>
          <h4>Role: {user.role}</h4>
          <h4>Address: {user.adresse}</h4>
          <div className="profile-buttons">
            <button onClick={() => setIsEditing(true)}>Edit Profile</button>
            <button onClick={() => navigate("/")}>Back to Home</button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleUpdate} className="profile-form">
          <div className="form-group">
            <label>Profile Image:</label>
            <div className="current-image">
              {updateForm.image && <img src={updateForm.image} alt="Profile" />}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageFileChange}
            />
            {imageFile && (
              <button type="button" onClick={handleImageUpload}>
                Upload Image
              </button>
            )}
          </div>

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
            <label>Address:</label>
            <input
              type="text"
              name="adresse"
              value={updateForm.adresse}
              onChange={handleChange}
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
            <button type="button" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Profile;