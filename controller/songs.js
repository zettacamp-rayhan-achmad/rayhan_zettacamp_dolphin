const songs = require('./../model/songs-model');
const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userAccount = require('./../model/user');

const secretKey = 'rahasia';
// songs
exports.createNewSong = async (req, res) => {
    try {
        const title = req.body.title;
        const artist = req.body.artist;
        const genre = req.body.genre;
        const duration = req.body.duration;

        const newSong = await songs.create({
            title: title,
            artist: artist,
            genre: genre,
            duration: duration,
        });
        res.status(201).json({
            status: 'create success',
            data: {
                songs: newSong,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'error',
            message: err,
        });
    }
};
exports.getAllSong = async (req, res) => {
    try {
        const getSongs = await songs.find();
        res.status(200).json({
            data: getSongs,
        });
    } catch (err) {
        res.status(400).json({
            status: 'error',
            message: err,
        });
    }
};
exports.getSongById = async (req, res) => {
    try {
        const song = await songs.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            requestAt: req.requestTime,
            data: {
                songs: song,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'failed request',
            message: err,
        });
    }
};
exports.updateSong = async (req, res) => {
    try {
        const updateSong = await songs.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            status: 'update success',
            data: {
                updateSong,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'error, invalid object or ID',
            message: err,
        });
    }
};
exports.deleteSongById = async (req, res) => {
    try {
        const deleteSong = await songs.findByIdAndDelete(req.params.id);
        if (!deleteSong) {
            res.status(404).json({
                status: 'error',
                message: 'song not found',
            });
        } else {
            res.status(204).json({
                status: 'delete success',
                data: null,
            });
        }
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message,
        });
    }
};
exports.deleteAllSongs = async (req, res) => {
    try {
        const deleteSong = await songs.deleteMany({});
        if (!deleteSong) {
            res.status(404).json({
                status: 'error',
                message: 'song not found',
            });
        } else {
            res.status(204).json({
                status: 'delete all success',
                data: null,
            });
        }
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message,
        });
    }
};

// task 3 implement aggregate
exports.aggregateSong = async (req, res) => {
    try {
        const matchByGenre = req.body.matchByGenre;
        const amountDocument = req.body.amountDocument;
        const pageNumber = req.body.pageNumber;
        const skipAmount = (pageNumber - 1) * amountDocument;
        const songsPage = await songs.aggregate([
            {
                $facet: {
                    Songs: [
                        { $match: { genre: matchByGenre } },
                        { $skip: skipAmount },
                        { $limit: amountDocument },
                        {
                            $lookup: {
                                from: 'songs',
                                localField: 'songs',
                                foreignField: '_id',
                                as: 'allSongs',
                            },
                        },
                        {
                            $project: {
                                _id: 0,
                                title: 1,
                                Songs: 1,
                                artist: 1,
                                genre: 1,
                                duration: 1,
                                playlist: 1,
                            },
                        },
                        { $sort: { duration: -1 } },
                    ],
                    amountDuration: [
                        { $match: { genre: matchByGenre } },
                        { $skip: skipAmount },
                        { $limit: amountDocument },
                        {
                            $group: {
                                _id: null,
                                duration: { $sum: '$duration' },
                            },
                        },
                        {
                            $project: {
                                _id: 0,
                                duration: 1,
                            },
                        },
                    ],
                },
            },
            {
                $addFields: {
                    page: pageNumber,
                },
            },
        ]);
        res.status(200).json({
            status: 'success',
            requestAt: req.requestTime,
            data: {
                purchase: songsPage,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'failed request',
            message: err,
        });
    }
};

// library day 6
exports.generateToken = async (req, res) => {
    try {
        const username = req.body.username;
        const users = {
            name: username,
        };
        const user = await userAccount.findOne({ username: req.body.username });
        if (!user) {
            res.status(500).json({
                message: 'user not found',
            });
        }
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!passwordMatch) {
            throw new Error('Incorrect password');
        }
        const accessToken = jwt.sign(users, secretKey, {
            expiresIn: '1h',
        });
        console.log('check');
        res.json({ accessToken: accessToken });
        return { user, accessToken };
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};
exports.verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            throw new Error('token not found');
        }
        jwt.verify(token, secretKey, (err) => {
            if (err) {
                throw new Error('failed verify token');
            }
            next();
        });
    } catch (err) {
        res.json({
            message: err.message,
        });
    }
};
exports.updateWebhookSongs = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        const apiUrl = 'https://webhook.site/0ac9f3de-03b2-44a2-a888-caf96304e801'; // Ganti dengan URL API target Anda
        const response = await fetch(apiUrl, {
            method: 'POST',
            body: JSON.stringify(req.body),
            headers: {
                'Content-Type': 'application/json',
                authorization: authHeader,
            },
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log(req.body, req.params);
            const updatedSong = await songs.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
            });
            if (!updatedSong) {
                throw new Error('failed, error object or ID song');
            }

            res.status(200).json({
                message: 'Song successfully updated',
                update: responseData,
                updatedSong,
            });
        } else {
            throw new Error('url or req failed forward to webhook');
        }
    } catch (err) {
        res.status(400).json({
            status: err.message,
        });
    }
};
