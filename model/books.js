const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
   title: {
      type: String,
      required: true,
   },
   author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'author',
   },
   price: {
      type: Number,
      required: true,
   },
   genre: {
      type: String,
      required: true,
   },
   is_used: {
      type: Boolean,
      default: true,
   },
});

const PurchaseBook = mongoose.model('book', bookSchema);

module.exports = PurchaseBook;
