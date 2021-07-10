const FavoriteModel = require('../models/favorite');

module.exports.renderMain = async (req, res, next) => {
    const favorites = await FavoriteModel.findOne({ user: req.params.id });
    res.render('games/favorites', { favorites });
};

module.exports.addOneFavorite = async (req, res, next) => {
    const favorites = await FavoriteModel.findOne({ user: req.params.id });
    favorites.games.push(req.body.game);
    await favorites.save();

    res.redirect(`/profiles/${req.params.id}/favorites`);
};

module.exports.deleteOneFavorite = async (req, res, next) => {
    const favorites = await FavoriteModel.findOne({ user: req.params.id });
    favorites.games = favorites.games.filter(game => game !== req.body.game);
    await favorites.save();

    res.redirect(`/profiles/${req.params.id}/favorites`);
}