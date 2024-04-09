import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql"; // Importing GraphQL types and functions

import { books, authors } from "../_db.js"; // Importing mock data for books and authors

import AuthorType from "../schema/Author.js";

import BookType from "../schema/Book.js";

// Defining the Root Query type for GraphQL schema
const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    // Query field to get a single book by ID
    book: {
      type: BookType, // Type of the returned book
      description: "A single Book",
      args: {
        id: { type: GraphQLID }, // ID argument for specifying the book
      },
      resolve: (_parent, args) => {
        // Resolver function to find and return the book by its ID
        return books.find((book) => String(book.id) === String(args.id));
      },
    },
    // Query field to get all books
    books: {
      type: new GraphQLList(BookType), // List of books
      description: "List of All Books",
      resolve: () => books, // Resolver function to return books
    },
    // Query field to get a single author by ID
    author: {
      type: AuthorType, // Type of the returned author
      description: "A single Author",
      args: {
        id: { type: GraphQLID }, // ID argument for specifying the author
      },
      resolve: (_parent, args) => {
        // Resolver function to find and return the author by their ID
        return authors.find((author) => String(author.id) === String(args.id));
      },
    },
    // Query field to get all authors
    authors: {
      type: new GraphQLList(AuthorType),
      description: "List of Authors",
      resolve: () => authors, // Resolver function to return authors
    },
  }),
});

// Defining the Root Mutation type for GraphQL schema
const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
    // Mutation to add a new book
    addBook: {
      type: BookType,
      description: "Add a Book",
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) }, // Book name argument
        authorId: { type: new GraphQLNonNull(GraphQLID) }, // Author ID argument
      },
      resolve: (_parent, args) => {
        // Create a new book object with the provided arguments
        const newBook = {
          id: String(books.length + 1), // Generate a new ID
          name: args.name,
          authorId: args.authorId,
        };

        // Push the new book to the books array
        books.push(newBook);

        // Return the newly added book
        return newBook;
      },
    },

    // Mutation to update a book
    updateBook: {
      type: BookType,
      description: "Update a Book",
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }, // ID argument for specifying the book to update
        name: { type: GraphQLString }, // Optional new name argument for the book
        authorId: { type: GraphQLID }, // Optional new author ID argument for the book
      },
      resolve: (_parent, args) => {
        // Find the index of the book with the specified ID
        const index = books.findIndex(
          (book) => String(book.id) === String(args.id)
        );

        // If the book exists
        if (index !== -1) {
          // Retrieve the existing book
          const existingBook = books[index];

          // Update the book's properties if provided in the arguments
          if (args.name !== undefined) {
            existingBook.name = args.name;
          }
          if (args.authorId !== undefined) {
            existingBook.authorId = args.authorId;
          }

          // Return the updated book
          return existingBook;
        }

        // If the book does not exist, return null
        return null;
      },
    },

    // Mutation to delete a book
    deleteBook: {
      type: BookType,
      description: "Delete a Book",
      args: {
        id: { type: GraphQLID }, // ID argument for specifying the book to delete
      },
      resolve: (_parent, args) => {
        // Find the index of the book with the specified ID
        const index = books.findIndex(
          (book) => String(book.id) === String(args.id)
        );

        // If the book exists
        if (index !== -1) {
          // Remove the book from the books array
          const deletedBook = books.splice(index, 1)[0];
          return deletedBook; // Return the deleted book
        }

        // If the book does not exist, return null
        return null;
      },
    },
    // Mutation to add a new author
    addAuthor: {
      type: AuthorType,
      description: "Add an Author",
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) }, // Author name argument
      },
      resolve: (_parent, args) => {
        // Create a new author object with the provided arguments
        const newAuthor = {
          id: String(authors.length + 1), // Generate a new ID
          name: args.name,
        };

        // Push the new author to the authors array
        authors.push(newAuthor);

        // Return the newly added author
        return newAuthor;
      },
    },

    // Mutation to update an author
    updateAuthor: {
      type: AuthorType,
      description: "Update an Author",
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }, // ID argument for specifying the author to update
        name: { type: GraphQLString }, // Optional new name argument for the author
      },
      resolve: (_parent, args) => {
        // Find the index of the author with the specified ID
        const index = authors.findIndex(
          (author) => String(author.id) === String(args.id)
        );

        // If the author exists
        if (index !== -1) {
          // Retrieve the existing author
          const existingAuthor = authors[index];

          // Update the author's name if provided in the arguments
          if (args.name !== undefined) {
            existingAuthor.name = args.name;
          }

          // Return the updated author
          return existingAuthor;
        }

        // If the author does not exist, return null
        return null;
      },
    },

    // Mutation to delete an author
    deleteAuthor: {
      type: AuthorType,
      description: "Delete an Author",
      args: {
        id: { type: GraphQLID }, // ID argument for specifying the author to delete
      },
      resolve: (_parent, args) => {
        // Find the index of the author with the specified ID
        const index = authors.findIndex(
          (author) => String(author.id) === String(args.id)
        );

        // If the author exists
        if (index !== -1) {
          // Remove the author from the authors array
          const deletedAuthor = authors.splice(index, 1)[0];
          return deletedAuthor; // Return the deleted author
        }

        // If the author does not exist, return null
        return null;
      },
    },
  }),
});

export { RootMutationType, RootQueryType };
