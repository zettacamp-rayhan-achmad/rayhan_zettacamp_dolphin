// const mongoose = require('mongoose');

// const bookSchema = new mongoose.Schema({
//    title: {
//       type: String,
//       required: true,
//    },
//    author: {
//       type: String,
//       required: true,
//    },
//    price: {
//       type: Number,
//       required: true,
//    },
//    publisher: {
//       type: Object,
//       required: ['street', 'city', 'state'],
//       properties: {
//          street: {
//             type: String,
//             required: true,
//          },
//          city: {
//             type: String,
//             required: true,
//          },
//          state: {
//             type: String,
//             required: true,
//          },
//       },
//    },
//    hobbies: {
//       type: Array,
//       items: {
//          type: String,
//       },
//    },
//    createdAt: {
//       type: Date,
//       default: Date.now,
//    },
// });
// module.exports = mongoose.model('User', userSchema);
