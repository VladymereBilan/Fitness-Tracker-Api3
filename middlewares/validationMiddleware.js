const { body, validationResult } = require('express-validator');

const validateWorkout = [
  body('name').notEmpty().withMessage('Name is required').isString(),
  body('type').notEmpty().withMessage('Type is required').isString(),
  body('duration')
    .isInt({ min: 1 })
    .withMessage('Duration must be a positive number'),
  body('caloriesBurned')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Calories must be a positive number'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'validation_error',
        errors: errors.array()
      });
    }
    next();
  }
];

module.exports = { validateWorkout };
