// declare two variable
let bookOne = 'Tintin';
const bookTwo = 'Naruto';

// before update--
console.log('-------- before update -------------');
console.log('My favorite book 1:', bookOne);
console.log(`My favorite book 2:`, bookTwo);
// comparison
try {
   console.log(
      'Is book 1 same with book 2?',
      bookOne == bookTwo ? true : false
   );
} catch (err) {
   console.log('Error!', err.message);
}
// after update--
console.log('-------- after update --------------');
bookOne = ['Kingsmann', 'Percy Jackson'];
console.log(`My least favorite book: ${bookOne[0]}, ${bookOne[1]}`);
myBook();

// concat from first book and second book
function myBook(bookTwo) {
   bookTwo = 'Naruto Ninja Ranger';
   console.log('My favorite second book: ', bookTwo);
   console.log('-------- All concat --------------');
   const books = bookOne.concat(bookTwo);
   console.log(`All Books: ${books[0]}, ${books[1]}, ${books[2]}`);
   return;
}
