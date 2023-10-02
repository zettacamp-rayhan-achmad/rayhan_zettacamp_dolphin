const bookShelves = require('../model/book-shelves');
const purchaseBook = require('./../model/books');
const { bookLoader, bookShelfLoader } = require('./dataloader');
const { AuthenticationError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');

const secretKey = 'rahasia';

module.exports = {
   Query: {
      getAllBook: async (_, __, context) => {
         if (!context.user) {
            throw new AuthenticationError('you must log in to access the data');
         }
         const book = await purchaseBook.find();
         return book;
      },
      getBook: async (_, args, context) => {
         if (!context.user) {
            throw new AuthenticationError('you must log in to access the data');
         }
         const book = await purchaseBook.findById(args._id);
         return book;
      },
      // Using DataLoader
      getBookShelves: async (_, { id }, context) => {
         if (!context.user) {
            throw new AuthenticationError(
               'you must log in to access the bookshelf'
            );
         }
         return bookShelfLoader.load(id);
      },
      getAllBookShelf: async (_, __, context) => {
         if (!context.user) {
            throw new AuthenticationError(
               'you must log in to access the bookshelf'
            );
         }
         const allBookShelf = await bookShelves.find({}, '_id');
         return bookShelfLoader.loadMany(
            allBookShelf.map((bookshelf) => bookshelf._id)
         );
      },
   },
   Mutation: {
      login: () => {
         const token = jwt.sign({}, secretKey, { expiresIn: '1h' });
         return token;
      },

      createPurchase: async (_, args, context) => {
         if (!context.user) {
            throw new AuthenticationError('you must log in to access the data');
         }
         const book = await purchaseBook.create(args);
         return book;
      },
      createManyPurchase: async (_, { books }, context) => {
         if (!context.user) {
            throw new AuthenticationError('you must log in to access the data');
         }
         const book = await purchaseBook.insertMany(books);
         return book;
      },
      updatePurchase: async (_, args, context) => {
         if (!context.user) {
            throw new AuthenticationError('you must log in to access the data');
         }
         const book = await purchaseBook.findByIdAndUpdate(args._id, args, {
            new: true,
         });
         return book;
      },
      deletePurchase: async (_, args, context) => {
         if (!context.user) {
            throw new AuthenticationError('you must log in to access the data');
         }
         const book = await purchaseBook.findByIdAndDelete(args._id);
         if (book) return true;
         else return false;
      },
      deleteAll: async (_, __, context) => {
         if (!context.user) {
            throw new AuthenticationError('you must log in to access the data');
         }
         const book = await purchaseBook.deleteMany({});
         if (book) return true;
         else return false;
      },
      createBookshelf: async (_, args, context) => {
         if (!context.user) {
            throw new AuthenticationError('you must log in to access the data');
         }
         const bookshelf = await bookShelves.create(args);
         return bookshelf;
      },
   },
};
