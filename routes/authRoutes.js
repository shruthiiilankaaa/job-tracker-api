const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const { body } = require('express-validator');

const registerRules = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

const loginRules = [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
];

router.post('/register', registerRules, registerUser);
router.post('/login', loginRules, loginUser);

module.exports = router;