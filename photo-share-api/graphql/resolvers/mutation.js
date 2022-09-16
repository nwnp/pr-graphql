import dotenv from "dotenv";
import { authorizeWithGithub } from "../lib.js";

dotenv.config();

export const Mutation = {
  async githubAuth(parent, { code }, { db }) {
    const { message, access_token, avatar_url, login, name } =
      await authorizeWithGithub({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code,
      });

    if (message) {
      throw new Error(message);
    }

    const latestUserInfo = {
      name,
      githubLogin: login,
      githubToken: access_token,
      avatar: avatar_url,
    };

    console.log(latestUserInfo);

    const {
      ops: [user],
    } = await db
      .collection("users")
      .replaceOne({ githubLogin: login }, latestUserInfo, { upsert: true });

    return { user, token: access_token };
  },
};
