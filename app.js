// ?Getting Environmental Variables
import { config } from "dotenv";
config();

// ?Creating an Express Application
import express from "express";
const app = express();

// ?Import Packages
import cors from "cors";
import logger from "morgan";
import cookieParser from "cookie-parser";
import passport from "passport";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// ?Setting up Database
import "./db/mongo.js";

// ?Routers
import "./auth/jwt.js";
import user from "./routes/user.js";
import seller from "./routes/seller.js";
import shop from "./routes/shop/index.js";
import quote from "./routes/quotes.js";
import restoreSession from "./routes/restoreSession.js";
import images from "./routes/images.js";
import auth from "./routes/auth/index.js";

// ?Middlewares
app.use(cookieParser(process.env.COOKIE_SECRET));
if (app.get("env") !== "production") {
  app.use(logger("dev"));
  app.use(
    cors({
      origin: "http://localhost:3000/",
      maxAge: 600,
      credentials: true,
    })
  );
}
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ?Use Routers
app.use("/session", restoreSession);
app.use("/user", user);
app.use("/seller", seller);
app.use("/v1/auth", auth);
app.use("/quote", quote);
app.use("/shop", shop);
app.use("/images", images);
app.use(express.static("build"));

// todo add configuration to only allow google fonts in production

app.get("*", function (_req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

export default app;
