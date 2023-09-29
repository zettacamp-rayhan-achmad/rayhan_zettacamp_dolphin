const purchaseBook = require('./../model/books');

module.exports = {
   Query: {
      getAllBook: async () => await purchaseBook.find(),
      getBook: async (_, args) => await purchaseBook.findById(args._id),
   },
   Mutation: {
      createPurchase: async (_, args) => {
         const book = new purchaseBook(args);
         await book.save();
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
   },
};
