// function display book detail
function displayBookDetail(bookDetail) {
   console.log('-------------------------------------');
   console.log('**         BOOK PURCHASED          **');
   console.log('-------------------------------------');
   console.log('Book Title:', bookDetail.title);
   console.log('Price: Rp ', parseInt(bookDetail.price));
   console.log('Author: ', bookDetail.author);
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
   console.log('Is tax greater than discount:', discountAndTax);
   console.log('------------------------------------');
}
// function credit terms
function determineCreditTerms(terms) {
   const currentDate = new Date();
   let creditTerms = [];
   for (let i = 0; i < terms; i++) {
      // const dueDate = new Date(currentDate);
      currentDate.setDate(currentDate.getDate() + 30);

      creditTerms.push({
         term: i + 1,
         due: currentDate.toISOString().split('T')[0],
      });
   }
   //  return creditTerms;
   console.log('---------------------------------------');
   console.log('**         Credit Simulation         **');
   console.log(`pay a credit each 30 days until ${terms} month`);

   creditTerms.forEach(function (dueDate) {
      console.log('---------------------------------------');
      console.log(`Term: ${dueDate.term}`);
      console.log(`Due: ${dueDate.due}`);
   });
   const lastValue = creditTerms.pop();
   console.log(
      '* deadline for paying off all credit payments |',
      lastValue.due
   );
}
// function purchasing books
function purchaseBooks(
   bookDetail,
   discount,
   tax,
   amountStock,
   purchasedBook,
   terms
) {
   let discountAmount = (discount / 100) * parseInt(bookDetail.price);
   let priceAfterDiscount = parseInt(bookDetail.price - discountAmount);
   let taxAmount = parseInt((tax / 100) * priceAfterDiscount);
   let priceAfterTax = priceAfterDiscount + taxAmount;
   let result = tax > discount ? true : false;
   let discountAndTax = result === true ? 'Yes' : 'No';
   const bookPrice = bookDetail.price;
   let totalPrice = 0;
   let availableStock = amountStock;

   for (let i = 1; i <= purchasedBook; i++) {
      if (availableStock === 0) {
         displayBookDetail(bookDetail);
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
            displayBookDetail(bookDetail);
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
            displayBookDetail(bookDetail);
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

   determineCreditTerms(terms);
}

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

const bookTitle = bookDetail.map((book) => book.title);

// initial
const discount = 10;
const tax = 5;
const amountStock = 5;
const purchasedBook = 4;
const terms = 6;

// Run Function and Display Purchase
console.log('-------------------------------------');
console.log('**            All Books            **');
console.log('-------------------------------------');
for (const book of bookTitle) {
   console.log(book);
}

purchaseBooks(bookDetail[1], discount, tax, amountStock, purchasedBook, terms);
