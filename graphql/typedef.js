const { gql } = require('apollo-server-express');

const typeDefs = gql`
   type Songs {
      _id: ID!
      title: String!
      artist: String!
      genre: String!
      duration: Int!
   }
   type Playlist {
      _id: ID!
      playlistTitle: String
      songs: [Songs]
   }
   type User {
      _id: ID!
      username: String!
      password: String!
   }
   type LoginToken {
      user: User
      token: String
   }
   type Query {
      getSongs: [Songs]!
      getPlaylist: [Playlist]!
      getPlaylistId(id: ID!): Playlist!
      getUser: [User]!
   }
   type Mutation {
      login(username: String!, password: String!): LoginToken
      register(username: String, password: String): User
      createSong(
         title: String!
         artist: String!
         genre: String
         duration: Int!
      ): Songs!
      updateSong(
         _id: ID
         title: String
         artist: String
         genre: String
         duration: Int
      ): Songs!
      deleteSong(_id: ID!): Boolean!
      createPlaylist(playlistTitle: String!): Playlist!
      addToPlaylist(_id: ID!, songs: ID!): Playlist!
      updatePlaylist(_id: ID!, playlistTitle: String!): Playlist!
      deletePlaylist(_id: ID!): Boolean!
      deleteAll: Boolean!
      deleteUser(_id: ID!): Boolean!
   }
`;
module.exports = typeDefs;
