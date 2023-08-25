// declare two variable
let bookOne = 'Tintin';
const bookTwo = new Set(['Conan']);

// before update--
console.log('-------- before update -------------');
console.log('My favorite book 1:', bookOne);
bookTwo.forEach((value) => {
   console.log(`My favorite book 2:`, value);
});

bookTwo.delete('Conan'); // delete second favorite book

// after update--
console.log('-------- after update --------------');
bookTwo.add('Sherlock Holmes');
bookTwo.forEach((value) => {
   console.log('My favorite second book: ', value);
});

// update favorite book 1
bookOne = ['Kingsmann', 'Percy Jackson'];
console.log(`My least favorite book: ${bookOne[0]}, ${bookOne[1]}`);

// concat from first book and second book
bookTwo.forEach((value) => {
   const books = bookOne.concat(value);
   console.log(`All Books: ${books[0]}, ${books[1]}, ${books[2]}`);
});

// update const data
// function myBook(bookTwo) {
//    bookTwo = 'Naruto Ninja Ranger';
//    console.log('My favorite second book: ', bookTwo);
//    return;
// }
// myBook();
// console.log(bookTwo);

// bookTwo = 'Afterdeath';
// console.log(bookTwo);
