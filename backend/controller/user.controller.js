const { User } = require("../models/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  register: async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
      // Check if the email already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }

      // Hash the password before saving the user
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new user
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
      });

      // Create JWT token

      res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

  // Login and return JWT
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      // Find user by email
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      // Compare entered password with hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      // Generate a JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRATION }
      );

      res.json({ message: "Login successful", token });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      await User.destroy({ where: { id } });
    } catch (error) {
      console.error("user deleted", error);
      res.status(500).json({ message: "Server error" });
    }
  },
  updateUser: async (req,res) => {
    try {
      const { id } = req.params;
      const {name,email,password,role}=req.body
      await User.update({name,email,password,role},{
        where : {id}
      })
    } catch (error) {
      console.error("user updated", error);
      res.status(500).json({ message: "Server error" });
    }
    
  },
  getAllUser : async (req,res) => {
    try {
      const users = await User.getAll()
      res.status(200).send(users)
    } catch (error) {
      console.error("users not found", error);
      res.status(500).json({ message: "Server error" });
    }
    
  }
};
