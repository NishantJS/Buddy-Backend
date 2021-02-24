import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

const app = express();
import mongo from "./db/mongo.js";
const port = process.env.PORT || 3000;
import user from "./routes/user.js";
import category from "./routes/category.js";
import dogs from "./routes/dogs.js";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/categories", category);
app.use("/user", user);
app.use("/dog", dogs);

app.listen(port);
