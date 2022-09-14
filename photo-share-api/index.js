import { ApolloServer } from "apollo-server-express";
import { resolvers } from "./graphql/index.js";
import { readFileSync } from "fs";
import { db } from "./models/index.js";
import expressPlayground from "graphql-playground-middleware-express";
import express from "express";
import dotenv from "dotenv";

dotenv.config();
const typeDefs = readFileSync("./graphql/typeDefs.graphql", "UTF-8");

const start = async () => {
  const app = express();
  const PORT = 4000;

  const context = { db };

  const server = new ApolloServer({ typeDefs, resolvers, context });
  const graphqlPlayground = expressPlayground.default;

  await server.start();
  server.applyMiddleware({ app });

  app
    .get("/", (req, res) => {
      return res.send("<h1>WELCOME to PhotoShare API</h1>");
    })
    .get("/playground", graphqlPlayground({ endpoint: "/graphql" }));

  app.listen(PORT, () => {
    console.log(
      `GraphQL Server running @ http://localhost:${PORT}${server.graphqlPath}`
    );
  });
};

start();
