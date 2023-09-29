const PurchaseBook = require('../model/books');

const {
   determineCreditTerms,
   purchaseBooks,
   bookTitle,
   processObject,
   bookDetail,
} = require('./../task');

exports.purchaseBookWithTerms = async (req, res) => {
   try {
      // make new variable
      const books = req.body.books;
      const discount = req.body.discount;
      const tax = req.body.tax;
      const amountStock = req.body.amountStock;
      const purchasedBook = req.body.purchasedBook;
      const terms = req.body.terms;
      let additionalPriceTermAtMonth = req.body.additionalPriceTermAtMonth;
      const additionalPrice = req.body.additionalPrice;

      const newBook = await purchaseBooks(
         books,
         discount,
         tax,
         amountStock,
         purchasedBook,
         terms
      );

      additionalPriceTermAtMonth -= 1;

      const totalPrice = newBook.totalPrice;
      let credit = await determineCreditTerms(totalPrice, terms);

      if (
         terms > additionalPriceTermAtMonth &&
         additionalPriceTermAtMonth >= 0
      ) {
         credit.creditTerms[additionalPriceTermAtMonth].pay += additionalPrice;
         credit.totalPayment += additionalPrice;
         credit.payment[additionalPriceTermAtMonth] += additionalPrice;

         // create new map
         const bookPurchaseMap = new Map();
         credit.creditTerms.forEach((purchase) => {
            const { month, due, pay } = purchase;

            // Check if the date is already a key in the map
            if (bookPurchaseMap.has(due)) {
               const existingDetails = bookPurchaseMap.get(due);
               existingDetails.push({ month, pay });
               bookPurchaseMap.set(due, existingDetails);
            } else {
               bookPurchaseMap.set(due, { month, pay });
            }
         });
         console.log(bookPurchaseMap);
         // change map to object
         const bookPurchaseMapObject = {};
         for (const [key, value] of bookPurchaseMap) {
            bookPurchaseMapObject[key] = value;
         }
         // return all key from object
         const keysArray = Object.keys(bookPurchaseMapObject);
         const lastKey = keysArray[keysArray.length - 1];

         let totalPay = 0;
         // Iterasi through each element in object
         for (const key in bookPurchaseMapObject) {
            if (bookPurchaseMapObject.hasOwnProperty(key)) {
               totalPay += bookPurchaseMapObject[key].pay;
            }
         }

         // create number without decimal number
         const payValues = [];
         const listTerms = bookPurchaseMapObject;
         const termKeys = Object.keys(listTerms);

         for (let i = 0; i < termKeys.length - 1; i++) {
            const key = termKeys[i];
            const term = listTerms[key];
            payValues.push(term.pay);
         }
         const payValuesReduce = payValues.reduce(
            (accumulator, currentValue) => {
               return accumulator + currentValue;
            },
            0
         );
         const rewritePay = credit.paymentDecimal - payValuesReduce;
         bookPurchaseMapObject[lastKey].pay = Math.ceil(rewritePay);

         // grouping all pay
         const payArray = [];
         for (const key in bookPurchaseMapObject) {
            if (bookPurchaseMapObject.hasOwnProperty(key)) {
               const payValue = Math.ceil(bookPurchaseMapObject[key].pay);
               payArray.push(payValue);
            }
         }

         let setTermAmount = new Set();
         for (const pay of payArray) {
            setTermAmount.add(pay);
         }
         const termAmount = Array.from(setTermAmount);
         // select date using get from map and convert javascript object to map object
         const termMap = new Map(Object.entries(bookPurchaseMapObject));
         const keyToRetrieve = '2023-12-12';
         const selectedData = termMap.get(keyToRetrieve);

         console.log(selectedData);

         res.json({
            purchased: newBook,
            list_term_amount: termAmount,
            list_terms: bookPurchaseMapObject,
            selectedData,
         });
      } else {
         res.json({
            message: `nothing terms, additional price terms at month failed`,
         });
      }
   } catch (err) {
      res.json({
         message: err,
         status: 'failed request',
      });
      console.log(err);
   }
};
exports.getPurchase = async (req, res) => {
   try {
      const books = await PurchaseBook.find();
      res.status(200).json({
         books: books,
      });
   } catch (err) {
      console.log(err);
   }
};
exports.getPurhcaseBookById = async (req, res) => {
   try {
      const book = await PurchaseBook.findById(req.params.id);
      res.status(200).json({
         status: 'success',
         requestAt: req.requestTime,
         data: {
            purchase: book,
         },
      });
   } catch (err) {
      res.status(400).json({
         status: 'failed request',
         message: err,
      });
   }
};
exports.createPurchase = async (req, res) => {
   try {
      const title = req.body.title;
      const author = req.body.author;
      const price = req.body.price;
      const genre = req.body.genre;
      const isUsed = req.body.isUsed;
      const newPurchase = await PurchaseBook.create({
         title: title,
         author: author,
         price: price,
         genre: genre,
         isUsed: isUsed,
      });
      res.status(201).json({
         status: 'create success',
         data: {
            new_purchase: newPurchase,
         },
      });
   } catch (err) {
      res.status(400).json({
         status: 'error',
         message: err,
      });
   }
};
exports.updatePurchase = async (req, res) => {
   try {
      const purchaseUpdate = await PurchaseBook.findByIdAndUpdate(
         req.params.id,
         req.body,
         {
            new: true,
            runValidators: true,
         }
      );
      res.status(200).json({
         status: 'update success',
         data: {
            purchaseUpdate,
         },
      });
   } catch (err) {
      res.status(404).json({
         status: 'error, invalid object or ID',
         message: err,
      });
   }
};
exports.deletePurchaseById = async (req, res) => {
   try {
      const deletedPurchase = await PurchaseBook.findByIdAndDelete(
         req.params.id
      );
      if (!deletedPurchase) {
         res.status(404).json({
            status: 'error',
            message: 'Purchase not found',
         });
      } else {
         res.status(204).json({
            status: 'delete success',
            data: null,
         });
      }
   } catch (err) {
      res.status(500).json({
         status: 'error',
         message: err.message,
      });
   }
};
exports.deleteAllPurchase = async (req, res) => {
   try {
      const result = await PurchaseBook.deleteMany({});
      if (result.deletedCount > 0) {
         res.status(200).json({
            message: 'delete success',
            data: null,
         });
      } else {
         res.status(200).json({
            message: 'no entries deleted',
            data: null,
         });
      }
   } catch (err) {
      res.status(500).json({
         status: 'error',
         message: err.message,
      });
   }
};
