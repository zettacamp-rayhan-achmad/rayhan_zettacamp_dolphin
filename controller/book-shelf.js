const bookShelves = require('../model/book-shelves');
const book = require('../model/books');

exports.createBookShelves = async (req, res) => {
   try {
      const name = req.body.name;
      const bookId = req.body.bookId;

      const newBookShelves = await bookShelves.create({
         name: name,
         books: bookId,
      });
      res.status(201).json({
         status: 'create success',
         data: {
            new_book_shelves: newBookShelves,
         },
      });
   } catch (err) {
      res.status(400).json({
         status: 'error',
         message: err,
      });
   }
};
exports.addBookShelves = async (req, res) => {
   try {
      const bookShelvesId = req.body.bookShelvesId;
      const bookId = req.body.bookId;

      await bookShelves
         .findByIdAndUpdate(bookShelvesId, { $addToSet: { books: bookId } }, { new: true })
         .populate('books')
         .exec()
         .then((addBookShelves) => {
            res.status(201).json({
               status: 'add success',
               data: {
                  new_book_shelves: addBookShelves,
               },
            });
         })
         .catch(() => {
            res.status(400).json({
               status: 'error',
            });
         });
   } catch (err) {
      res.status(400).json({
         status: 'error',
         message: err,
      });
   }
};
exports.getBookShelves = async (req, res) => {
   try {
      const bookShelvesData = await bookShelves.find().populate('books');
      res.status(200).json({
         status: 'success',
         requestAt: req.requestTime,
         data: {
            book_shelves: bookShelvesData,
         },
      });
   } catch (err) {
      res.status(400).json({
         status: 'failed request',
         message: err,
      });
   }
};
exports.getBookShelvesById = async (req, res) => {
   try {
      const bookId = req.body.bookId;
      const bookShelvesData = await bookShelves.find({ books: bookId }).populate('books');
      res.status(200).json({
         status: 'success',
         requestAt: req.requestTime,
         data: {
            book_shelves: bookShelvesData,
         },
      });
   } catch (err) {
      res.status(400).json({
         status: 'failed request',
         message: err,
      });
   }
};
exports.updateBookShelvesById = async (req, res) => {
   try {
      const shelvesUpdate = await bookShelves.findByIdAndUpdate(req.params.id, req.body, {
         new: true,
         runValidators: true,
      });
      res.status(200).json({
         status: 'update success',
         book_shelves: shelvesUpdate,
      });
   } catch (err) {
      res.status(404).json({
         status: 'error, invalid object or ID',
         message: err,
      });
   }
};
exports.deleteBookShelvesById = async (req, res) => {
   try {
      const deletedShelves = await bookShelves.findByIdAndDelete(req.params.id);
      if (!deletedShelves) {
         res.status(404).json({
            status: 'error',
            message: 'shelves not found',
         });
      } else {
         res.status(200).json({
            status: 'delete success',
         });
      }
   } catch (err) {
      res.status(500).json({
         status: 'error',
         message: err.message,
      });
   }
};

// TASK elemMatch
exports.getBasedId = async (req, res) => {
   try {
      const bookId = req.body.bookId;
      const bookShelvesData = await bookShelves
         .find({
            books: {
               $elemMatch: {
                  $eq: bookId,
               },
            },
         })
         .populate('books');
      res.status(200).json({
         status: 'success',
         requestAt: req.requestTime,
         data: {
            book_shelves: bookShelvesData,
         },
      });
   } catch (err) {
      res.status(400).json({
         status: 'failed request',
         message: err,
      });
   }
};
exports.updateBookArrayFilter = async (req, res) => {
   try {
      const shelfId = req.body.shelfId;
      const bookId = req.body.bookId;
      const newId = req.body.newId;
      const shelvesUpdate = await bookShelves.updateOne(
         { _id: shelfId },
         {
            $set: {
               'books.$[elem]': newId,
            },
         },
         {
            arrayFilters: [{ elem: { $eq: bookId } }],
         }
      );
      res.status(200).json({
         status: 'update success',
         book_shelves: shelvesUpdate,
      });
   } catch (err) {
      res.status(404).json({
         status: 'error, invalid object or ID',
         message: err,
      });
   }
};
exports.getDistinctGenre = async (req, res) => {
   try {
      const bookShelvesData = await book.distinct('genre');
      res.status(200).json({
         status: 'success',
         data: {
            genre: bookShelvesData,
         },
      });
   } catch (err) {
      res.status(400).json({
         status: 'failed request',
         message: err,
      });
   }
};

