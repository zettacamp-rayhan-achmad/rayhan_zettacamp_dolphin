const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
   firstname: {
      type: String,
      required: true,
   },
   lastname: {
      type: String,
      required: true,
   },
});

const author = mongoose.model('author', authorSchema);
module.exports = author;
