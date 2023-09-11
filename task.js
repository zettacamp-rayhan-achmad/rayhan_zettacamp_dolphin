// function display book detail
function displayBookDetail({ title, author, price }) {
   //destructuring function
   console.log('-------------------------------------');
   console.log('**         BOOK PURCHASED          **');
   console.log('-------------------------------------');
   console.log('Book Title:', title);
   console.log('Price: Rp ', parseInt(price));
   console.log('Author: ', author);
   console.log('Previously Stock:', amountStock);
   return { title, author, price, amountStock };
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
async function determineCreditTerms(totalPrice, terms) {
   const duePerTerm = totalPrice / terms;
   const dueDate = new Date();
   let creditTerms = [];

   for (let i = 0; i < terms; i++) {
      dueDate.setDate(dueDate.getDate() + 30);

      creditTerms.push({
         due: dueDate.toISOString().split('T')[0],
         pay: duePerTerm,
      });
   }

   await new Promise((resolve) => {
      setTimeout(resolve, 1000); // Simulate a 1-second delay
   });

   // grouping payment
   const payment = creditTerms.map((money) => money.pay);
   const totalPayment = payment.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
   }, 0);
   // console.log(creditTerms[0].pay);
   console.log('------------------------------------');
   console.log('**        Credit Simulation       **');
   console.log(creditTerms);
   console.log('total credit payment Rp', totalPayment);
   return { creditTerms, totalPayment };
}
// function purchasing books
function purchaseBooks(
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

   for (let i = 1; i <= purchasedBook; i++) {
      if (availableStock === 0) {
         displayBookDetail(books);
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
            displayBookDetail(books);
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
            displayBookDetail(books);
            displayBookPurchased(
               discountAmount,
               priceAfterDiscount,
               taxAmount,
               priceAfterTax,
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

   const credit = determineCreditTerms(totalPrice, terms);

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
];
// destructuring
const { title, author, price } = bookDetail;
const books = bookDetail[1];
const bookTitle = bookDetail.map((book) => book.title);

// initial
const discount = 10;
const tax = 5;
const amountStock = 5;
const purchasedBook = 2;
const terms = 4;

// Run Function and Display Purchase
console.log('-------------------------------------');
console.log('**            All Books            **');
console.log('-------------------------------------');
for (let book of bookTitle) {
   console.log(book);
}
purchaseBooks(books, discount, tax, amountStock, purchasedBook, terms);
module.exports = {
   displayBookDetail,
   displayBookPurchased,
   determineCreditTerms,
   purchaseBooks,
};
