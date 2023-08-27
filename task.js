// Step 1: Create an array of objects to save song details
const songList = [
   {
      title: 'Blending Light',
      artist: 'The Weekend',
      genre: 'Rock',
      duration: 880,
   },
   {
      title: 'De Javu',
      artist: 'Olivia Rodrigo',
      genre: 'Hip Hop',
      duration: 340,
   },
   {
      title: 'Levitating',
      artist: 'Dua Lipa',
      genre: 'Pop',
      duration: 510,
   },
   {
      title: 'Montero',
      artist: 'Lil Nas X',
      genre: 'Hip Hop',
      duration: 250,
   },
   {
      title: 'Kiss Me More',
      artist: 'Doja Cat',
      genre: 'Pop',
      duration: 380,
   },
];

// Step 2: Create a function to group songs based on artists
function groupSongsByArtist(songs) {
   const groupedSongs = {};

   songs.forEach((song) => {
      if (!groupedSongs[song.artist]) {
         groupedSongs[song.artist] = [];
      }
      groupedSongs[song.artist].push(song);
   });

   return groupedSongs;
}

// Step 3: Create a function to group songs based on genre
function groupSongsByGenre(songs) {
   const groupedSongs = {};

   songs.forEach((song) => {
      if (!groupedSongs[song.genre]) {
         groupedSongs[song.genre] = [];
      }
      groupedSongs[song.genre].push(song);
   });

   return groupedSongs;
}

// Step 4: Create a function to group songs less than 1 hour with random artists & genres
function groupSongsUnderOneHour(songs) {
   const MAX_DURATION = 3600; // 1 hour in seconds
   const groupedSongs = {};

   for(let songHour of songs) {
      if (!groupedSongs[song.artist]) {
         groupedSongs[song.artist] = [];
      }
      if (song.duration <= MAX_DURATION) {
         groupedSongs[song.artist].push(song);
      }
   });

   return groupedSongs;
}

// Group songs by artist
const songsGroupedByArtist = groupSongsByArtist(songList);
console.log('Songs Grouped by Artist:', songsGroupedByArtist);

// Group songs by genre
const songsGroupedByGenre = groupSongsByGenre(songList);
console.log('Songs Grouped by Genre:', songsGroupedByGenre);

// Group songs under 1 hour by random artists & genres
const songsUnderOneHour = groupSongsUnderOneHour(songList);
// for (let songs of songsUnderOneHour) {
console.log('Songs Under 1 Hour:', songsUnderOneHour);
// }
