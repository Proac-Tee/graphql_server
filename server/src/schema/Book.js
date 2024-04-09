import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

import AuthorType from "./Author.js";

// Defining the Book type for GraphQL schema
const BookType = new GraphQLObjectType({
  name: "Book",
  description: "This represents a book written by an author",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) }, // Book ID
    name: { type: new GraphQLNonNull(GraphQLString) }, // Book name
    authorId: { type: new GraphQLNonNull(GraphQLID) }, // Author ID
    author: {
      type: AuthorType,
      resolve: (book) => {
        // Resolve the author of the book
        return authors.find((author) => author.id === book.authorId);
      },
    },
  }),
});

export default BookType;
