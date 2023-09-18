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

         // create new map
         const bookPurchaseMap = new Map();
         credit.creditTerms.forEach((purchase) => {
            const { month, due, pay } = purchase;

            // Check if the date is already a key in the map
            if (bookPurchaseMap.has(due)) {
               const existingDetails = bookPurchaseMap.get(due);
               existingDetails.push({ month, pay });
               bookPurchaseMap.set(due, existingDetails);
            } else {
               bookPurchaseMap.set(due, { month, pay });
            }
         });
         console.log(bookPurchaseMap);
         // change map to object
         const bookPurchaseMapObject = {};
         for (const [key, value] of bookPurchaseMap) {
            bookPurchaseMapObject[key] = value;
         }
         // return all key from object
         const keysArray = Object.keys(bookPurchaseMapObject);
         const lastKey = keysArray[keysArray.length - 1];

         let totalPay = 0;
         // Iterasi through each element in object
         for (const key in bookPurchaseMapObject) {
            if (bookPurchaseMapObject.hasOwnProperty(key)) {
               totalPay += bookPurchaseMapObject[key].pay;
            }
         }

         // create number without decimal number
         const payValues = [];
         const listTerms = bookPurchaseMapObject;
         const termKeys = Object.keys(listTerms);

         for (let i = 0; i < termKeys.length - 1; i++) {
            const key = termKeys[i];
            const term = listTerms[key];
            payValues.push(term.pay);
         }
         const payValuesReduce = payValues.reduce(
            (accumulator, currentValue) => {
               return accumulator + currentValue;
            },
            0
         );
         const rewritePay = credit.paymentDecimal - payValuesReduce;
         bookPurchaseMapObject[lastKey].pay = Math.ceil(rewritePay);

         // grouping all pay
         const payArray = [];
         for (const key in bookPurchaseMapObject) {
            if (bookPurchaseMapObject.hasOwnProperty(key)) {
               const payValue = Math.ceil(bookPurchaseMapObject[key].pay);
               payArray.push(payValue);
            }
         }

         let setTermAmount = new Set();
         for (const pay of payArray) {
            setTermAmount.add(pay);
         }
         const termAmount = Array.from(setTermAmount);
         // select date using get from map and convert javascript object to map object
         const termMap = new Map(Object.entries(bookPurchaseMapObject));
         const keyToRetrieve = '2023-12-12';
         const selectedData = termMap.get(keyToRetrieve);

         console.log(selectedData);

         // console.log(selectedData);
         // console.log(termMap);
         // console.log(bookPurchaseMapObject);

         res.json({
            // purchased: newBook,
            list_term_amount: termAmount,
            list_terms: bookPurchaseMapObject,
            selectedData,
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
