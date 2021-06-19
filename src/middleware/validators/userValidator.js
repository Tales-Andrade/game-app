const { body } = require('express-validator');
const Role = require('../../utils/userRoles');

module.exports.createUserSchema = [
    body('username')
        .exists()
        .withMessage('username is required!')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 characters long.'),
    body('first_name')
        .exists()
        .withMessage('Your first name is required!')
        .isAlpha()
        .withMessage('Must be only alphabetical characters.')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 characters long.'),
    body('last_name')
        .exists()
        .withMessage('Your last name is required!')
        .isAlpha()
        .withMessage('Must be only alphabetical characters.')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 characters long.'),
    body('email')
        .exists()
        .withMessage('Email is required!')
        .isEmail()
        .withMessage('Must be a valid email.')
        .normalizeEmail(),
    body('role')
        .optional()
        .isIn([Role.Admin, Role.SuperUser])
        .withMessage('Invalid Role type!'),
    body('password')
        .exists()
        .withMessage('Password is required!')
        .notEmpty()
        .isLength({ min: 6 })
        .withMessage('Password must contain at least 6 characters.')
        .isLength({ max: 10 })
        .withMessage('Password can contain maximum 10 characters.'),
    body('confirm_password')
        .exists()
        .custom((value, { req }) => value === req.body.password)
        .withMessage('confirm_password field must have the same value as the password field!'),
    body('age')
        .optional()
        .isNumeric()
        .withMessage('Must be a number.')
];

module.exports.updateUserSchema = [
    body('username')
        .optional()
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 characters long.'),
    body('first_name')
        .optional()
        .isAlpha()
        .withMessage('Must be only alphabetical characters.')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 characters long,'),
    body('last_name')
        .optional()
        .isAlpha()
        .withMessage('Must be only alphabetical characters.')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 characters long.'),
    body('email')
        .optional()
        .isEmail()
        .withMessage('Must be a valid email.')
        .normalizeEmail(),
    body('role')
        .optional()
        .isIn([Role.Admin, Role.SuperUser])
        .withMessage('Invalid Role type!'),
    body('password')
        .optional()
        .notEmpty()
        .isLength({ min: 6 })
        .withMessage('Password must contain at least 6 characters.')
        .isLength({ max: 10 })
        .withMessage('Password can contain maximum 10 characters.')
        .custom((value, { req }) => !!req.body.confirm_password)
        .withMessage('Please confirm your password!'),
    body('confirm_password')
        .optional()
        .custom((value, { req }) => value === req.body.password)
        .withMessage('confirm_password field must have the same value as the password field!'),
    body('age')
        .optional()
        .isNumeric()
        .withMessage('Must be a number.'),
    body()
        .custom(value => {
            return !!Object.keys(value).length;
        })
        .withMessage('Please provide required field to update!')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['username', 'password', 'confirm_password', 'email', 'role', 'first_name', 'last_name', 'age'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];

module.exports.validateLogin = [
    body('email')
        .exists()
        .withMessage('Email is required!')
        .isEmail()
        .withMessage('Must be a valid email.')
        .normalizeEmail(),
    body('password')
        .exists()
        .withMessage('Password is required!')
        .notEmpty()
        .withMessage('Password must be filled.')
];