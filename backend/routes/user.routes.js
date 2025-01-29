const express = require('express');
const { register, login, refreshToken, getCurrentUser, logout, deleteUser, updateUser, getAllUser } = require("../controller/user.controller");
const authenticateJWT = require("../middleware/authMiddleware");

const router = express.Router();

// Authentication routes
router.post('/register', register);
router.post('/login', login);
router.post('/refresh-token', refreshToken);
router.get('/current-user', authenticateJWT, getCurrentUser);
router.post('/logout', authenticateJWT, logout);

// User management routes
router.put('/:id', authenticateJWT, updateUser);
router.delete('/:id', authenticateJWT, deleteUser);
router.get('/', authenticateJWT, getAllUser);

module.exports = router;
