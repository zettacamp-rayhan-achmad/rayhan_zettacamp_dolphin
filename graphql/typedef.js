const { gql } = require('apollo-server-express');

const typeDefs = gql`
   type BookPurchase {
      _id: ID!
      title: String!
      author: Author
      price: Int!
      genre: String!
      is_used: Boolean!
   }
   type Author {
      _id: ID!
      first_name: String!
      last_name: String!
   }

   type BookShelves {
      _id: ID!
      name: String!
      books: [BookPurchase]
   }

   type Query {
      getAllBookPurchase: [BookPurchase]!
      getOneBookPurchase(_id: ID!): BookPurchase!
      getAllBookShelves: [BookShelves]!
      getOneBookShelves(id: ID!): BookShelves!
      getAllAuthor: [Author]!
   }

   input BookInput {
      title: String!
      author: ID
      price: Int!
      genre: String!
      is_used: Boolean!
   }
   type Mutation {
      login: String

      createOnePurchase(title: String!, author: ID!, price: Int!, genre: String!, is_used: Boolean!): BookPurchase!
      createManyPurchase(books: [BookInput]): [BookPurchase]!
      createAuthor(first_name: String, last_name: String): Author

      updatePurchase(_id: ID!, title: String, author: String, price: Int, genre: String, is_used: Boolean): BookPurchase!

      deleteOnePurchase(_id: ID!): Boolean!
      deleteAllPurchase: Boolean!
      deleteAuthor: Boolean!

      createBookShelves(name: String!, books: [ID]): BookShelves!
      updateBookShelves(_id: ID!, name: String): BookShelves!
   }
`;

module.exports = typeDefs;
