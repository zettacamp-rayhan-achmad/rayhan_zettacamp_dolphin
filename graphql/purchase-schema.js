const { gql } = require('apollo-server-express');

const typeDefs = gql`
   type Books {
      title: String!
      author: String!
      price: Int!
   }
   type BookPurchase {
      _id: ID!
      books: Books
      genre: String!
      discount: Int!
      priceAfterDiscount: Int!
      taxAmount: Int!
      priceAfterTax: Int!
      purchasedBook: Int!
      availableStock: Int!
      terms: Int!
      totalPrice: Int!
      isUsed: Boolean!
   }
   type Query {
      getAllBook: [BookPurchase]!
   }
`;

module.exports = typeDefs;
