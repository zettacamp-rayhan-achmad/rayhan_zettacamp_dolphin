try {
   // Function
   function bookPurchasing(
      bookDetail,
      discount,
      tax,
      amountStock,
      purchasedBook
   ) {
      let discountAmount = (discount / 100) * parseInt(bookDetail.price);
      let priceAfterDiscount = parseInt(bookDetail.price - discountAmount);
      let taxAmount = parseInt((tax / 100) * priceAfterDiscount);
      let priceAfterTax = priceAfterDiscount + taxAmount;
      let totalPrice = priceAfterTax * purchasedBook;
      let result = tax > discount ? true : false;
      let discountAndTax = result === true ? 'Yes' : 'No';
      if (purchasedBook > amountStock) {
         displayBookDetail();
         console.log('amount purchased :', purchasedBook);
         console.log('!book out of stock, to many purchased');
         return;
      } else {
         remainingMoreStock = amountStock - purchasedBook;
         for (let i = 0; i < purchasedBook; i++) {
            if (remainingMoreStock === 0) {
               console.log('-------------------------------------');
               console.log('** book purchase successful,');
               console.log('but the book is out of stock.');
               console.log('no books to buy');
               break;
            }

            // if (remainingMoreStock > 0) {
            //    console.log('-------------------------------------');
            //    console.log(
            //       `** Book ${bookDetail.title} can still be purchased ${remainingMoreStock} more times.`
            //    );
            //    break;
            // }
            else {
               console.log('-------------------------------------');
               console.log(
                  `** Book ${bookDetail.title} can still be purchased ${remainingMoreStock} more times.`
               );
               console.log(
                  `** Book ${bookDetail.title} can still be purchased ${
                     i - 1
                  } more times.`
               );
               // break;
            }
         }
      }

      let remainingStock =
         purchasedBook > amountStock ? amountStock : remainingMoreStock;
      displayBookDetail();
      displayBookPurchased(
         discountAmount,
         priceAfterDiscount,
         taxAmount,
         priceAfterTax,
         priceAfterDiscount,
         purchasedBook,
         totalPrice,
         remainingStock,
         discountAndTax
      );

      return;
   }

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
   function displayBookPurchased(
      discountAmount,
      priceAfterDiscount,
      taxAmount,
      priceAfterTax,
      priceAfterDiscount,
      purchasedBook,
      totalPrice,
      remainingStock,
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
      console.log('Total Price: Rp', totalPrice);
      console.log('Remaining Stock:', remainingStock);
      console.log('Is tax greater than discount:', discountAndTax);
      console.log('------------------------------------');
   }

   // function constractor
   function book(title, price, author) {
      this.title = title;
      this.price = price;
      this.author = author;
      return;
   }

   let bookDetail = new book('Naruto Shippuden', 120000, 'Masashi Kisimoto');
   let discount = 10;
   let tax = 5;
   let purchasedBook = 2;
   let amountStock = 8;
   bookPurchasing(bookDetail, discount, tax, amountStock, purchasedBook);
} catch (err) {
   console.log('ERROR!', err.message);
}
