const { gql } = require('apollo-server-express');

const typeDefs = gql`
   type BookPurchase {
      _id: ID!
      title: String!
      author: Author
      price: Int!
      genre: String!
      isUsed: Boolean!
   }
   type Author {
      _id: ID
      firstname: String!
      lastname: String!
   }

   type BookShelves {
      _id: ID!
      name: String!
      books: [BookPurchase]
   }

   type Query {
      getAllBook: [BookPurchase]!
      getBook(_id: ID!): BookPurchase!
      getBookShelves(id: ID!): BookShelves!
      getAllBookShelf: [BookShelves]!
   }

   input BookInput {
      title: String!
      author: ID
      price: Int!
      genre: String!
      isUsed: Boolean!
   }
   type Mutation {
      login: String

      createPurchase(
         title: String!
         author: ID!
         price: Int!
         genre: String!
         isUsed: Boolean!
      ): BookPurchase!
      createAuthor(firstname: String, lastname: String): Author
      createManyPurchase(books: [BookInput]): [BookPurchase]!

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

      createBookshelf(name: String!, books: [ID]): BookShelves!
   }
`;

module.exports = typeDefs;
