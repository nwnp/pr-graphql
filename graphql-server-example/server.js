import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    text: String
    hello: String
    # allFilms:
  }
`;

const server = new ApolloServer({ typeDefs });

server.listen().then(({ url }) => {
  console.log(`Running on ${url}`);
});
