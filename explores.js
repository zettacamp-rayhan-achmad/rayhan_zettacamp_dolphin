try {
   // Function
   function bookPurchase(bookDetail, discount, tax) {
      const discountAmount = (discount / 100) * parseInt(bookDetail.price);
      const priceAfterDiscount = parseInt(bookDetail.price - discountAmount);
      const taxAmount = parseInt((tax / 100) * priceAfterDiscount);
      const priceAfterTax = priceAfterDiscount + taxAmount;
      const result = tax > discount ? true : false;
      const discountAndTax = result === true ? 'Yes' : 'No';

      console.log('------------ Book Detail -----------');
      console.log('Book Title:', bookDetail.title);
      console.log('Price: Rp ', parseInt(bookDetail.price));
      console.log('Author: ', bookDetail.author);
      console.log('----------- Book Purchase ----------');
      console.log('Amount of discount: Rp', discountAmount);
      console.log('Price after discount: Rp ', priceAfterDiscount);
      console.log('Amount of Tax: Rp', taxAmount);
      console.log('Price after Tax: Rp', priceAfterTax);
      console.log('Is tax greater than discount:', discountAndTax);
      console.log('------------------------------------');
      return;
   }

   // Declaration Variable
   const bookDetail = {
      title: 'Naruto Shippuden',
      price: 100000,
      author: 'Masashi Kishimoto',
   };
   const discount = 10;
   const tax = 5;
   bookPurchase(bookDetail, discount, tax);
} catch (err) {
   console.log('ERROR!', err.message);
}
