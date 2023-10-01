const bookShelves = require('../model/book-shelves');
const purchaseBook = require('./../model/books');
const { bookLoader, bookShelfLoader } = require('./dataloader');

module.exports = {
   Query: {
      getAllBook: async () => await purchaseBook.find(),
      getBook: async (_, args) => await purchaseBook.findById(args._id),
      // Using DataLoader
      getBookShelves: async (_, { id }) => {
         return bookShelfLoader.load(id);
      },
      getAllBookShelf: async () => {
         const allBookShelf = await bookShelves.find({}, '_id');
         return bookShelfLoader.loadMany(
            allBookShelf.map((bookshelf) => bookshelf._id)
         );
      },
   },
   Mutation: {
      createPurchase: async (_, args) => {
         const book = await purchaseBook.create(args);
         return book;
      },
      createManyPurchase: async (_, { books }) => {
         const book = await purchaseBook.insertMany(books);
         return book;
      },
      updatePurchase: async (_, args) => {
         const book = await purchaseBook.findByIdAndUpdate(args._id, args, {
            new: true,
         });
         return book;
      },
      deletePurchase: async (_, args) => {
         const book = await purchaseBook.findByIdAndDelete(args._id);
         if (book) return true;
         else return false;
      },
      deleteAll: async () => {
         const book = await purchaseBook.deleteMany({});
         if (book) return true;
         else return false;
      },
      createBookshelf: async (_, args) => {
         const bookshelf = await bookShelves.create(args);
         return bookshelf;
      },
   },
};
