const express = require('express');
const { body } = require('express-validator');
const validate = require('../middlewares/validate.middleware');
const { register, login } = require('../controllers/auth.controller');

const router = express.Router();

const credentialsValidation = [
  body('email').isEmail().withMessage('A valid email is required').normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
];

router.post(
  '/register',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    ...credentialsValidation,
  ],
  validate,
  register
);
router.post('/login', credentialsValidation, validate, login);

module.exports = router;
