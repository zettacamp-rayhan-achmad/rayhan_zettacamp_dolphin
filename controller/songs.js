const express = require('express');
const app = express();

exports.groupByArtist = async (req, res) => {
   const groupByArtist = groupSongsByArtist(songList);
   res.json({
      message: 'success',
      group_by_artist: groupByArtist,
   });
};
app.get('/group-by-genre', (req, res) => {
   const groupByGenre = groupSongsByGenre(songList);
   res.json({
      message: 'success',
      group_by_genre: groupByGenre,
   });
});
app.get('/one-hour-songs', (req, res) => {
   const oneHourSong = groupSongsUnderOneHour(songList);
   res.json({
      message: 'success',
      one_hour_songs: oneHourSong,
   });
});
