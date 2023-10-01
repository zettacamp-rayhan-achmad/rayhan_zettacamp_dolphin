const DataLoader = require('dataloader');
const PurchaseBook = require('./../model/books');
const bookShelves = require('./../model/book-shelves');

const batchLoadBook = async (keys) => {
   const bookPurchase = await PurchaseBook.find({ _id: { $in: keys } });
   const bookMap = {};
   bookPurchase.forEach((book) => {
      bookMap[book._id.toString()] = book;
   });
   return keys.map((key) => bookMap[key.toString()]);
};

const batchLoadBookshelf = async (keys) => {
   const documents = await bookShelves
      .find({ _id: { $in: keys } })
      .populate('books');
   const documentMap = {};
   documents.forEach((doc) => {
      documentMap[doc._id.toString()] = doc;
   });
   return keys.map((key) => documentMap[key.toString()]);
};

const bookLoader = new DataLoader(batchLoadBook);
const bookShelfLoader = new DataLoader(batchLoadBookshelf);

module.exports = { bookLoader, bookShelfLoader };
