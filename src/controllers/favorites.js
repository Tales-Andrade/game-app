const FavoriteModel = require('../models/favorite');

module.exports.renderMain = async (req, res, next) => {
    const favorites = await FavoriteModel.find({ user: req.session.user.id });
    res.render('games/favorites', { favorites });
};

module.exports.addOneFavorite = (req, res) => {
    console.log("testing");
};

module.exports.deleteOneFavorite = (req, res) => {
    console.log("testing");
}