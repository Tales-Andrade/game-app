const axios = require('axios');
const ReviewModel = require('../models/review');

class GameController {
    renderGames = async (req, res) => {
        const gamesAPI = await axios({
            method: 'post',
            url: 'https://api.igdb.com/v4/games',
            headers: {
                'Client-ID': process.env.TWITCH_CLIENT_ID,
                'Authorization': `Bearer ${process.env.TWITCH_APP_ACCESS_TOKEN}`,
                'Accept': 'application/json'
            },
            data: 'fields name, rating, cover.*; where rating < 100 & rating > 85 & follows > 50; limit 12;'
        });

        if (!gamesAPI.data.length) {
            req.flash('error', 'IGDB API call failed!');
            return res.redirect('/');
        }

        res.render('games/index', { games: gamesAPI.data });
    }

    searchGames = async (req, res) => {
        const search = req.body.search;

        const gamesAPI = await axios({
            method: 'post',
            url: 'https://api.igdb.com/v4/games',
            headers: {
                'Client-ID': process.env.TWITCH_CLIENT_ID,
                'Authorization': `Bearer ${process.env.TWITCH_APP_ACCESS_TOKEN}`,
                'Accept': 'application/json'
            },
            data: `search "${search}"; fields name, rating, cover.*; limit 500;`
        });

        if (!gamesAPI.data.length) {
            req.flash('error', 'IGDB API call failed!');
            return res.redirect('/');
        }

        res.render('games/index', { games: gamesAPI.data });
    }

    showGame = async (req, res) => {
        const gamesAPI = await axios({
            method: 'post',
            url: 'https://api.igdb.com/v4/games',
            headers: {
                'Client-ID': process.env.TWITCH_CLIENT_ID,
                'Authorization': `Bearer ${process.env.TWITCH_APP_ACCESS_TOKEN}`,
                'Accept': 'application/json'
            },
            data: `fields name, rating, summary, cover.*; where id = ${req.params.id};`
        });

        if (!gamesAPI.data.length) {
            req.flash('error', 'IGDB API call failed!');
            return res.redirect('/');
        }

        const reviews = await ReviewModel.find({ author: req.params.id });

        res.render('games/show', { game: gamesAPI.data[0], reviews });
    }
}

module.exports = new GameController;