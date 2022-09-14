export const typeDefs = `
scalar DateTime
enum PhotoCategory {
  SELFIE
  PORTRAIT
  ACTION
  LANDSCAPE
  GRAPHIC
}
type User {
  githubLogin: ID!
  name: String
  avatar: String
  postedPhotos: [Photo!]!
  inPhotos: [Photo!]!
}
type Photo {
  id: ID!
  url: String!
  name: String!
  description: String
  category: PhotoCategory!
  postedBy: User!
  taggedUsers: [User!]!
  created: DateTime!
}
input PostPhotoInput {
  name: String!
  category: PhotoCategory=PORTRAIT
  description: String
}
type Query {
  totalPhotos: Int!
  allPhotos: [Photo!]!
  totalUsers: Int!
  allUsers: [User!]!
}
type Mutation {
  postPhoto(input: PostPhotoInput!): Photo!
}`;
