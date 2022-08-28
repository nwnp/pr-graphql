import { ApolloServer, gql } from "apollo-server";

// Dummy data
const tweets = [
  {
    id: "1",
    text: "hello world!",
    author: {
      id: "1",
      username: "nwnp",
      firstName: "jin",
      lastName: "jeong woo",
    },
  },
  {
    id: "2",
    text: "hello world!2",
    author: {
      id: "2",
      username: "jjw",
      firstName: "test",
      lastName: "hi",
    },
  },
  {
    id: "3",
    text: "hello world!3",
    author: {
      id: "3",
      username: "ujmn",
      firstName: "hihi",
      lastName: "test",
    },
  },
];

// Type definition
const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    firstName: String!
    lastName: String!
  }
  type Tweet {
    id: ID!
    text: String!
    author: User
  }
  type Query {
    # allTweets: [Tweet!]
    # return이 null이 아닐 것이라고 확신을 할 수 있다면 [Tweet!] 뒤에 !를 붙임
    # 즉, 리스트 안에 요소들이 Tweet 타입들일 것이라고 확신하며, 리스트일 것이라고 확신
    allTweets: [Tweet!]
    tweet(id: ID!): Tweet!
  }
  type Mutation {
    postTweet(text: String!, userId: ID!): Tweet!
    deleteTweet(id: ID!): Boolean!
  }
`;

const resolvers = {
  Query: {
    allTweets() {
      return tweets;
    },
    tweet(_, { id }) {
      return tweets.find((tweet) => tweet.id === id);
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Running on ${url}`);
});
