const express = require('express');
const router = express.Router({ mergeParams: true });
const GameController = require('../controllers/games');
const { catchAsync, isAdmin, isUser, createUserSchema, updateUserSchema, validateLogin, isLoggedIn } = require('../middleware/middleware');

// Main Page
router.route('/')
    .get(catchAsync(GameController.renderGames))
    .post(catchAsync(GameController.searchGames));

// Game Profile Routes
router.get('/:id', catchAsync(GameController.showGame));


module.exports = router;