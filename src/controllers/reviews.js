const ReviewModel = require('../models/review');

module.exports.createReview = async (req, res) => {
    const review = new ReviewModel(req.body.review);
    review.author = req.session.user.id;
    await review.save();
    req.flash('success', 'Successfully create a new review!');
    res.redirect(`/games/${req.params.id}`);
};

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted a review!');
    res.redirect(`/games/${id}`);
};