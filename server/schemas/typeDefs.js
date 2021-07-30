const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Query {
        me: User
    }

    type Mutation {
        login(email:String!, password: String!): Auth
        addUser(username: String!, email: String!, passowrd: String!): Auth
        saveBook(book: BookInput!): User
        removeBook(bookId: ID!): User
    }

    type User {
        _id: ID!
        username: Sting!
        email: String
        bookCount: Int
        saveBooks: [Book]
    }

    type Book {
        bookId: ID!
        authors: [String]
        description: String
        image: String
        link: String
        title: String!
    }

    type Auth {
        token: ID!
        user: User
    }

    input BookInput {
        authors: [String]
        description: String!
        bookId: String!
        image: String
        link: String
        title: String!
    }
`;

module.exports = typeDefs;
