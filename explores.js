function purchaseBooks(bookDetail, discount, tax, amountStock, purchasedBook) {
   const bookPrice = bookDetail.price;
   let totalPrice = 0;
   let availableStock = amountStock;

   for (let i = 1; i <= purchasedBook; i++) {
      if (availableStock === 0) {
         console.log(`Out of stock after purchasing ${i - 1} books.`);
         break;
      }

      totalPrice += bookPrice; // Adding book price
      availableStock--;

      if (i === purchasedBook) {
         if (availableStock > 0) {
            console.log(
               `Purchased ${purchasedBook} books. ${availableStock} books can still be purchased.`
            );
         } else {
            console.log(`Purchased all ${purchasedBook} books.`);
         }
      }
   }

   // Apply discount
   totalPrice -= totalPrice * (discount / 100);

   // Apply tax
   totalPrice += totalPrice * (tax / 100);

   console.log(`Total price: $${totalPrice.toFixed(2)}`);
}

const bookDetails = {
   title: 'Sample Book',
   price: 20,
};

const discountPercentage = 10; // 10% discount
const taxPercentage = 5; // 5% tax
const initialStock = 1; // Initial stock of books
const booksToPurchase = 2; // Number of books to be purchased

purchaseBooks(
   bookDetails,
   discountPercentage,
   taxPercentage,
   initialStock,
   booksToPurchase
);
