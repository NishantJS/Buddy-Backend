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
import "./auth/jwt.js";
import user from "./routes/user.js";
import seller from "./routes/seller.js";
import shop from "./routes/shop/index.js";
import quote from "./routes/quotes.js";
import upload from "./routes/upload.js";
import restoreSession from "./routes/restoreSession.js";

// ?Middlewares
// todo remove morgan in production
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(logger("dev"));
app.use(passport.initialize());
app.use(
  cors({ origin: "http://localhost:3000", maxAge: 600, credentials: true })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((_req, res, next) => {
  // ?Hide server name for security reasons
  res.setHeader("X-Powered-By", "Nginx");
  next();
});

// ?Use Routers
app.use("/session", restoreSession);
app.use("/user", user);
app.use("/seller", seller);
app.use("/quote", quote);
app.use("/shop", shop);
app.use("/upload", upload);
// app.use(express.static("build"));

// todo add configuration to only allow google fonts in production

app.get("*", function (_req, res) {
  res.send("hello");
  // res.sendFile("index.html");
});

export default app;
