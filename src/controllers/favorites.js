const axios = require('axios');
const FavoriteModel = require('../models/favorite');

module.exports.renderMain = async (req, res, next) => {
    let favorites = await FavoriteModel.findOne({ user: req.params.id });
    favorites = favorites.games;
    const favoritesAPI = [];

    for (let favorite_id of favorites) {
        const favorite = await axios({
            method: 'post',
            url: 'https://api.igdb.com/v4/games',
            headers: {
                'Client-ID': process.env.TWITCH_CLIENT_ID,
                'Authorization': `Bearer ${process.env.TWITCH_APP_ACCESS_TOKEN}`,
                'Accept': 'application/json'
            },
            data: `fields name, rating, cover.*; where id = ${favorite_id};`
        });

        if (!favorite.data.length) {
            req.flash('error', 'IGDB API call failed!');
            return res.redirect('/');
        };

        favoritesAPI.push(favorite.data[0]);
    }

    res.render('games/favorites', { favorites: favoritesAPI, user: req.params.id });
};

module.exports.addOneFavorite = async (req, res, next) => {
    const favorites = await FavoriteModel.findOne({ user: req.params.id });
    favorites.games.push(req.body.game);
    await favorites.save();

    res.redirect(`/profiles/${req.params.id}/favorites`);
};

module.exports.deleteOneFavorite = async (req, res, next) => {
    const favorites = await FavoriteModel.findOne({ user: req.params.id });
    favorites.games = favorites.games.filter(game => game != req.body.game);
    await favorites.save();

    res.redirect(`/profiles/${req.params.id}/favorites`);
}