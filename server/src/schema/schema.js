import { GraphQLSchema } from "graphql";
import { RootMutationType, RootQueryType } from "../queries/query.js";

// Creating GraphQL schema
const schema = new GraphQLSchema({
  query: RootQueryType, // Setting Root Query type
  mutation: RootMutationType, // Setting Root Mutation type
});

export default schema;
