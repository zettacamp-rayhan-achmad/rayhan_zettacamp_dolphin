const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   age: {
      type: Number,
      required: true,
   },
   email: {
      type: String,
      required: true,
      unique: true,
   },
   address: {
      type: Object,
      required: ['street', 'city', 'state'],
      properties: {
         street: {
            type: String,
            required: true,
         },
         city: {
            type: String,
            required: true,
         },
         state: {
            type: String,
            required: true,
         },
      },
   },
   hobbies: {
      type: Array,
      items: {
         type: String,
      },
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
});
module.exports = mongoose.model('User', userSchema);
