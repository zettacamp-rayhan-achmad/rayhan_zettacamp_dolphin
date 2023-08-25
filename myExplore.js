const books = [
   {
      title: 'Naruto Shippuden',
      price: 120000,
   },
];

// Pushing the new value of object into the existing array
books.push({
   title: 'The Last Witch Hunter',
   price: 110000,
   publisher: 'Bloomsburry',
});
books[0].publisher = 'Shonen Jump';
console.log(books);

// Comparison for highest price
if (books[0].price > books[1].price) {
   console.log('The highest price is Naruto: Rp', books[0].price);
} else if (books[1].price == books[0].price) {
   console.log('twice of books have the same price!');
} else {
   console.log('The highest price is Percy Jeckson: Rp', books[1].price);
}

// Average Values
const sum = books[0].price + books[1].price;
const average = sum / 2;
console.log('The average price is Rp', average);

// Operator Ternary
const totalPrice = average > 500000 ? 'Expensive' : 'Cheap';
console.log(totalPrice);
