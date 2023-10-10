const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
// const { applyMiddleware } = require('graphql-middleware');
const typeDefs = require('./graphql/typedef');
const resolvers = require('./graphql/resolvers');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const { createNewSong, getAllSong, getSongById, updateSong, deleteSongById, aggregateSong, deleteAllSongs } = require('./controller/songs');
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
app.delete('/deleteAllSongs', deleteAllSongs);

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
const port = 3000;
app.listen(port, () => {
    console.log(`http://localhost:${port}/graphql`);
});
