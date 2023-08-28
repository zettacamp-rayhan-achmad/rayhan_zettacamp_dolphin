// function display book detail
function displayBookDetail({ title, author, price, fullName, paymentMethod }) {
   //destructuring function
   console.log('-------------------------------------');
   console.log('**         BOOK PURCHASED          **');
   console.log('-------------------------------------');
   console.log('Buyer Name:', fullName);
   console.log('Payment Method:', paymentMethod);
   console.log('Book Title:', title);
   console.log('Price: Rp ', parseInt(price));
   console.log('Author: ', author);
   console.log('Previously Stock:', amountStock);
   return;
}
// function display book purchasing
function displayBookPurchased(
   discountAmount,
   priceAfterDiscount,
   taxAmount,
   priceAfterTax,
   priceAfterDiscount,
   purchasedBook,
   totalPrice,
   availableStock,
   discountAndTax
) {
   console.log('discount:', discount, '%');
   console.log('Amount of discount: Rp', discountAmount);
   console.log('Price after discount: Rp ', priceAfterDiscount);
   console.log('Tax:', tax, '%');
   console.log('Amount of Tax: Rp', taxAmount);
   console.log('Price after Tax: Rp', priceAfterTax);
   console.log('Amount of Book Purchased:', purchasedBook);
   console.log('Remaining Stock:', availableStock);
   console.log('------------------------------------');
}
// function credit terms
function determineCreditTerms(totalPrice, terms) {
   const duePerTerm = totalPrice / terms;
   const currentDate = new Date();
   const nextMonth = new Date(currentDate);
   nextMonth.setMonth(currentDate.getMonth() + 1);

   let creditTerms = [];
   for (let i = 0; i < terms; i++) {
      const dueDate = new Date(nextMonth);
      dueDate.setMonth(nextMonth.getMonth() + i);

      creditTerms.push({
         term: i + 1,
         due: dueDate.toISOString().split('T')[0],
         pay: duePerTerm,
      });
   }
   //  return creditTerms;
   console.log('------------------------------------');
   console.log('**        Credit Simulation       **');
   creditTerms.forEach(function (book) {
      console.log('------------------------------------');
      console.log(`Term: ${book.term}`);
      console.log(`Due: ${book.due}`);
      console.log(`Amout you must pay: Rp ${book.pay}`);
   });
   return;
}
// function purchasing books
function purchaseBooks(
   { title, author, price, fullName, paymentMethod },
   discount,
   tax,
   amountStock,
   purchasedBook,
   terms
) {
   let discountAmount = (discount / 100) * parseInt(price);
   let priceAfterDiscount = parseInt(price - discountAmount);
   let taxAmount = parseInt((tax / 100) * priceAfterDiscount);
   let priceAfterTax = priceAfterDiscount + taxAmount;
   let result = tax > discount ? true : false;
   let discountAndTax = result === true ? 'Yes' : 'No';
   const bookPrice = price;
   let totalPrice = 0;
   let availableStock = amountStock;

   for (let i = 1; i <= purchasedBook; i++) {
      if (availableStock === 0) {
         displayBookDetail(fullDetail);
         displayBookPurchased(
            discountAmount,
            priceAfterDiscount,
            taxAmount,
            priceAfterTax,
            priceAfterDiscount,
            purchasedBook,
            totalPrice,
            availableStock,
            discountAndTax
         );
         console.log(`Out of stock, only purchasing ${i - 1} books.`);
         console.log(`cannot buy book any more`);
         break;
      }

      totalPrice += bookPrice; // Adding book price
      availableStock--;

      if (i === purchasedBook) {
         if (availableStock > 0) {
            displayBookDetail(fullDetail);
            displayBookPurchased(
               discountAmount,
               priceAfterDiscount,
               taxAmount,
               priceAfterTax,
               priceAfterDiscount,
               purchasedBook,
               totalPrice,
               availableStock,
               discountAndTax
            );
            console.log(
               `Purchased ${purchasedBook} books. ${availableStock} books can still be purchased.`
            );
         } else {
            displayBookDetail(fullDetail);
            displayBookPurchased(
               discountAmount,
               priceAfterDiscount,
               taxAmount,
               priceAfterTax,
               priceAfterDiscount,
               purchasedBook,
               totalPrice,
               availableStock,
               discountAndTax
            );
            console.log(
               `Purchased all ${purchasedBook} books. you cannot buy book any more`
            );
         }
      }
   }

   totalPrice -= totalPrice * (discount / 100);
   totalPrice += totalPrice * (tax / 100);

   console.log(`Total price: Rp ${totalPrice}`);

   determineCreditTerms(totalPrice, terms);
}
// Books Details
let bookDetail = [
   {
      title: 'The Lord of The Rings',
      author: 'J.R.R. Tolkien',
      price: 71000,
   },
   {
      title: 'The Hunger Games',
      author: 'Suzanne Collins',
      price: 82000,
   },
   {
      title: 'The Alchemist',
      author: 'Paulo Coelho',
      price: 65000,
   },
];

// Buyer detail
let buyer = {
   fullName: 'Ghazali Al Anchor',
   paymentMethod: 'Shoppe Paylater',
};

// Object Spread Operator to combine book with buyer
const books = bookDetail[1];
fullDetail = { ...books, ...buyer };

const { title, author, price } = bookDetail;
const bookTitle = bookDetail.map((book) => book.title);

// initial
const discount = 10;
const tax = 5;
const amountStock = 5;
const purchasedBook = 4;
const terms = 4;

// Run Function and Display Purchase
console.log('-------------------------------------');
console.log('**            All Books            **');
console.log('-------------------------------------');
for (let book of bookTitle) {
   console.log(book);
}
purchaseBooks(fullDetail, discount, tax, amountStock, purchasedBook, terms);
