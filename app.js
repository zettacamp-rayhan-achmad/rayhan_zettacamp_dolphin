const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
// const { applyMiddleware } = require('graphql-middleware');
const typeDefs = require('./graphql/typedef');
const resolvers = require('./graphql/resolvers');
const jwt = require('jsonwebtoken');
const cron = require('cron');
const moment = require('moment');

const app = express();
app.use(express.json());

const {
    createNewSong,
    getAllSong,
    getSongById,
    updateSong,
    deleteSongById,
    aggregateSong,
    deleteAllSongs,
    updateWebhookSongs,
    verifyToken,
    generateToken,
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
const songs = require('./model/songs-model');

const url = 'mongodb://127.0.0.1:27017/';
const database = 'spotify';

// songs
app.post('/createNewSong', createNewSong);
app.get('/getAllSong', getAllSong);
app.get('/getSongById/:id', getSongById);
app.patch('/updateSong/:id', updateSong);
app.delete('/deleteSongById/:id', deleteSongById);
app.delete('/deleteAllSongs', deleteAllSongs);
app.post('/updateWebhookSongs/:id', verifyToken, updateWebhookSongs);
app.post('/generateToken', generateToken);

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

const secretKey = 'rahasia';
// mongoose.set('debug', true);
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        try {
            const token = req.headers.authorization || '';
            const user = jwt.verify(token.replace('Bearer ', ''), secretKey);
            return { user };
        } catch (error) {
            return 'there is error token', error;
        }
    },
});

server.applyMiddleware({ app });
const cronjobEnable = true;
const playUnplayedSongJob = new cron.CronJob('*/5 * * * * *', async () => {
    try {
        if (cronjobEnable) {
            getSong();
        } else {
            console.log('cronjob disable');
        }
    } catch (error) {
        console.error('Cron Job Error:', error);
    }
});

async function getSong() {
    const time = moment().format('HH:mm:ss');
    const songToPlay = await songs.findOne({ played: false });
    if (songToPlay) {
        songToPlay.played = true;
        await songToPlay.save();
        console.log(`${time} - Playing song: ${songToPlay.title}`);
    } else {
        console.log('No unplayed songs available.');
    }
}

playUnplayedSongJob.start();
const port = 3000;
app.listen(port, () => {
    console.log(`http://localhost:${port}/graphql`);
});
