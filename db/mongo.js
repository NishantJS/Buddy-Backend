import { config } from "dotenv";
config();
import mongoose from "mongoose";

const dbURL = process.env.DB;

mongoose
  .connect(dbURL)
  .then(() => console.info("Connection Successful"))
  .catch((e) => console.error(`Connection to db unsuccessful\n${e?.message}`));

export default mongoose;
