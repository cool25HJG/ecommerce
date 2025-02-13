// routes/protectedRoutes.js
const express = require('express');
const authenticateJWT = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/dashboard', authenticateJWT, (req, res) => {
  res.json({ message: 'Welcome to the dashboard', user: req.user });
});

module.exports = router;
