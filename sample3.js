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
      // let remainingStock;
      if (purchasedBook > amountStock) {
         console.log('book out of stock, to many purchased');
         return 'jumlah';
         // remainingStock = amountStock;
      } else {
         remainingMoreStock = amountStock - purchasedBook;
         for (let i = 0; i < purchasedBook; i++) {
            if (remainingMoreStock === 0) {
               console.log('Sorry, the book is out of stock.');
               break;
            }

            if (remainingMoreStock > 0) {
               console.log(
                  `Book '${bookDetail.title}' can still be purchased ${remainingMoreStock} more times.`
               );
               break;
            } else {
               console.log(`Book '${bookDetail.title}' is now out of stock.`);
               break;
            }
            totalPrice += priceAfterTax;
            remainingMoreStock--;
            // return;
         }
      }

      let remainingStock =
         purchasedBook > amountStock ? amountStock : remainingMoreStock;
      console.log('------------ Book Detail -----------');
      console.log('Book Title:', bookDetail.title);
      console.log('Price: Rp ', parseInt(bookDetail.price));
      console.log('Author: ', bookDetail.author);
      console.log('Stock:', amountStock);
      console.log('----------- Book Purchased ----------');
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
      return priceAfterTax;
   }

   // function displayBookDetail() {}

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
   let purchasedBook = 4;
   let amountStock = 3;
   bookPurchasing(bookDetail, discount, tax, amountStock, purchasedBook);
} catch (err) {
   console.log('ERROR!', err.message);
}
