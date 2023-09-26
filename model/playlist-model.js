const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
   playlistTitle: {
      type: String,
      required: true,
   },
   songs: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'songs',
   },
});

const playlist = mongoose.model('playlist', playlistSchema);
module.exports = playlist;
