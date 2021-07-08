const express = require('express');
const router = express.Router({ mergeParams: true });
const ReviewController = require('../controllers/reviews');
const { catchAsync, isLoggedIn, isReviewAuthor, validateReview } = require('../middleware/middleware');

router.post('/', isLoggedIn, validateReview, catchAsync(ReviewController.createReview));

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(ReviewController.deleteReview));

module.exports = router;