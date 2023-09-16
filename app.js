const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/';
const database = 'testdatabase';
const profile = require('./user.model');

mongoose
   .connect(`${url}${database}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
   .then(() => {
      console.log('success! connected to mongoDB');
   })
   .catch((error) => {
      console.error('error connecting to mongoDB', error);
   });
