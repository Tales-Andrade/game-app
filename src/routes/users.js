const express = require('express');
const router = express.Router({ mergeParams: true });
const userController = require('../controllers/users');
const Role = require('../utils/userRoles');
const { catchAsync, isAdmin, isAuthor, createUserSchema, updateUserSchema, validateLogin, isLoggedIn } = require('../middleware/middleware');

// Admin Routes
router.route('/admin')
    .get(isLoggedIn, isAdmin, catchAsync(userController.renderAdmin))

// User Profile Routes
router.route('/profile/:id')
    .get(isLoggedIn, isAuthor, catchAsync(userController.showUser))
    .put(isLoggedIn, isAuthor, updateUserSchema, catchAsync(userController.updateUser))
    .delete(isLoggedIn, isAuthor, catchAsync(userController.deleteUser));

// Edit Route
router.get('/profile/:id/edit', isLoggedIn, isAuthor, catchAsync(userController.renderEditForm));

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