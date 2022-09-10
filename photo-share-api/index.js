import { ApolloServer } from "apollo-server";
import { resolvers } from "./common/resolvers.js";
import { typeDefs } from "./common/typeDefs.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server
  .listen()
  .then(({ url }) => console.log(`GraphQL Service running on ${url}`));
