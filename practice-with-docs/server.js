import express from "express";
import cors from "cors";

import { graphqlHTTP } from "express-graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";

const app = express();
const PORT = 4000;

const data = {
  warriors: [
    { id: "001", name: "Jaime" },
    { id: "002", name: "Jorah" },
  ],
};

// GraphQL Schema
const typeDefs = `
type Warrior {
  id: ID!
  name: String!
}

type Query {
  warriors: [Warrior]
}
`;

const resolvers = {
  Query: {
    warriors: (obj, args, context, info) => context.warriors,
  },
};

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  "/graphql",
  graphqlHTTP({
    schema: executableSchema,
    context: data,
    graphiql: true,
  })
);

app.get("/", (req, res) => {
  res.send("hello world!");
});

app.listen(PORT, () => {
  console.log(`Running a server at https://localhost:${PORT}`);
});
