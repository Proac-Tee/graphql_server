import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

import BookType from "./Book.js";

// Defining the Author type for GraphQL schema
const AuthorType = new GraphQLObjectType({
  name: "Author",
  description: "This represents an author of a book",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) }, // Author ID
    name: { type: new GraphQLNonNull(GraphQLString) }, // Author name
    books: {
      type: new GraphQLList(BookType),
      resolve: (author) => {
        // Resolve the books written by the author
        return books.filter((book) => book.authorId === author.id);
      },
    },
  }),
});

export default AuthorType;
