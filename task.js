// Create an array of objects to save song details
const songList = [
   {
      title: 'Blending Light',
      artist: 'The Weekend',
      genre: 'Rock',
      duration: 380,
   },
   {
      title: 'De Javu',
      artist: 'Olivia Rodrigo',
      genre: 'Hip Hop',
      duration: 240,
   },
   {
      title: 'Levitating',
      artist: 'The Weekend',
      genre: 'Pop',
      duration: 310,
   },
   {
      title: 'Montero',
      artist: 'Olivia Rodrigo',
      genre: 'Hip Hop',
      duration: 190,
   },
   {
      title: 'Kiss Me More',
      artist: 'Doja Cat',
      genre: 'Pop',
      duration: 260,
   },
];

// Create a function to group songs based on artists
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

// Create a function to group songs based on genre
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

// Create a function to group songs less than 1 hour with random artists & genres
function groupSongsUnderOneHour(songs) {
   const MAX_DURATION = 3600; // 1 hour = 3600 second
   const oneHour = [];
   for (let xx = 0; xx < MAX_DURATION; xx++) {
      const getRandomSong = Math.floor(Math.random() * songs.length);
      const randomSong = songs[getRandomSong];
      const calculateTime = oneHour.reduce((accumulator, currentDuration) => {
         return accumulator + currentDuration.duration;
      }, randomSong.duration); // first valuable accumulator
      if (MAX_DURATION > calculateTime) {
         oneHour.push(randomSong);
      }
      if (calculateTime > MAX_DURATION) {
         break;
      }
   }
   //  const oneHourTitle = oneHour.map((songs) => songs.title);
   return oneHour;
}

// Group songs by artist
const songsGroupedByArtist = groupSongsByArtist(songList);
console.log('---------------------------------------');
console.log('**          Group By Artist          **');
console.log('---------------------------------------');
console.log(songsGroupedByArtist);

// Group songs by genre
const songsGroupedByGenre = groupSongsByGenre(songList);
console.log('---------------------------------------');
console.log('**          Group By Genre           **');
console.log('---------------------------------------');
console.log(songsGroupedByGenre);

// Group songs under 1 hour by random artists & genres
const songsUnderOneHour = groupSongsUnderOneHour(songList);
console.log('---------------------------------------');
console.log('**        1 Hour Random Song         **');
console.log('---------------------------------------');
songsUnderOneHour.forEach(function (element) {
   console.log(`* ${element.title} | ${element.genre} |`, element.duration);
});
