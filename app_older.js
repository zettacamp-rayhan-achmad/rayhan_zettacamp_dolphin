const express = require('express');
// const basicAuth = require('express-basic-auth');
const checkAuth = require('./auth');
const app = express();
app.use(express.json());
app.use(checkAuth);

const {
   displayBookDetail,
   displayBookPurchased,
   determineCreditTerms,
   purchaseBooks,
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

      const newBook = purchaseBooks(
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
         res.status(200).json({
            purchased: newBook,
            credit: credit,
         });
      } else {
         res.status(200).json({
            message: `nothing terms, additional price terms at month failed`,
         });
      }
   } catch (err) {
      res.status(400).json({
         message: err,
         status: 'failed request',
      });
      console.log(err);
   }
});

app.get('/getBooks', async (req, res) => {
   try {
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
      const { title, author, price } = bookDetail;
      const books = bookDetail[1];
      const discount = 10;
      const tax = 5;
      const amountStock = 5;
      const purchasedBook = 2;
      const terms = 2;

      const getResult = await purchaseBooks(
         books,
         discount,
         tax,
         amountStock,
         purchasedBook,
         terms
      );

      res.status(200).json({
         result: getResult,
      });
   } catch (err) {
      res.status(400).json({
         status: 'failed request',
         message: err,
      });
   }
});

const port = 3000;
app.listen(port, () => {
   console.log(`App running on port ${port}..!`);
});
