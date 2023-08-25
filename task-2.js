// Creating Variable
const bookPriceNaruto = 120000;
const bookPriceTintin = 130000;

if (bookPriceTintin === bookPriceNaruto) {
   console.log('the second of books have the same price!');
} else if (bookPriceNaruto > bookPriceTintin && bookPriceNaruto > 13000) {
   console.log('The highest price is Naruto: Rp', bookPriceNaruto);
} else if (bookPriceTintin > bookPriceNaruto) {
   console.log('The highest price is Tintin: Rp', bookPriceTintin);
} else {
   console.log('make sure the type of value is int');
}
// Average Values
const average = (bookPriceNaruto + bookPriceTintin) / 2;
console.log('The average price is Rp', average);

// Operator Ternary
const totalPrice = average > 500000 ? 'Expensive' : 'Cheap';
console.log(totalPrice);
