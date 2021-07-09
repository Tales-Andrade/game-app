const FavoriteModel = require('../models/favorite');

module.exports.renderMain = async (req, res, next) => {
    const favorites = await FavoriteModel.findOne({ user: req.params.id });
    console.log(favorites.games);
    res.render('games/favorites', { favorites });
};

module.exports.addOneFavorite = async (req, res, next) => {
    const favorites = await FavoriteModel.findOne({ user: req.params.id });
    favorites.games.push(req.body.game);
    await favorites.save();

    res.redirect(`/profiles/${req.params.id}/favorites`);
};

module.exports.deleteOneFavorite = (req, res) => {
    console.log("testing");
}