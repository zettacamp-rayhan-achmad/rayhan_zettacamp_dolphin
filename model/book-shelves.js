const mongoose = require('mongoose');

const bookShelvesSchema = new mongoose.Schema({
   name: {
      type: String,
   },
   books: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'book',
      },
   ],
});

const bookShelves = mongoose.model('bookShelves', bookShelvesSchema);
module.exports = bookShelves;
