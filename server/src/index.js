// Importing necessary modules
import express from "express"; // Importing Express framework
import { createHandler } from "graphql-http/lib/use/express"; // Importing createHandler function for GraphQL

import { ruruHTML } from "ruru/server"; // Importing ruruHTML function for serving HTML
import schema from "./schema/schema.js";

// Initializing Express app
const app = express();

// Creating a route for GraphQL endpoint
app.all(
  "/graphql",
  createHandler({
    schema: schema, // Passing GraphQL schema
  })
);

// Serving the GraphiQL IDE
app.get("/", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" })); // Rendering GraphiQL interface
});

// Starting the server at port 4000
app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql"); // Logging server start message
