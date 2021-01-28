import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

let dbURL = process.env.DB;

mongoose
  .connect(dbURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .catch(() => console.log("Connection to db unsuccessful"));

export default mongoose;
