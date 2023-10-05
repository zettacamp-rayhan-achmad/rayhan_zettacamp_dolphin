const bookShelves = require('../model/book-shelves');
const purchaseBook = require('./../model/books');
const author = require('./../model/author');
const { bookShelfLoader, authorLoader } = require('./dataloader');
const { AuthenticationError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');

const secretKey = 'rahasia';

module.exports = {
   Query: {
      getAllBookPurchase: async (_, __, context) => {
         console.log(context);
         if (!context.user) {
            throw new AuthenticationError('Unauthenticated user');
         }
         const books = await purchaseBook.find();
         if (books.length === 0) {
            throw new Error('no books purchases');
         }
         return books;
      },
      getOneBookPurchase: async (_, args, context) => {
         if (!context.user) {
            throw new AuthenticationError('Unauthenticated user');
         }
         const book = await purchaseBook.findById(args._id);
         if (!book) {
            throw new Error('book not found');
         }
         return book;
      },
      // Using DataLoader
      getOneBookShelves: async (_, { id }, context) => {
         if (!context.user) {
            throw new AuthenticationError('you must log in to access the bookshelf');
         }
         return bookShelfLoader.load(id);
      },
      getAllBookShelves: async (_, __, context) => {
         if (!context.user) {
            throw new AuthenticationError('you must log in to access the bookshelf');
         }
         const allBookShelf = await bookShelves.find({}, '_id');
         if (!allBookShelf) {
            throw new Error('empty book shelves');
         }
         return bookShelfLoader.loadMany(allBookShelf.map((bookshelf) => bookshelf._id));
      },
      getAllAuthor: async (_, __, context) => {
         if (!context.user) {
            throw new AuthenticationError('Unauthenticated user');
         }
         const authors = await author.find();
         return authors;
      },
   },
   Mutation: {
      login: () => {
         const token = jwt.sign({}, secretKey, { expiresIn: '1h' });
         return token;
      },
      createAuthor: async (_, args, context) => {
         if (!context.user) {
            throw new AuthenticationError('Unauthenticated user');
         }
         const authors = await author.create(args);
         return authors;
      },
      createOnePurchase: async (_, args, context) => {
         if (!context.user) {
            throw new AuthenticationError('Unauthenticated user');
         }
         const createOneBook = await purchaseBook.create(args);
         if (!createOneBook) {
            throw new Error('create error');
         }
         return createOneBook;
      },
      createManyPurchase: async (_, { books }, context) => {
         if (!context.user) {
            throw new AuthenticationError('Unauthenticated user');
         }
         const insertBook = await purchaseBook.insertMany(books);
         if (!insertBook) {
            throw new Error('create error');
         }
         return insertBook;
      },
      updatePurchase: async (_, args, context) => {
         if (!context.user) {
            throw new AuthenticationError('Unauthenticated user');
         }
         const updateBook = await purchaseBook.findByIdAndUpdate(args._id, args, {
            new: true,
         });
         if (!updateBook) {
            throw new Error('book not found');
         }
         return updateBook;
      },
      deleteOnePurchase: async (_, args, context) => {
         if (!context.user) {
            throw new AuthenticationError('Unauthenticated user');
         }

         const book = await purchaseBook.findByIdAndDelete(args._id);
         if (book) return true;
         else return false;
      },
      deleteAllPurchase: async (_, __, context) => {
         if (!context.user) {
            throw new AuthenticationError('Unauthenticated user');
         }
         const book = await purchaseBook.deleteMany({});
         if (book) return true;
      },
      deleteAuthor: async (_, __, context) => {
         if (!context.user) {
            throw new AuthenticationError('Unauthenticated user');
         }
         const authors = await author.deleteMany({});
         if (authors) return true;
      },
      createBookShelves: async (_, args, context) => {
         if (!context.user) {
            throw new AuthenticationError('Unauthenticated user');
         }
         const createBookshelf = await bookShelves.create(args);
         if (!createBookshelf) {
            throw new Error('create failed');
         }
         return createBookshelf;
      },
      updateBookShelves: async (_, args, context) => {
         if (!context.user) {
            throw new AuthenticationError('Unauthenticated user');
         }
         const updateBookShelves = await bookShelves.findByIdAndUpdate(args._id, args, {
            new: true,
         });
         if (!updateBookShelves) {
            throw new Error('book not found');
         }
         return updateBookShelves;
      },
   },
   BookPurchase: {
      author: async (parent, __, context) => {
         if (!context.user) {
            throw new AuthenticationError('you must log in to access the bookshelf');
         }
         return authorLoader.load(parent.author);
      },
   },
};
