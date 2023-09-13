const express = require('express');
const checkAuth = require('./auth');
const app = express();
app.use(express.json());
const fs = require('fs');
app.use(checkAuth);

const {
   determineCreditTerms,
   purchaseBooks,
   bookTitle,
   processObject,
   bookDetail,
} = require('./task');

app.post('/purchaseBook', async (req, res) => {
   try {
      // make new variable
      const books = req.body.books;
      const discount = req.body.discount;
      const tax = req.body.tax;
      const amountStock = req.body.amountStock;
      const purchasedBook = req.body.purchasedBook;
      const terms = req.body.terms;
      let additionalPriceTermAtMonth = req.body.additionalPriceTermAtMonth;
      const additionalPrice = req.body.additionalPrice;

      const newBook = await purchaseBooks(
         books,
         discount,
         tax,
         amountStock,
         purchasedBook,
         terms,
         additionalPrice
      );

      additionalPriceTermAtMonth -= 1;

      const totalPrice = newBook.totalPrice;
      let credit = await determineCreditTerms(totalPrice, terms);

      if (
         terms > additionalPriceTermAtMonth &&
         additionalPriceTermAtMonth >= 0
      ) {
         credit.creditTerms[additionalPriceTermAtMonth].pay += additionalPrice;
         credit.totalPayment += additionalPrice;
         credit.payment[additionalPriceTermAtMonth] += additionalPrice;
         let setTermAmount = new Set();
         for (const pay of credit.payment) {
            setTermAmount.add(pay);
         }
         const termAmount = Array.from(setTermAmount);
         const bookPurchaseMap = new Map();
         credit.creditTerms.forEach((purchase) => {
            const { month, due, pay } = purchase;

            // Check if the date is already a key in the map
            if (bookPurchaseMap.has(due)) {
               // If it is, update the value for the existing date
               const existingDetails = bookPurchaseMap.get(due);
               // const paylater = Math.ceil(pay);
               existingDetails.push({ month, pay });
               bookPurchaseMap.set(due, existingDetails);
            } else {
               // If it's not, create a new entry with the date as the key
               bookPurchaseMap.set(due, { month, pay });
            }
         });
         const bookPurchaseMapObject = {};
         for (const [key, value] of bookPurchaseMap) {
            bookPurchaseMapObject[key] = value;
         }
         // console.log(bookPurchaseMapObject.pay);
         // const group = bookPurchaseMapObject.pay
         // const result = totalPayment -
         // console.log(bookPurchaseMapObject);
         res.json({
            purchased: newBook,
            list_term_amount: termAmount,
            list_terms: bookPurchaseMapObject,
         });
      } else {
         res.json({
            message: `nothing terms, additional price terms at month failed`,
         });
      }
   } catch (err) {
      res.json({
         message: err,
         status: 'failed request',
      });
      console.log(err);
   }
});

// with await
app.get('/bookTitle-await', async (req, res) => {
   await processObject(bookDetail);
   res.json({
      message: 'success',
      bookTitle: bookTitle,
   });
});
// without await
app.get('/bookTitle-noAwait', async (req, res) => {
   processObject(bookDetail);
   res.json({
      message: 'success',
      bookTitle: bookTitle,
   });
});
// with then
app.get('/bookTitle-then', async (req, res) => {
   processObject(bookDetail)
      .then(() => {
         res.json({
            message: 'success',
            bookTitle: bookTitle,
         });
      })
      .catch((err) => {
         res.send('there is error: ', err);
      });
});

const port = 3000;
app.listen(port, () => {
   console.log(`App running on port ${port}..!`);
});
