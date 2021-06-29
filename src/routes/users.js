const express = require('express');
const router = express.Router({ mergeParams: true });
const userController = require('../controllers/users');
const Role = require('../utils/userRoles');
const { catchAsync, isAdmin, isUser, createUserSchema, updateUserSchema, validateLogin, isLoggedIn } = require('../middleware/middleware');

// Admin Routes
router.route('/admin')
    .get(isLoggedIn, isAdmin, catchAsync(userController.renderAdmin))

// User Profile Routes
router.route('/profiles/:id')
    .get(isLoggedIn, isUser, catchAsync(userController.showUser))
    .put(isLoggedIn, isUser, updateUserSchema, catchAsync(userController.updateUser))
    .delete(isLoggedIn, isUser, catchAsync(userController.deleteUser));

// Edit Route
router.get('/profiles/:id/edit', isLoggedIn, isUser, catchAsync(userController.renderEditForm));

// Register Routes
router.route('/register')
    .get(userController.renderRegister)
    .post(createUserSchema, catchAsync(userController.createUser))

// Login Routes
router.route('/login')
    .get(userController.renderLogin)
    .post(validateLogin, catchAsync(userController.userLogin));

// Logout Route
router.get('/logout', catchAsync(userController.userLogout));

module.exports = router;