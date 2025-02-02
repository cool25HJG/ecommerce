const express = require('express');
const { register, login, refreshToken, getOneUser, logout, deleteUser, updateUser, getAllUser,getUserByEmail} = require("../controller/user.controller");
const authenticateJWT = require("../middleware/authMiddleware");

const router = express.Router();

// Authentication routes
router.post('/register', register);
router.post('/login', login);
router.post('/refresh-token', refreshToken);
router.get('/:id',  getOneUser);
router.post('/logout', authenticateJWT, logout);

// User management routes

router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/',getAllUser);
router.get("/get/:email",getUserByEmail)

module.exports = router;
