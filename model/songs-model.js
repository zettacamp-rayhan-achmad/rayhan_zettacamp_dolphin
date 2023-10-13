const mongoose = require('mongoose');

const songsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    artist: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    played: {
        type: Boolean,
        default: false,
    },
});

const songs = mongoose.model('songs', songsSchema);
module.exports = songs;
