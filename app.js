require('dotenv').config();
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

app.use(express.json());
const port = 3000;
const {
   groupSongsByArtist,
   groupSongsByGenre,
   groupSongsUnderOneHour,
   songList,
} = require('./task.js');

// Endpoint to generate JWT token
app.post('/generate-token', (req, res) => {
   try {
      const username = req.body.username;
      const password = req.body.password;
      const user = {
         name: username,
      };
      if (username != 'admin' || password != '123') {
         throw new Error('error');
      }
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
         expiresIn: '1h',
      });
      res.json({ accessToken: accessToken });
   } catch (error) {
      res.status(500).json({ message: 'Generate token failed' });
   }
});

app.use(authenticateToken);

function authenticateToken(req, res, next) {
   const authHeader = req.headers['authorization'];
   const token = authHeader && authHeader.split(' ')[1];
   if (token === null) return res.sendStatus(401);
   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
   });
}

app.get('/group-by-artist', (req, res) => {
   const groupByArtist = groupSongsByArtist(songList);
   res.json({
      message: 'success',
      group_by_artist: groupByArtist,
   });
});
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

app.listen(port, () => {
   console.log(`App running on port ${port}..!`);
});
