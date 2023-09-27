const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
   books: {
      type: Object,
      required: ['title', 'author', 'price'],
      properties: {
         title: {
            type: String,
            required: true,
         },
         author: {
            type: String,
            required: true,
         },
         price: {
            type: Number,
            required: true,
         },
      },
   },
   genre: {
      type: String,
      required: true,
   },
   discount: {
      type: Number,
   },
   priceAfterDiscount: {
      type: Number,
   },
   taxAmount: {
      type: Number,
   },
   priceAfterTax: {
      type: Number,
   },
   purchasedBook: {
      type: Number,
   },
   terms: {
      type: Number,
   },
   availableStock: {
      type: Number,
   },
   totalPrice: {
      type: Number,
   },
   isUsed: {
      type: Boolean,
      default: true,
   },
});

const PurchaseBook = mongoose.model('book', bookSchema);

module.exports = PurchaseBook;
