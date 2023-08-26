// function display book detail
function displayBookDetail() {
   console.log('-------------------------------------');
   console.log('-**         BOOK DETAILS          **-');
   console.log('-------------------------------------');
   console.log('Book Title:', bookDetail.title);
   console.log('Price: Rp ', parseInt(bookDetail.price));
   console.log('Author: ', bookDetail.author);
   console.log('Stock:', amountStock);
   console.log('-------------------------------------');
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
   console.log('            Book Purchased           ');
   console.log('-------------------------------------');
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
// function purchasing books
function purchaseBooks(bookDetail, discount, tax, amountStock, purchasedBook) {
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
         displayBookDetail();
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
            displayBookDetail();
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
            displayBookDetail();
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
}

function book(title, price, author) {
   this.title = title;
   this.price = price;
   this.author = author;
   return;
}

let bookDetail = new book('Naruto Shippuden', 14000, 'Masashi Kisimoto');

const discount = 10; // 10% discount
const tax = 5; // 5% tax
const amountStock = 4; // Initial stock of books
const purchasedBook = 4; // Number of books to be purchased

purchaseBooks(bookDetail, discount, tax, amountStock, purchasedBook);
