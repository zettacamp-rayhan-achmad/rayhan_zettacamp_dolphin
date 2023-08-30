// Create an array of objects to save song details
const songList = [
   {
      title: 'Blending Light',
      artist: 'Justin Bieber',
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
      artist: 'Justin Bieber',
      genre: 'Pop',
      duration: 210,
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
   {
      title: 'Sugar',
      artist: 'Maroon 5',
      genre: 'Pop',
      duration: 320,
   },
   {
      title: 'Wildest Dreams',
      artist: 'Taylor Swift',
      genre: 'Hip Hip',
      duration: 360,
   },
   {
      title: 'Senorita',
      artist: 'Shawn Mendes',
      genre: 'Hip Hop',
      duration: 355,
   },
   {
      title: 'Viva La Vida',
      artist: 'Coldplay',
      genre: 'Pop',
      duration: 540,
   },
   {
      title: 'Girl Like You',
      artist: 'Maroon 5',
      genre: 'Pop',
      duration: 480,
   },
   {
      title: 'Shake It Off',
      artist: 'Taylor Swift',
      genre: 'Pop',
      duration: 330,
   },
   {
      title: 'Blank Space',
      artist: 'Taylor Swift',
      genre: 'Hip Hip',
      duration: 310,
   },
   {
      title: 'Starboy',
      artist: 'The Weekend',
      genre: 'Rock',
      duration: 260,
   },
   {
      title: 'What Do You Mean',
      artist: 'Justin Bieber',
      genre: 'Pop',
      duration: 560,
   },
   {
      title: 'Memories',
      artist: 'Maroon 5',
      genre: 'Hip Hop',
      duration: 230,
   },
   {
      title: 'Good For You',
      artist: 'Olivia Rodrigo',
      genre: 'Hip Hop',
      duration: 200,
   },
   {
      title: 'Bohemian Rhapsody',
      artist: 'Queen',
      genre: 'Rock',
      duration: 250,
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
   const length = songs.length;
   oneHourLength = 0;
   for (let i = 0; i < MAX_DURATION; i++) {
      const getRandomSong = Math.floor(Math.random() * songs.length);
      const randomSong = songs[getRandomSong];
      const calculateTime = oneHour.reduce((accumulator, currentDuration) => {
         return accumulator + currentDuration.duration;
      }, randomSong.duration); // first valuable accumulator
      if (MAX_DURATION > calculateTime) {
         oneHour.push(randomSong);
         oneHourLength++;
      }
      if (oneHourLength === length) {
         break;
      }
      if (calculateTime > MAX_DURATION) {
         break;
      }
   }
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
const totalDuration = groupSongsUnderOneHour(songList);

songsUnderOneHour.forEach(({ title, artist, genre, duration }) => {
   console.log(`* ${title} | ${artist} | ${genre} |`, duration);
});
