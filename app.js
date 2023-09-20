const express = require('express');
const mongoose = require('mongoose');
// const checkAuth = require('./auth');
const app = express();
app.use(express.json());
const fs = require('fs');
// app.use(checkAuth);
const url = 'mongodb://localhost:27017/';
const database = 'purchaseBooks';
const PurchaseBook = require('./model/books');
const bookShelves = require('./model/book-shelves');

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
         terms
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

         res.json({
            purchased: newBook,
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

// get all purchase book
app.get('/getPurchase', async (req, res) => {
   try {
      const books = await PurchaseBook.find();
      res.status(200).json({
         status: 'success',
         requestAt: req.requestTime,
         data: {
            purchase: books,
         },
      });
   } catch (err) {
      res.status(400).json({
         status: 'failed request',
         message: err,
      });
   }
});

// get purchase by ID
app.get('/getPurchaseBookBy/:id', async (req, res) => {
   try {
      const book = await PurchaseBook.findById(req.params.id);
      res.status(200).json({
         status: 'success',
         requestAt: req.requestTime,
         data: {
            purchase: book,
         },
      });
   } catch (err) {
      res.status(400).json({
         status: 'failed request',
         message: err,
      });
   }
});

app.post('/createPurchase', async (req, res) => {
   try {
      const books = req.body.books;
      const discount = req.body.discount;
      const tax = req.body.tax;
      const amountStock = req.body.amountStock;
      const purchasedBook = req.body.purchasedBook;
      const terms = req.body.terms;
      const genre = req.body.genre;

      const newBook = await purchaseBooks(
         books,
         discount,
         tax,
         amountStock,
         purchasedBook,
         terms
      );
      const newPurchase = await PurchaseBook.create({
         books: {
            title: books.title,
            author: books.author,
            price: books.price,
         },
         genre: genre,
         discount: discount,
         priceAfterDiscount: newBook.priceAfterDiscount,
         taxAmount: tax,
         priceAfterTax: newBook.priceAfterTax,
         purchasedBook: newBook.purchasedBook,
         terms: books.terms,
         availableStock: newBook.availableStock,
         totalPrice: newBook.totalPrice,
      });
      res.status(201).json({
         status: 'create success',
         data: {
            new_purchase: newPurchase,
            // new_book: newBook,
         },
      });
   } catch (err) {
      res.status(400).json({
         status: 'error',
         message: err,
      });
   }
});

// Update Purchase
app.patch('/updatePurchase/:id', async (req, res) => {
   try {
      const purchaseUpdate = await PurchaseBook.findByIdAndUpdate(
         req.params.id,
         req.body,
         {
            new: true,
            runValidators: true,
         }
      );
      res.status(200).json({
         status: 'update success',
         data: {
            purchaseUpdate,
         },
      });
   } catch (err) {
      res.status(404).json({
         status: 'error, invalid object or ID',
         message: err,
      });
   }
});

// delete puchase by ID
app.delete('/deletePurchase/:id', async (req, res) => {
   try {
      const deletedPurchase = await PurchaseBook.findByIdAndDelete(
         req.params.id
      );
      if (!deletedPurchase) {
         res.status(404).json({
            status: 'error',
            message: 'Purchase not found',
         });
      } else {
         res.status(204).json({
            status: 'delete success',
            data: null,
         });
      }
   } catch (err) {
      res.status(500).json({
         status: 'error',
         message: err.message,
      });
   }
});

// delete all purhcase
app.delete('/deleteAllPurchase', async (req, res) => {
   try {
      const result = await PurchaseBook.deleteMany({});
      if (result.deletedCount > 0) {
         res.status(200).json({
            message: 'delete success',
            data: null,
         });
      } else {
         res.status(200).json({
            message: 'no entries deleted',
            data: null,
         });
      }
   } catch (err) {
      res.status(500).json({
         status: 'error',
         message: err.message,
      });
   }
});

// ****** BOOK SHELVES ******
// create new book shelves
app.post('/create-book-shelves', async (req, res) => {
   try {
      const name = req.body.name;
      const bookID = req.body.bookID;

      const newBookShelves = await bookShelves.create({
         name: name,
         books: bookID,
      });
      res.status(201).json({
         status: 'create success',
         data: {
            new_book_shelves: newBookShelves,
         },
      });
   } catch (err) {
      res.status(400).json({
         status: 'error',
         message: err,
      });
   }
});

// add new book to book shelves
app.post('/add-book-shelves', async (req, res) => {
   try {
      const bookShelvesId = req.body.bookShelvesId;
      const bookID = req.body.bookID;

      const addBookShelves = await bookShelves
         .findByIdAndUpdate(
            bookShelvesId,
            { $addToSet: { books: bookID } },
            { new: true }
         )
         .populate('books')
         .exec()
         .then((addBookShelves) => {
            res.status(201).json({
               status: 'add success',
               data: {
                  new_book_shelves: addBookShelves,
               },
            });
         })
         .catch(() => {
            res.status(400).json({
               status: 'error',
            });
         });
   } catch (err) {
      res.status(400).json({
         status: 'error',
         message: err,
      });
   }
});

// get all bookshelves
app.get('/get-bookshelves', async (req, res) => {
   try {
      const bookShelvesData = await bookShelves.find().populate('books');
      res.status(200).json({
         status: 'success',
         requestAt: req.requestTime,
         data: {
            book_Shelves: bookShelvesData,
         },
      });
   } catch (err) {
      res.status(400).json({
         status: 'failed request',
         message: err,
      });
   }
});

// filter bookshelves by book id
app.get('/get-bookshelves-id', async (req, res) => {
   try {
      const bookId = req.body.bookId;
      const bookShelvesData = await bookShelves
         .find({ books: bookId })
         .populate('books');
      res.status(200).json({
         status: 'success',
         requestAt: req.requestTime,
         data: {
            book_Shelves: bookShelvesData,
         },
      });
   } catch (err) {
      res.status(400).json({
         status: 'failed request',
         message: err,
      });
   }
});

// update bookshelves
app.patch('/update-book-shelves/:id', async (req, res) => {
   try {
      const shelvesUpdate = await bookShelves.findByIdAndUpdate(
         req.params.id,
         req.body,
         {
            new: true,
            runValidators: true,
         }
      );
      res.status(200).json({
         status: 'update success',
         book_shelves: shelvesUpdate,
      });
   } catch (err) {
      res.status(404).json({
         status: 'error, invalid object or ID',
         message: err,
      });
   }
});

// delete bookshelves by id
app.delete('/delete-bookshelves-by/:id', async (req, res) => {
   try {
      const deletedShelves = await bookShelves.findByIdAndDelete(req.params.id);
      if (!deletedShelves) {
         res.status(404).json({
            status: 'error',
            message: 'shelves not found',
         });
      } else {
         res.status(200).json({
            status: 'delete success',
         });
      }
   } catch (err) {
      res.status(500).json({
         status: 'error',
         message: err.message,
      });
   }
});

// 1) price greater than ($elemMatch)
app.get('/get-based-id', async (req, res) => {
   try {
      const bookId = req.body.bookId;
      const bookShelvesData = await bookShelves
         .find({
            books: {
               $elemMatch: {
                  $eq: bookId,
               },
            },
         })
         .populate('books');
      res.status(200).json({
         status: 'success',
         requestAt: req.requestTime,
         data: {
            book_Shelves: bookShelvesData,
         },
      });
   } catch (err) {
      res.status(400).json({
         status: 'failed request',
         message: err,
      });
   }
});

// 2) arrayFilter. update bookshelves embedded array
app.patch('/update-book-detail', async (req, res) => {
   try {
      const shelfId = req.body.shelfId;
      const bookId = req.body.bookId;
      const newId = req.body.newId;
      const shelvesUpdate = await bookShelves.updateOne(
         { _id: shelfId },
         {
            $set: {
               'books.$[elem]': newId,
            },
         },
         {
            array: [{ elem: { $eq: bookId } }],
         }
      );
      res.status(200).json({
         status: 'update success',
         book_shelves: shelvesUpdate,
      });
   } catch (err) {
      res.status(404).json({
         status: 'error, invalid object or ID',
         message: err,
      });
   }
});

// 3) distinc genre
app.get('/get-distinct-genre', async (req, res) => {
   try {
      const bookShelvesData = await PurchaseBook.distinct('genre');
      res.status(200).json({
         status: 'success',
         data: {
            genre: bookShelvesData,
         },
      });
   } catch (err) {
      res.status(400).json({
         status: 'failed request',
         message: err,
      });
   }
});

// PERCOBAAN elemMatch
app.get('/get-based-price-percobaan', async (req, res) => {
   try {
      const bookId = req.body.bookId;
      const bookshelf = await bookShelves
         .find({
            name: 'fantasy',
         })
         .populate('books', {
            books: {
               $elemMatch: {
                  author: 'lord',
               },
            },
         });
      res.status(200).json({
         status: 'success',
         requestAt: req.requestTime,
         data: {
            book_Shelves: bookshelf,
         },
      });
   } catch (err) {
      res.status(400).json({
         status: 'failed request',
         message: err,
      });
   }
});

app.patch('/update-book-detail-percobaan', async (req, res) => {
   try {
      const shelfId = req.body.shelfId;
      const bookId = req.body.bookId;
      const newId = req.body.newId;
      const title = req.body.title;
      const shelvesUpdate = await bookShelves.updateOne(
         { _id: shelfId },
         {
            $set: {
               'books.$[elem]': newId,
            },
         },
         {
            arrayFilters: [{ elem: { $eq: bookId } }],
         }
      );
      res.status(200).json({
         status: 'update success',
         book_shelves: shelvesUpdate,
      });
   } catch (err) {
      res.status(404).json({
         status: 'error, invalid object or ID',
         message: err,
      });
   }
});

// database connect
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
