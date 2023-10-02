const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/typedef');
const resolvers = require('./graphql/resolvers');
const jwt = require('jsonwebtoken');

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
   aggregation,
   lookup,
   pagination,
   allpage,
   paginationAll,
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
app.get('/aggregation', aggregation);
app.get('/lookup', lookup);

// pagination
app.get('/allpage', allpage);
app.get('/pagination', pagination);
app.get('/paginationAll', paginationAll);

// ##### database connect #####
const url = 'mongodb://127.0.0.1:27017/';
const database = 'purchaseBooks';
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

const secretKey = 'rahasia';

const server = new ApolloServer({
   typeDefs,
   resolvers,
   context: ({ req }) => {
      try {
         const token = req.headers.authorization || '';
         const user = jwt.verify(token.replace('Bearer ', ''), secretKey);
         return { user };
      } catch (error) {
         return 'ada error token', error;
      }
   },
});
server.applyMiddleware({ app });
const port = 3000;
app.listen(port, () => {
   console.log(`graphQL running at http://localhost:${port}/graphql`);
});
