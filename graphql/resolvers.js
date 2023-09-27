const { getPurchase } = require('./../controller/purchase-book');

module.exports = {
   Query: {
      getAllBook: async () => await getPurchase(),
   },
};
