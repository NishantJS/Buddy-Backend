import { config } from "dotenv";
config();
import mongoose from "mongoose";

const dbURL = process.env.DB;

mongoose
  .connect(dbURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .catch(() => console.log("Connection to db unsuccessful"));

export default mongoose;
