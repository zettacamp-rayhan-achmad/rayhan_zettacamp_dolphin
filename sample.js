// const array = [10, 20, 30, 40, 50];

// const randomIndex = Math.floor(Math.random() * array.length);
// const randomValue = array[randomIndex];

// console.log('Nilai Acak:', randomValue);

// Create a variable to save song lists with song details
const songList = [
   { title: 'Song 1', artist: 'Artist A', genre: 'Pop', duration: 3.5 },
   { title: 'Song 2', artist: 'Artist B', genre: 'Rock', duration: 4.2 },
   { title: 'Song 3', artist: 'Artist A', genre: 'Hip-hop', duration: 2.8 },
   // ... other songs
];

// Create a function to group songs based on artists
function groupSongsByArtist(songs) {
   const groupedByArtist = {};
   songs.forEach((song) => {
      if (!groupedByArtist[song.artist]) {
         groupedByArtist[song.artist] = [];
      }
      groupedByArtist[song.artist].push(song);
   });
   return groupedByArtist;
}

// Create a function to group songs based on genre
function groupSongsByGenre(songs) {
   const groupedByGenre = {};
   songs.forEach((song) => {
      if (!groupedByGenre[song.genre]) {
         groupedByGenre[song.genre] = [];
      }
      groupedByGenre[song.genre].push(song);
   });
   return groupedByGenre;
}

// Create a function to group songs with random artists & genres, less than 1 hour total duration
function groupRandomSongsLessThanOneHour(songs) {
   const randomSongs = [];
   let totalDuration = 0;

   while (totalDuration < 60) {
      const randomIndex = Math.floor(Math.random() * songs.length);
      const randomSong = songs[randomIndex];
      if (totalDuration + randomSong.duration <= 60) {
         randomSongs.push(randomSong);
         totalDuration += randomSong.duration;
      }
   }

   return randomSongs;
}

// Group songs by artist and genre
const songsGroupedByArtist = groupSongsByArtist(songList);
const songsGroupedByGenre = groupSongsByGenre(songList);

// Group random songs less than 1 hour
const randomSongsLessThanOneHour = groupRandomSongsLessThanOneHour(songList);

console.log('Songs Grouped by Artist:', songsGroupedByArtist);
console.log('Songs Grouped by Genre:', songsGroupedByGenre);
console.log('Random Songs Less Than 1 Hour:', randomSongsLessThanOneHour);
