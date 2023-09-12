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
         res.json({
            purchased: newBook,
            credit: credit,
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
