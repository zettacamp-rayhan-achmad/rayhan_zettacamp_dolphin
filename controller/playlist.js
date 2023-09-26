const express = require('express');
const app = express();
const playlist = require('./../model/playlist-model');
const songs = require('./../model/songs-model');

// playlist
exports.createNewPlaylist = async (req, res) => {
   try {
      const playlistTitle = req.body.playlistTitle;
      // const songId = req.body.songId;

      const newPlaylist = await playlist.create({
         playlistTitle: playlistTitle,
      });
      res.status(201).json({
         status: 'create success',
         data: {
            playlist: newPlaylist,
         },
      });
   } catch (err) {
      res.status(400).json({
         status: 'error',
         message: err,
      });
   }
};
exports.addSongsToPlaylist = async (req, res) => {
   try {
      const playlistId = req.body.playlistId;
      const songId = req.body.songId;
      const oldPlaylistId = req.body.oldPlaylistId;

      const addSong = await playlist
         .findByIdAndUpdate(
            playlistId,
            { $addToSet: { songs: songId } },
            { new: true }
         )
         .populate('songs');
      const addPlaylistId = await songs.findByIdAndUpdate(
         songId,
         { playlist: playlistId },
         {
            new: true,
            runValidators: true,
         }
      );
      // delete
      // await playlist.updateOne(
      //    { _id: oldPlaylistId },
      //    { $pull: { songs: { _id: songId } } }
      // );
      // console.log('hallo');

      res.status(201).json({
         status: 'add song success',
         data: addSong,
         newSong: addPlaylistId,
      });
   } catch (err) {
      res.status(400).json({
         status: 'error',
         message: err,
      });
   }
};
exports.getAllPlayList = async (req, res) => {
   try {
      const getPlaylist = await playlist.find().populate('songs');
      res.status(201).json({
         status: 'get success',
         data: {
            playlist: getPlaylist,
         },
      });
   } catch (err) {
      res.status(400).json({
         status: 'error',
         message: err,
      });
   }
};
exports.updatePlaylist = async (req, res) => {
   try {
      const playlistId = req.params.id;
      const update = await playlist.findByIdAndUpdate(playlistId, req.body, {
         new: true,
         runValidators: true,
      });
      res.status(201).json({
         status: 'update success',
         data: {
            playlist: update,
         },
      });
   } catch (err) {
      res.status(400).json({
         status: 'error',
         message: err,
      });
   }
};
exports.deletePlaylist = async (req, res) => {
   try {
      await playlist.findByIdAndDelete(req.params.id);
      res.status(200).json({
         status: 'delete success',
      });
   } catch (err) {
      res.status(400).json({
         status: 'error',
         message: err,
      });
   }
};

// task implement aggregate
exports.aggregatePlaylist = async (req, res) => {
   try {
      const matchByTitlePlaylist = req.body.matchByTitlePlaylist;
      const amountDocument = req.body.amountDocument;
      const pageNumber = req.body.pageNumber;
      const skipAmount = (pageNumber - 1) * amountDocument;
      const songsPage = await playlist.aggregate([
         {
            $facet: {
               playlist: [
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
                        _id: 1,
                        playlistTitle: 1,
                        allSongs: 1,
                     },
                  },
                  { $sort: { playlistTitle: -1 } },
               ],
               allPlaylistTitle: [
                  {
                     $group: {
                        _id: '$playlistTitle',
                        count: { $sum: 1 },
                     },
                  },
                  {
                     $project: {
                        _id: 0,
                        playlistTitle: '$_id',
                     },
                  },
               ],
            },
         },
      ]);
      res.status(200).json({
         status: 'success',
         requestAt: req.requestTime,
         data: {
            songspage: songsPage,
         },
      });
   } catch (err) {
      res.status(400).json({
         status: 'failed request',
         message: err,
      });
   }
};

exports.aggregatePlaylistPercobaan = async (req, res) => {
   try {
      const matchByGenre = req.body.matchByGenre;
      const amountDocument = req.body.amountDocument;
      const pageNumber = req.body.pageNumber;
      const skipAmount = (pageNumber - 1) * amountDocument;
      const songsPage = await playlist.aggregate([
         {
            $match: {
               genre: matchByGenre,
            },
         },
         {
            $facet: {
               Songs: [
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
            song: songsPage,
         },
      });
   } catch (err) {
      res.status(400).json({
         status: 'failed request',
         message: err,
      });
   }
};
