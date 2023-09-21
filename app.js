const express = require('express');
const mongoose = require('mongoose');
// const checkAuth = require('./auth');
const app = express();
app.use(express.json());
const fs = require('fs');
const {
   aggregate,
   unwind,
   createBookShelves,
   addBookShelves,
   getBookShelvesById,
   getBookShelves,
   updateBookShelvesById,
   deleteBookShelvesById,
   getBasedId,
   updateBook,
   updateBookArrayFilter,
   getDistinctGenre,
} = require('./controller/book-shelf');
const {
   purchaseBookWithTerms,
   getPurchase,
   getPurhcaseBookById,
   createPurchase,
   updatePurchase,
   deletePurchaseById,
   deleteAllPurchase,
} = require('./controller/purchase-book');
// app.use(checkAuth);
const url = 'mongodb://localhost:27017/';
const database = 'purchaseBooks';

// ***** BOOK PURCHASE *****
app.post('/purchaseBookWithTerms', purchaseBookWithTerms);
app.get('/getPurchase', getPurchase);
app.get('/getPurchaseBookBy/:id', getPurhcaseBookById);
app.post('/createPurchase', createPurchase);
app.patch('/updatePurchase/:id', updatePurchase);
app.delete('/deletePurchase/:id', deletePurchaseById);
app.delete('/deleteAllPurchase', deleteAllPurchase);

// ****** BOOK SHELVES ******
app.post('/create-book-shelves', createBookShelves);
app.post('/add-book-shelves', addBookShelves);
app.get('/get-bookshelves', getBookShelves);
app.get('/get-bookshelves-id', getBookShelvesById);
app.patch('/update-book-shelves/:id', updateBookShelvesById);
app.delete('/delete-bookshelves-by/:id', deleteBookShelvesById);

// elemMatch
app.get('/get-based-id', getBasedId);
app.patch('/update-book-array-filter', updateBookArrayFilter);
app.get('/get-distinct-genre', getDistinctGenre);

// aggregate
app.get('/aggregate', aggregate);
app.get('/unwind', unwind);

// ##### database connect #####
mongoose
   .connect(`${url}${database}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
   .then(() => {
      console.log('success! connected to mongoDB');
   })
   .catch((error) => {
      console.error('error connecting to mongoDB', error);
   });

const port = 3000;
app.listen(port, () => {
   console.log(`App running on port ${port}..!`);
});
