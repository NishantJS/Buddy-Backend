import express from "express";
import passport from "passport";
import User from "../controller/users.js";
import usersPatch from "../controller/users.patch.js";
import authValidator from "../validator/auth_sign.js";
import cart from "./cart.js";
import wishlist from "./wishlist.js";

const user = express.Router();

const base64Decode = async (headers) => {
  try {
    const credentialNotFound = "Please provide credentials";
    //? get authorization header with email and password in base64
    let authHeader = headers?.authorization;
    if (!authHeader) throw new Error(credentialNotFound);
    //? convert base64 to utf (not ascii cause email address can be internationalized)
    const authBuffer = Buffer.from(authHeader.split(" ")[1], "base64");
    const [email, pass] = authBuffer.toString("utf8").split(":");
    if (!email || !pass) throw new Error(credentialNotFound);

    return { email, pass, error: false };
  } catch (error) {
    return {
      error: true,
      data: error?.message || "Error getting auth credentials",
    };
  }
};

user.post("/login", async (req, res) => {
  try {
    const auth = await base64Decode(req.headers);
    if (auth.error) throw new Error(auth.data);

    const { errors, isValid } = authValidator(auth);
    if (!isValid) throw new Error(errors);

    const { error, data, user, token, status } = await User._findOne(auth);
    const statusCode = status ? status : error ? 500 : 200;

    if (error) return res.status(statusCode).json({ error, data });

    return res
      .status(statusCode)
      .cookie("token", token, {
        httpOnly: true,
      })
      .json({ error, user, data, token });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: true, data: error?.message });
  }
});

user.post("/register", async (req, res) => {
  try {
    const auth = await base64Decode(req.headers);
    if (auth.error) throw new Error(auth.data);

    const { errors, isValid } = authValidator(auth);
    if (!isValid) throw new Error(errors);

    const { error, data, user, token, status } = await User._checkOne(auth);
    const statusCode = status ? status : error ? 500 : 200;

    if (error) return res.status(statusCode).json({ error, data });

    return res
      .status(statusCode)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: Number.parseInt(process.env.JWT_EXPIRES_IN_MS),
      })
      .json({ error, user, data, token });
  } catch (error) {
    return res.status(400).json({ error: true, data: error?.message });
  }
});

user.use(
  ["/wishlist", "/cart", "/profile", "/orders"],
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const id = req.user.user;
      const check = await usersPatch._checkId(id);
      if (!check.isValid) throw check.error;
      next();
      return;
    } catch (err) {
      return res
        .status(500)
        .json({ error: true, data: err?.message || "Error checking user id" });
    }
  }
);

user.use("/cart", cart);
user.use("/wishlist", wishlist);

user.get("/", async (req, res) => {
  try {
    const { error, data, status = 200 } = await User._getOneById(req, res);
    return res.status(status).json({ error, data });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, data: error?.message || "Error checking token" });
  }
});

user.delete("/", async (req, res) => {
  await User._delete(req, res);
});

export default user;
