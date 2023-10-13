const songModel = require('./../model/songs-model');
const playlistModel = require('./../model/playlist-model');
const userModel = require('./../model/user');
const bcrypt = require('bcrypt');
const playlistLoad = require('./dataloader');
const { AuthenticationError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const fetch = require('node-fetch');
const songs = require('./../model/songs-model');
// const playlist = require('./../model/playlist-model');

const secretKey = 'rahasia';

module.exports = {
    Query: {
        getSongs: async (_, __, context) => {
            if (!context.user) {
                throw new AuthenticationError('please login to access the data');
            }
            const songs = await songModel.find();
            return songs;
        },
        getPlaylist: async (_, __, context) => {
            if (!context.user) {
                throw new AuthenticationError('please login to access the data');
            }
            const playlist = await playlistModel.find({}, '_id');
            return playlistLoad.loadMany(playlist.map((list) => list._id));
        },
        getPlaylistId: async (_, { id }, context) => {
            if (!context.user) {
                throw new AuthenticationError('please login to access the data');
            }
            return playlistLoad.load(id);
        },
        getUser: async () => {
            const user = await userModel.find({});
            return user;
        },
        getPlaylistArtist: async () => {
            const start_time = moment().format('YYYY-MM-DD HH:mm:ss');
            const songsPage = await songModel.aggregate([
                {
                    $group: {
                        _id: '$artist',
                        songs: {
                            $push: {
                                title: '$title',
                                genre: '$genre',
                                artist: '$artist',
                                duration: '$duration',
                            },
                        },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        playlistTitle: '$_id',
                        songs: '$songs',
                    },
                },
            ]);
            for (const playlist of songsPage) {
                const totalDuration = playlist.songs.reduce((total, song) => total + song.duration, 0);
                const startTime = moment(start_time, 'YYYY-MM-DD HH:mm:ss');
                const endTime = startTime.clone().add(totalDuration, 'seconds');
                playlist.start_time = start_time;
                playlist.end_time = endTime.format('YYYY-MM-DD HH:mm:ss');
            }
            return songsPage;
        },
        getPlaylistGenre: async () => {
            const start_time = moment().format('YYYY-MM-DD HH:mm:ss');
            const songsPage = await songModel.aggregate([
                {
                    $group: {
                        _id: '$genre',
                        songs: {
                            $push: {
                                title: '$title',
                                artist: '$artist',
                                genre: '$genre',
                                duration: '$duration',
                            },
                        },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        playlistTitle: '$_id',
                        songs: '$songs',
                    },
                },
            ]);
            for (const playlist of songsPage) {
                const totalDuration = playlist.songs.reduce((total, song) => total + song.duration, 0);
                const startTime = moment(start_time, 'YYYY-MM-DD HH:mm:ss');
                const endTime = startTime.clone().add(totalDuration, 'seconds');
                playlist.start_time = start_time;
                playlist.end_time = endTime.format('YYYY-MM-DD HH:mm:ss');
            }
            return songsPage;
        },
        getPlaylistRandom: async (_, { time }) => {
            const start_time = moment().format('YYYY-MM-DD HH:mm:ss');
            const songs = await songModel.find({});
            const MAX_DURATION = time; // 1 hour = 3600 second
            const oneHour = [];
            const length = songs.length;
            let currentDuration = 0;
            for (let i = 0; i < MAX_DURATION; i++) {
                const getRandomSong = Math.floor(Math.random() * length);
                const randomSong = songs[getRandomSong];
                const calculateTime = oneHour.reduce((accumulator, currentDuration) => {
                    return accumulator + currentDuration.duration;
                }, randomSong.duration); // first valuable accumulator
                if (MAX_DURATION > calculateTime) {
                    oneHour.push(randomSong);
                    currentDuration = +calculateTime;
                }
                if (calculateTime > MAX_DURATION) {
                    break;
                }
            }

            console.log(currentDuration);
            const startTime = moment(start_time, 'YYYY-MM-DD HH:mm:ss');
            const endTime = startTime.clone().add(currentDuration, 'seconds').format('YYYY-MM-DD HH:mm:ss');

            return {
                playlistTitle: 'Random',
                songs: oneHour,
                start_time: start_time,
                end_time: endTime,
            };
        },
        getOnePlaylistArtist: async (_, { artist }) => {
            const start_time = moment().format('YYYY-MM-DD HH:mm:ss');

            try {
                const onePlaylist = await songModel.aggregate([
                    {
                        $match: { artist: artist }, // Filter berdasarkan artist
                    },
                    {
                        $group: {
                            _id: '$artist',
                            songs: {
                                $push: {
                                    title: '$title',
                                    genre: '$genre',
                                    artist: '$artist',
                                    duration: '$duration',
                                },
                            },
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            playlistTitle: '$_id',
                            songs: '$songs',
                        },
                    },
                ]);

                if (onePlaylist.length === 0) {
                    return null;
                }
                const totalDuration = onePlaylist[0].songs.reduce((total, song) => total + song.duration, 0);

                const startTime = moment(start_time, 'YYYY-MM-DD HH:mm:ss');
                const endTime = startTime.clone().add(totalDuration, 'seconds');

                onePlaylist[0].start_time = start_time;
                onePlaylist[0].end_time = endTime.format('YYYY-MM-DD HH:mm:ss');

                return onePlaylist[0];
            } catch (error) {
                console.error(error);
                throw new Error('Terjadi kesalahan dalam mengambil playlist.');
            }
        },
        getOnePlaylistGenre: async (_, { genre }) => {
            const start_time = moment().format('YYYY-MM-DD HH:mm:ss');

            try {
                const onePlaylist = await songModel.aggregate([
                    {
                        $match: { genre: genre },
                    },
                    {
                        $group: {
                            _id: '$genre',
                            songs: {
                                $push: {
                                    title: '$title',
                                    genre: '$genre',
                                    artist: '$artist',
                                    duration: '$duration',
                                },
                            },
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            playlistTitle: '$_id',
                            songs: '$songs',
                        },
                    },
                ]);

                if (onePlaylist.length === 0) {
                    return null;
                }

                const totalDuration = onePlaylist[0].songs.reduce((total, song) => total + song.duration, 0);

                const startTime = moment(start_time, 'YYYY-MM-DD HH:mm:ss');
                const endTime = startTime.clone().add(totalDuration, 'seconds');

                onePlaylist[0].start_time = start_time;
                onePlaylist[0].end_time = endTime.format('YYYY-MM-DD HH:mm:ss');

                return onePlaylist[0];
            } catch (error) {
                console.error(error);
                throw new Error('Terjadi kesalahan dalam mengambil playlist.');
            }
        },
    },

    Mutation: {
        playSong: async (_, { songId }) => {
            try {
                const song = await songs.findById(songId);
                if (song) {
                    song.played = true;
                    await song.save();
                    return 'Song played successfully';
                } else {
                    return 'Song not found';
                }
            } catch (error) {
                return 'Internal Server Error';
            }
        },
        login: async (_, { username, password }) => {
            const user = await userModel.findOne({ username });
            if (!user) {
                throw new Error('User not found');
            }
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                throw new Error('Incorrect password');
            }
            const token = jwt.sign({ userId: user._id }, secretKey, {
                expiresIn: '1h',
            });

            return { user, token };
        },
        register: async (_, { username, password }) => {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const newUser = await userModel.create({
                username,
                password: hashedPassword,
            });
            return newUser;
        },
        addToPlaylist: async (_, args, context) => {
            if (!context.user) {
                throw new AuthenticationError('please login to access the data');
            }
            const addSong = await playlistModel.findByIdAndUpdate(args._id, { $addToSet: { songs: args.songs } }, { new: true });
            return addSong;
        },
        updatePlaylist: async (_, args, context) => {
            if (!context.user) {
                throw new AuthenticationError('please login to access the data');
            }
            const update = await playlistModel.findByIdAndUpdate(args._id, args, {
                new: true,
                runValidators: true,
            });
            return update;
        },
        createPlaylist: async (_, args, context) => {
            if (!context.user) {
                throw new AuthenticationError('please login to access the data');
            }
            const newPlaylist = await playlistModel.create(args);
            return newPlaylist;
        },
        deletePlaylist: async (_, args, context) => {
            if (!context.user) {
                throw new AuthenticationError('please login to access the data');
            }
            const playlist = await playlistModel.findByIdAndDelete(args._id);
            if (playlist) return true;
            else return false;
        },
        deleteAll: async (_, __, context) => {
            if (!context.user) {
                throw new AuthenticationError('please login to access the data');
            }
            const playlist = await playlistModel.deleteMany({});
            if (playlist) return true;
            else return false;
        },
        createSong: async (_, args, context) => {
            if (!context.user) {
                throw new AuthenticationError('please login to access the data');
            }
            const newSong = await songModel.create(args);
            return newSong;
        },
        updateSong: async (_, args, context) => {
            if (!context.user) {
                throw new AuthenticationError('please login to access the data');
            }
            const update = await songModel.findByIdAndUpdate(args._id, args, {
                new: true,
                runValidators: true,
            });
            return update;
        },
        deleteUser: async (_, args, context) => {
            if (!context.user) {
                throw new AuthenticationError('please login to access the data');
            }
            const userAccount = await userModel.findByIdAndDelete(args._id);
            if (userAccount) return true;
            else return false;
        },
        deleteSong: async (_, args, context) => {
            if (!context.user) {
                throw new AuthenticationError('please login to access the data');
            }
            const song = await songModel.findByIdAndDelete(args._id);
            if (song) return true;
            else return false;
        },
        sendDataToWebhook: async (_, { data }) => {
            try {
                const webhook_url = 'https://webhook.site/0ac9f3de-03b2-44a2-a888-caf96304e801';
                const response = await fetch(webhook_url, {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const responseData = await response.json();
                if (!response.ok) {
                    console.error(`Request failed with status: ${response.status}`);
                    throw new Error('Failed to send data to webhook.site');
                }
                return {
                    status: 'Success',
                    message: 'Data sent to webhook.site',
                    response: responseData,
                };
            } catch (error) {
                console.error('Error sending data to webhook:', error);
                throw new Error('Failed to send data to webhook.site');
            }
        },
    },
};
