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
import seller from "./routes/seller.js";
import shop from "./routes/shop/index.js";
import "./auth/jwt.js";
import quote from "./routes/quotes.js";

// ?Middlewares
app.use(cookieParser());
// todo remove morgan in production
app.use(logger("dev"));
app.use(passport.initialize());
app.use(cors({ origin : "http://localhost:3000", maxAge: 600}));
app.use(express.json());
app.use(express.urlencoded({ extended: true })
);

app.use((_req, res, next) => {
  // ?Hide server name for security reasons
  res.setHeader("X-Powered-By", "Nginx");
  next();
})

// ?Use Routers
app.use(["/user/cart", "/user/wishlist"], cors());
app.use("/user", user);
app.use("/quote", quote)
app.use("/shop", shop)
app.use("/seller", seller)


// app.use(express.static("build"));

// todo add configuration to only allow google fonts in production

app.get("/", function (req, res) {
  res.send("hello")
  // res.sendFile("index.html");
});

export default app;
