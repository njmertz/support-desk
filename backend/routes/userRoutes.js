const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  getAll,
  getUser,
  updateUser
} = require('../controllers/userController');

const {protect} = require('../middleware/authMiddleware');

// Register User
router.post('/', registerUser);

// Login User
router.post('/login', loginUser);

// Get me
router.get('/me', protect, getMe);

// Get Users
router.get('/all', protect, getAll);
router.get('/list', protect, getAll);

// Get User
router.get('/list/:userId', protect, getUser);

// Update user
// router.post('/list/:userId', protect, updateUser);
router.put('/list/:userId', protect, updateUser);

module.exports = router;