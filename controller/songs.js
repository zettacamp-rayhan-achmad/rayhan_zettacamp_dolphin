const express = require('express');
const app = express();
const songs = require('./../model/songs-model');

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
      res.status(201).json({
         status: 'create success',
         data: {
            songs: getSongs,
         },
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
      const updateSong = await songs.findByIdAndUpdate(
         req.params.id,
         req.body,
         {
            new: true,
            runValidators: true,
         }
      );
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
                  { $sort: { duration: 1 } },
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
