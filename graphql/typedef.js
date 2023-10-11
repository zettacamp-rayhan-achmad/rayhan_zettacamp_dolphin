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
    type PlaylistResponse {
        playlistTitle: String
        songs: [Songs]
        start_time: String
        end_time: String
    }
    type SonglistType {
        title: String
        artist: String
        album: String
        genre: String
        duration: String
    }
    type SongPlaylistType {
        playlist_name: String
        description: String
        songlist: [SonglistType]
        creator: String
        total_favorite: Int
    }
    type WebhookResponse {
        status: String
        message: String
        response: [SongPlaylistType]
    }
    input Songlist {
        title: String
        artist: String
        album: String
        genre: String
        duration: String
    }
    input SongPlaylist {
        playlist_name: String
        description: String
        songlist: [Songlist]
        creator: String
        total_favorite: Int
    }
    type Query {
        getPlaylistArtist: [PlaylistResponse]
        getPlaylistGenre: [PlaylistResponse]
        getPlaylistRandom(time: Int!): PlaylistResponse
        getOnePlaylistArtist(artist: String!): PlaylistResponse
        getOnePlaylistGenre(genre: String!): PlaylistResponse
        getSongs: [Songs]!
        getPlaylist: [Playlist]!
        getPlaylistId(id: ID!): Playlist!
        getUser: [User]!
    }
    type Mutation {
        login(username: String!, password: String!): LoginToken
        register(username: String, password: String): User
        createSong(title: String!, artist: String!, genre: String, duration: Int!): Songs!
        updateSong(_id: ID, title: String, artist: String, genre: String, duration: Int): Songs!
        deleteSong(_id: ID!): Boolean!
        createPlaylist(playlistTitle: String!): Playlist!
        addToPlaylist(_id: ID!, songs: ID!): Playlist!
        updatePlaylist(_id: ID!, playlistTitle: String!): Playlist!
        deletePlaylist(_id: ID!): Boolean!
        deleteAll: Boolean!
        deleteUser(_id: ID!): Boolean!
        sendDataToWebhook(data: [SongPlaylist]): WebhookResponse
    }
`;
module.exports = typeDefs;
