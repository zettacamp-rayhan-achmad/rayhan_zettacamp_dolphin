const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
const {
   createNewSong,
   getAllSong,
   getSongById,
   updateSong,
   deleteSongById,
   aggregateSong,
} = require('./controller/songs');
const {
   createNewPlaylist,
   updatePlaylist,
   getAllPlayList,
   deletePlaylist,
   addSongsToPlaylist,
   aggregatePlaylist,
   aggregatePlaylistPercobaan,
} = require('./controller/playlist');

const url = 'mongodb://127.0.0.1:27017/';
const database = 'spotify';

// songs
app.post('/createNewSong', createNewSong);
app.get('/getAllSong', getAllSong);
app.get('/getSongById/:id', getSongById);
app.patch('/updateSong/:id', updateSong);
app.delete('/deleteSongById/:id', deleteSongById);

// playlist
app.post('/createNewPlaylist', createNewPlaylist);
app.post('/addSongToPlaylist', addSongsToPlaylist);
app.get('/getAllPlaylist', getAllPlayList);
app.patch('/updatePlaylist/:id', updatePlaylist);
app.delete('/deletePlaylist/:id', deletePlaylist);

// aggregate songs
app.get('/aggregateSong', aggregateSong);
app.get('/aggregatePlaylist', aggregatePlaylist);
app.get('/aggregatePlaylistPercobaan', aggregatePlaylistPercobaan);

mongoose
   .connect(`${url}${database}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
   .then(() => {
      console.log('success! connected to mongoDB');
   })
   .catch((error) => {
      console.error('error connecting to mongoDB', error);
   });

const port = 3000;
app.listen(port, () => {
   console.log(`App running on port ${port}..!`);
});
