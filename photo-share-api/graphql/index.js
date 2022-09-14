import { Mutation } from "./resolvers/mutation.js";
import { Query } from "./resolvers/query.js";
import { Type } from "./resolvers/type.js";

export const resolvers = {
  Query,
  Mutation,
  ...Type,
};
