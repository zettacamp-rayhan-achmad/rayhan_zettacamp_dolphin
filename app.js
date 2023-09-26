const express = require('express');
const app = express();
const mongoose = require('mongoose');
console.log('hallow');
const url = 'mongodb://localhost:27017/';
const database = 'spotify';
app.use(express.json());
const {
   groupSongsByArtist,
   groupSongsByGenre,
   groupSongsUnderOneHour,
   songList,
} = require('./task.js');

mongoose
   .connect(`${url}${database}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
   .then(() => {
      console.log('success! connected to mongoDB');
   })
   .catch((err) => {
      console.log('error connecting to mongoDB! ', err);
   });

const port = 3000;
app.listen(port, () => {
   console.log(`App running on port ${port}..!`);
});
