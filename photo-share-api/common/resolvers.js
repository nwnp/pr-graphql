import { users, photos } from "./sample-data.js";

let _id = 0;

export const resolvers = {
  Query: {
    totalPhotos: () => photos.length,
    allPhotos: () => photos,
  },
  Mutation: {
    postPhoto(_, args) {
      const newPhoto = {
        id: _id++,
        ...args.input,
      };
      console.log(args.input);
      photos.push(newPhoto);
      return newPhoto;
    },
  },
  Photo: {
    url: (parent) => `http://localhost:4000/img/${parent.id}.jpg`,
    postedBy: (parent) => {
      return users.find((user) => user.githubLogin === parent.githubUser);
    },
  },
  User: {
    postedPhotos: (parent) => {
      return photos.filter((photo) => photo.githubUser === parent.githubLogin);
    },
  },
};
