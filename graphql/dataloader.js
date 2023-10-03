const DataLoader = require('dataloader');
const playlistModel = require('./../model/playlist-model');
const songModel = require('./../model/songs-model');

const batchLoadPlaylist = async (keys) => {
   const documents = await playlistModel
      .find({ _id: { $in: keys } })
      .populate('songs');
   const documentMap = {};
   documents.forEach((doc) => {
      documentMap[doc._id.toString()] = doc;
   });
   return keys.map((key) => documentMap[key.toString()]);
};

const playlistLoad = new DataLoader(batchLoadPlaylist);

module.exports = playlistLoad;
