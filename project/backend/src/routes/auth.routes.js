const express = require('express');
const rateLimit = require('express-rate-limit');
const { body } = require('express-validator');
const validate = require('../middlewares/validate.middleware');
const authenticate = require('../middlewares/auth.middleware');
const {
  register,
  login,
  logout,
  currentUser,
} = require('../controllers/auth.controller');

const credentials = [
  body('username')
    .isString()
    .trim()
    .isLength({ min: 3, max: 30 })
    .matches(/^[a-zA-Z0-9_.-]+$/)
    .withMessage(
      'Username must be 3-30 characters using letters, numbers, _, . or -',
    ),
  body('password')
    .isString()
    .isLength({ min: 12, max: 128 })
    .withMessage('Password must be between 12 and 128 characters'),
];

const createAuthRouter = ({ rateLimit: attempts = 10 } = {}) => {
  const router = express.Router();
  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: attempts,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    handler: (req, res) =>
      res.status(429).json({
        success: false,
        message: 'Too many attempts. Try again later.',
      }),
  });

  router.post('/register', authLimiter, credentials, validate, register);
  router.post('/login', authLimiter, credentials, validate, login);
  router.post('/logout', authenticate, logout);
  router.get('/me', authenticate, currentUser);

  return router;
};

module.exports = createAuthRouter;
