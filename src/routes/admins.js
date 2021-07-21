const express = require('express');
const router = express.Router({ mergeParams: true });
const AdminController = require('../controllers/admins');
const { catchAsync, isAdmin, isLoggedIn } = require('../middleware/middleware');

router.route('/')
    .get(isLoggedIn, isAdmin, catchAsync(AdminController.renderReviews));

module.exports = router;