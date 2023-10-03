const songModel = require('./../model/songs-model');
const playlistModel = require('./../model/playlist-model');
const userModel = require('./../model/user');
const bcrypt = require('bcrypt');
const playlistLoad = require('./dataloader');
const { AuthenticationError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');

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
   },
   Mutation: {
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
         const addSong = await playlistModel.findByIdAndUpdate(
            args._id,
            { $addToSet: { songs: args.songs } },
            { new: true }
         );
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
   },
};
