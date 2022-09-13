export const typeDefs = `
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
}
type Photo {
  id: ID!
  url: String!
  name: String!
  description: String
  category: PhotoCategory!
  postedBy: User!
}
input PostPhotoInput {
  name: String!
  category: PhotoCategory=PORTRAIT
  description: String
}
type Query {
  totalPhotos: Int!
  allPhotos: [Photo!]!
}
type Mutation {
  postPhoto(input: PostPhotoInput!): Photo!
}
`;
