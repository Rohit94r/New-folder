const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { body } = require('express-validator');

router
  .route('/register')
  .post(
    [
      body('name', 'Name is required').not().isEmpty(),
      body('email', 'Please include a valid email').isEmail(),
      body('phone', 'Phone number is required').not().isEmpty(),
      body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    ],
    registerUser
  );

router
  .route('/login')
  .post(
    [
      body('email', 'Please include a valid email').isEmail(),
      body('password', 'Password is required').exists(),
    ],
    loginUser
  );

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

module.exports = router;