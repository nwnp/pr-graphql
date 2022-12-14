import { ApolloServer, gql } from "apollo-server";

// Dummy data
let tweets = [
  {
    id: "1",
    text: "hello world!",
    userId: "1",
  },
  {
    id: "2",
    text: "hello world!2",
    userId: "2",
  },
  {
    id: "3",
    text: "hello world!3",
    userId: "3",
  },
];

let users = [
  {
    id: "1",
    firstName: "jin",
    lastName: "jeongwoo",
  },
];

// Type definition
const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    firstName: String!
    lastName: String!
    fullName: String!
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
    allUsers: [User!]!
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
    allUsers() {
      console.log("all users called!");
      return users;
    },
  },
  Mutation: {
    postTweet(_, { text, userId }) {
      const newTweet = {
        id: tweets.length + 1,
        text,
      };
      tweets.push(newTweet);
      return newTweet;
    },
    deleteTweet(_, { id }) {
      const tweet = tweets.find((tweet) => tweet.id === id);
      if (!tweet) return false;
      tweets = tweets.filter((tweet) => tweet.id !== id);
      return true;
    },
  },
  User: {
    // fullName(root) {
    firstName({ firstName }) {
      return firstName;
    },
    fullName({ firstName, lastName }) {
      return firstName + ` ${lastName}`;
    },
  },
  Tweet: {
    author({ userId }) {
      return users.find((user) => user.id === userId);
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Running on ${url}`);
});
