const express = require('express');
const router = express.Router({ mergeParams: true });
const favoriteController = require('../controllers/favorites');
const { catchAsync, isUser, isLoggedIn } = require('../middleware/middleware');

router.route('/')
    .get(isLoggedIn, isUser, catchAsync(favoriteController.renderMain))
    .put(isLoggedIn, isUser, catchAsync(favoriteController.addOneFavorite))
    .delete(isLoggedIn, isUser, catchAsync(favoriteController.deleteOneFavorite));

module.exports = router;