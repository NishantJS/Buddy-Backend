// ?Getting Environmental Variables
import dotenv from "dotenv";
dotenv.config();

// ?Creating an Express Application
import express from "express";
const app = express();

// ?Import Packages
import cors from "cors";
import logger from "morgan";
import cookieParser from "cookie-parser";
import passport from "passport";

// ?Setting up Database
import "./db/mongo.js";

// ?Routers
import user from "./routes/user.js";
import shop from "./routes/shop/index.js";
import "./auth/jwt.js";
import quote from "./routes/quotes.js";

// ?Middlewares
app.use(cookieParser());
// todo remove morgan in production
app.use(logger("dev"));
app.use(passport.initialize());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ?Use Routers
app.use("/user", user);
app.use("/quote", quote)
app.use("/shop", shop)


// import path from "path";
// app.use(express.static(path.join(__dirname, "build")));

// todo add configuration to only allow google fonts in production

export default app;
