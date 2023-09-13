const fs = require('fs');
// function credit terms
async function determineCreditTerms(totalPrice, terms) {
   const duePerTerm = totalPrice / terms;
   const dueDate = new Date();
   let creditTerms = [];

   for (let i = 0; i < terms; i++) {
      dueDate.setDate(dueDate.getDate() + 30);
      creditTerms.push({
         month: i + 1,
         due: dueDate.toISOString().split('T')[0],
         pay: Math.ceil(duePerTerm),
      });
   }

   // await new Promise((resolve) => {
   //    setTimeout(resolve, 2000);
   // });

   // grouping payment
   const payment = creditTerms.map((money) => money.pay);
   const totalPayment = payment.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
   }, 0);

   console.log('**        Credit Simulation       **');
   console.log(creditTerms);
   return { creditTerms, payment, totalPayment };
}
// function purchasing books
async function purchaseBooks(
   { title, author, price },
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

   await new Promise((resolve) => {
      setTimeout(resolve, 500);
   });
   for (let i = 1; i <= purchasedBook; i++) {
      if (availableStock === 0) {
         // console.log(`Out of stock, only purchasing ${i - 1} books.`);
         // console.log(`cannot buy book any more`);
         break;
      }

      totalPrice += bookPrice; // Adding book price
      availableStock--;

      if (i === purchasedBook) {
         if (availableStock > 0) {
            // console.log(
            //    `Purchased ${purchasedBook} books. ${availableStock} books can still be purchased.`
            // );
         } else {
         }
      }
   }

   totalPrice -= totalPrice * (discount / 100);
   totalPrice += totalPrice * (tax / 100);

   determineCreditTerms(totalPrice, terms);
   // console.log(`Total price: Rp ${totalPrice}`);

   return {
      title,
      author,
      price,
      discountAmount,
      priceAfterDiscount,
      taxAmount,
      priceAfterTax,
      purchasedBook,
      availableStock,
      totalPrice,
   };
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
   {
      title: 'Seconhand Time',
      author: 'Svetlana Alexievich',
      price: 72000,
   },
   {
      title: 'Wolf Hall',
      author: 'Hilary Mantel',
      price: 48000,
   },
];
// destructuring
const { title, author, price } = bookDetail;
const books = bookDetail[1];
const bookTitle = bookDetail.map((book) => book.title);

async function processObject(bookDetail) {
   for (const book of bookDetail) {
      await new Promise((resolve) => {
         setTimeout(() => {
            console.log(book.title);
            resolve();
         }, 2000);
      });
      const newBookTitle = book.title + '\n';
      fs.appendFile('book.txt', newBookTitle, (err) => {
         if (err) {
            console.log('failed write text', err);
            return;
         }
      });
   }
}

// initial
const discount = 10;
const tax = 5;
const amountStock = 5;
const purchasedBook = 2;
const terms = 4;

purchaseBooks(books, discount, tax, amountStock, purchasedBook, terms);
module.exports = {
   determineCreditTerms,
   purchaseBooks,
   processObject,
   bookTitle,
   bookDetail,
};
