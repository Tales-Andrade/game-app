const express = require('express');
const router = express.Router({ mergeParams: true });
const userController = require('../controllers/users');
const auth = require('../middleware/auth');
const Role = require('../utils/userRoles');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory');

const { createUserSchema, updateUserSchema, validateLogin } = require('../middleware/validators/userValidator');

// Admin Routes
router.route('/admin')
    .get(auth(Role.Admin), awaitHandlerFactory(userController.renderAdmin))
    .patch(auth(Role.Admin), updateUserSchema, awaitHandlerFactory(userController.updateUser))
    .delete(auth(Role.Admin), awaitHandlerFactory(userController.deleteUser));

// Register Routes
router.route('/register')
    .get(userController.renderRegister)
    .post(createUserSchema, awaitHandlerFactory(userController.createUser))

// Login Routes
router.route('/login')
    .get(userController.renderLogin)
    .post(validateLogin, awaitHandlerFactory(userController.userLogin));

// Logout Routes
router.get('/logout', awaitHandlerFactory(userController.userLogout));

module.exports = router;