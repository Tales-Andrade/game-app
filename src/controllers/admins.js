const axios = require('axios');
const ReviewModel = require('../models/review');
const UserModel = require('../models/user');

module.exports.renderReviews = async (req, res, next) => {
    const reviews = await ReviewModel.find({ author: req.params.id });
    const { username } = await UserModel.findOne({ id: req.params.id });

    res.render('users/reviews', { reviews, username });
};