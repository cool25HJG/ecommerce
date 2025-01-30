const express = require('express');
const { User } = require("../models/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticateJWT = require("../middleware/authMiddleware");
const { where } = require('sequelize');

let refreshTokens = {
  users: {},
  sellers: {}
};

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRATION }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role }, // Include role in refresh token
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );
};

const register = async (req, res) => {
  const {  email, password,firstName,lastName,phoneNumber, role } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({  email, password: hashedPassword, role,firstName,lastName,phoneNumber });
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Store refresh token based on user role
    if (user.role === 'seller') {
      refreshTokens.sellers[user.id] = refreshToken;
    } else {
      refreshTokens.users[user.id] = refreshToken;
    }
    
    res.json({ 
      message: "Login successful", 
      accessToken, 
      refreshToken, 
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const refreshToken = (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token is required" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const { id, role } = decoded;

    const storedToken = role === 'seller' 
      ? refreshTokens.sellers[id] 
      : refreshTokens.users[id];

    if (!storedToken || storedToken !== refreshToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const user = { id, role };
    const newAccessToken = generateAccessToken(user);

    res.json({ 
      accessToken: newAccessToken,
      message: "Token refreshed successfully"
    });
  } catch (error) {
    console.error("Error refreshing token:", error);
    res.status(403).json({ message: "Invalid refresh token" });
  }
};

const getOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, { attributes: { exclude: ["password"] } });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
};


const logout = (req, res) => {
  const { userId, role } = req.body;
  
  if (role === 'seller') {
    delete refreshTokens.sellers[userId];
  } else {
    delete refreshTokens.users[userId];
  }
  
  res.status(200).json({ message: "Logged out successfully" });
};

const deleteUser= async (req, res) => {
  try {
    const { id } = req.params;
    await User.destroy({ where: { id } });
    res.status(200).send("deleted")
  } catch (error) {
    console.error("user deleted", error);
    res.status(500).json({ message: "Server error" });
  }
}
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, phoneNumber, password, role } = req.body;

    // Find the user by ID
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Hash the new password if it's provided
    let hashedPassword = user.password; // Keep the old password by default
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10); // Hash the new password
    }

    // Update the user's details
    const updatedUser = await User.update(
      {
        firstName: firstName || user.firstName,
        lastName: lastName || user.lastName,
        email: email || user.email,
        phoneNumber: phoneNumber || user.phoneNumber,
        password: hashedPassword, // Use the hashed password
        role: role || user.role,
      },
      {
        where: { id },
      }
    );

    res.status(200).send("updated");
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error" });
  }
};
const getAllUser = async (req,res) => {
  try {
    const users = await User.findAll()
    res.status(200).send(users)
  } catch (error) {
    console.error("users not found", error);
   
  }
  
}

module.exports={
  generateAccessToken ,
  generateRefreshToken,
  register,
  login,
  refreshToken,
  getOneUser,
  logout,
  deleteUser,
  updateUser,
  getAllUser

}