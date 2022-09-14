import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const MONGO_DB = process.env.DB_HOST;
const client = await MongoClient.connect(MONGO_DB, {
  useNewUrlParser: true,
})
  .then((res) => {
    console.log("MongoDB connection success");
    return res;
  })
  .catch((err) => {
    console.error(err);
    throw new Error("MongoDB connection failed");
  });
const db = client.db();

export default db;