// Task Aggregate
exports.aggregate = async (req, res) => {
   try {
      const books = await book.aggregate([
         {
            $project: {
               _id: 0,
               books: 1,
               genre: 1,
               purchasedBook: 1,
            },
         },
         {
            $addFields: {
               payment_without_discount: {
                  $multiply: ['$books.price', '$purchasedBook'],
               },
            },
         },
      ]);
      res.status(200).json({
         status: 'success',
         requestAt: req.requestTime,
         data: {
            purchase: books,
         },
      });
   } catch (err) {
      res.status(400).json({
         status: 'failed request',
         message: err,
      });
   }
};
exports.unwind = async (req, res) => {
   try {
      const books = await bookShelves.aggregate([
         {
            $unwind: '$books',
         },
         {
            $lookup: {
               from: 'books',
               localField: 'books',
               foreignField: '_id',
               as: 'book_detail',
            },
         },
         {
            $project: {
               _id: 1,
               books: 1,
               name: 1,
               book_detail: 1,
            },
         },
      ]);
      res.status(200).json({
         status: 'success',
         requestAt: req.requestTime,
         data: {
            purchase: books,
         },
      });
   } catch (err) {
      res.status(400).json({
         status: 'failed request',
         message: err,
      });
   }
};

// task aggregate advance
exports.aggregation = async (req, res) => {
   try {
      const getGenre = req.body.genre;
      const concatGenre = req.body.concatGenre;
      const books = await book.aggregate([
         { $addFields: { addGenre: concatGenre } },
         {
            $project: {
               _id: 0,
               books: 1,
               genre: 1,
               fullGenre: {
                  $concat: ['$genre', ', ', '$addGenre'],
               },
               addGenre: 1,
            },
         },
         { $match: { genre: getGenre } },
         { $sort: { 'books.price': -1 } },
      ]);
      res.status(200).json({
         status: 'success',
         requestAt: req.requestTime,
         data: {
            purchase: books,
         },
      });
   } catch (err) {
      console.log(err);
      res.status(400).json({
         status: 'failed request',
         message: err,
      });
   }
};
exports.lookup = async (req, res) => {
   try {
      const books = await bookShelves.aggregate([
         {
            $lookup: {
               from: 'books',
               localField: 'books',
               foreignField: '_id',
               as: 'book_detail',
            },
         },
         {
            $project: {
               books: 1,
               name: 1,
               book_detail: 1,
            },
         },
      ]);
      res.status(200).json({
         status: 'success',
         requestAt: req.requestTime,
         data: {
            purchase: books,
         },
      });
   } catch (err) {
      res.status(400).json({
         status: 'failed request',
         message: err,
      });
   }
};

// task mongoDB day 7
exports.allpage = async (req, res) => {
   try {
      const books = await book.aggregate([
         {
            $facet: {
               page1: [
                  {
                     $project: {
                        _id: 0,
                        books: 1,
                        genre: 1,
                        purchasedBook: 1,
                     },
                  },
                  {
                     $limit: 3,
                  },
               ],
               page2: [
                  { $skip: 3 },
                  {
                     $project: {
                        _id: 0,
                        books: 1,
                        genre: 1,
                        purchasedBook: 1,
                     },
                  },
                  {
                     $limit: 3,
                  },
               ],
            },
         },
      ]);
      res.status(200).json({
         status: 'success',
         requestAt: req.requestTime,
         data: {
            purchase: books,
         },
      });
   } catch (err) {
      res.status(400).json({
         status: 'failed request',
         message: err,
      });
   }
};
exports.pagination = async (req, res) => {
   try {
      const amountDocument = req.body.amountDocument;
      const pageNumber = req.body.pageNumber;
      const skipAmount = (pageNumber - 1) * amountDocument;
      const books = await book.aggregate([
         {
            $project: {
               _id: 0,
               books: 1,
               genre: 1,
               purchasedBook: 1,
            },
         },
         { $skip: skipAmount },
         { $limit: amountDocument },
         {
            $group: {
               _id: '$books.title',
               author: { $first: '$books.author' },
               genre: { $first: '$genre' },
            },
         },
      ]);
      res.status(200).json({
         status: 'success',
         requestAt: req.requestTime,
         data: {
            purchase: books,
         },
      });
   } catch (err) {
      res.status(400).json({
         status: 'failed request',
         message: err,
      });
   }
};
exports.paginationAll = async (req, res) => {
   try {
      const amountDocument = req.body.amountDocument;
      const pageNumber = req.body.pageNumber;
      const skipAmount = (pageNumber - 1) * amountDocument;
      const books = await book.aggregate([
         {
            $facet: {
               books: [
                  { $skip: skipAmount },
                  { $limit: amountDocument },
                  {
                     $group: {
                        _id: '$_id',
                        title: { $first: '$books.title' },
                        author: { $first: '$books.author' },
                        genre: { $first: '$genre' },
                        price: { $first: '$books.price' },
                     },
                  },
                  {
                     $project: {
                        _id: 0,
                        title: 1,
                        books: 1,
                        author: 1,
                        genre: 1,
                        price: 1,
                     },
                  },
               ],
               totalPrice: [
                  { $skip: skipAmount },
                  { $limit: amountDocument },
                  {
                     $group: {
                        _id: null,
                        price: { $sum: '$books.price' },
                     },
                  },
                  {
                     $project: {
                        _id: 0,
                        price: 1,
                     },
                  },
               ],
            },
         },
         {
            $addFields: {
               page: pageNumber,
            },
         },
      ]);
      res.status(200).json({
         status: 'success',
         requestAt: req.requestTime,
         data: {
            purchase: books,
         },
      });
   } catch (err) {
      res.status(400).json({
         status: 'failed request',
         message: err,
      });
   }
};
