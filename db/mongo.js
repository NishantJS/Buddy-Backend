import { config } from "dotenv";
config();
import mongoose from "mongoose";

const dbURL = process.env.DB;

mongoose
  .connect(dbURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .catch((e) => console.log("Connection to db unsuccessful"+e));

export default mongoose;
