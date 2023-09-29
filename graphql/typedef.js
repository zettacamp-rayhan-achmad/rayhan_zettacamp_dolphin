const { gql } = require('apollo-server-express');

const typeDefs = gql`
   type BookPurchase {
      _id: ID!
      title: String!
      author: String!
      price: Int!
      genre: String!
      isUsed: Boolean!
   }
   type Query {
      getAllBook: [BookPurchase]!
      getBook(_id: ID!): BookPurchase!
   }
   type Mutation {
      createPurchase(
         title: String!
         author: String!
         price: Int!
         genre: String!
         isUsed: Boolean!
      ): BookPurchase!

      updatePurchase(
         _id: ID!
         title: String
         author: String
         price: Int
         genre: String
         isUsed: Boolean
      ): BookPurchase!

      deletePurchase(_id: ID!): Boolean!
      deleteAll: Boolean!
   }
`;

module.exports = typeDefs;
