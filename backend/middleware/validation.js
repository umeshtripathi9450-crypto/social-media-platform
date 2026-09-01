const { body, validationResult } = require('express-validator');

/**
 * Sanitization and validation middleware
 * Prevents XSS and injection attacks
 */
const validateInput = {
  // Validate email
  validateEmail: () => body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),

  // Validate password
  validatePassword: () => body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),

  // Validate username
  validateUsername: () => body('username')
    .trim()
    .isLength({ min: 3, max: 30 })
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage('Username must be 3-30 characters and contain only letters, numbers, underscore, and hyphen'),

  // Validate post content
  validatePostContent: () => body('content')
    .trim()
    .notEmpty()
    .withMessage('Post content cannot be empty')
    .isLength({ max: 5000 })
    .withMessage('Post cannot exceed 5000 characters'),

  // Validate comment content
  validateComment: () => body('content')
    .trim()
    .notEmpty()
    .withMessage('Comment cannot be empty')
    .isLength({ max: 1000 })
    .withMessage('Comment cannot exceed 1000 characters'),

  // Check for validation errors
  checkErrors: (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array().map(err => ({
          field: err.param,
          message: err.msg
        }))
      });
    }
    next();
  }
};

module.exports = validateInput;
