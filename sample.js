function purchaseBookWithDiscountAndTax(
   bookDetails,
   discountAmount,
   taxAmount,
   initialStock,
   amountToPurchase
) {
   let totalPrice = 0;
   let remainingStock = initialStock;

   for (let i = 0; i < amountToPurchase; i++) {
      if (remainingStock === 0) {
         console.log('Sorry, the book is out of stock.');
         break;
      }

      let discountedPrice = bookDetails.price * (1 - discountAmount);
      let totalPriceBeforeTax = discountedPrice * (1 + taxAmount);
      totalPrice += totalPriceBeforeTax;
      remainingStock--;

      if (remainingStock > 0) {
         console.log(
            `Book '${bookDetails.title}' can still be purchased ${remainingStock} more times.`
         );
      } else {
         console.log(`Book '${bookDetails.title}' is now out of stock.`);
      }
   }

   const amountOfDiscount = bookDetails.price * discountAmount;
   const priceAfterDiscount = bookDetails.price - amountOfDiscount;
   const amountOfTax = totalPrice - discountedPrice;
   const priceAfterTax = totalPrice;

   console.log(`Book Details:`);
   console.log(`Title: ${bookDetails.title}`);
   console.log(`Price: $${bookDetails.price.toFixed(2)}`);
   console.log(`Discount: ${discountAmount * 100}%`);
   console.log(`Amount of Discount: $${amountOfDiscount.toFixed(2)}`);
   console.log(`Price After Discount: $${priceAfterDiscount.toFixed(2)}`);
   console.log(`Tax: ${taxAmount * 100}%`);
   console.log(`Amount of Tax: $${amountOfTax.toFixed(2)}`);
   console.log(`Price After Tax: $${priceAfterTax.toFixed(2)}`);
   console.log(
      `Total price for ${amountToPurchase} copies: $${totalPrice.toFixed(2)}`
   );
}

// Example data for the book
const bookDetails = {
   title: 'Title 1',
   price: 20,
};

const discountAmount = 0.1; // 10% discount
const taxAmount = 0.08; // 8% tax
const initialStock = 5;

// Example purchase
const amountToPurchase = 3;

purchaseBookWithDiscountAndTax(
   bookDetails,
   discountAmount,
   taxAmount,
   initialStock,
   amountToPurchase
);
