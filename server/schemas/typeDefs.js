// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`

  type Book {
    _id: ID
    authors:[String]
    description: String
    bookId: String
    image: String
    link: String
    title:String
  }


  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  type Query {
    getSingleUser: User
   
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    createUser(username: String!, email: String!, password: String!): Auth
    saveBook(userId: ID!,bookId:ID!,authors:[String!]!,title:String!, image:String!): Book
    deleteBook(userId: ID!,bookId:ID!,authors:[String!]!,title:String!, image:String!): Book
   
  }

  type Auth {
    token: ID!
    user: User
  }                     

`;

// export the typeDefs
module.exports = typeDefs;          