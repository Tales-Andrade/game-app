const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = Schema({
    user: Number,
    games: [Number]
});

module.exports = mongoose.model('Favorite', favoriteSchema);