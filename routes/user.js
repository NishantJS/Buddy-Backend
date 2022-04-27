import { Router } from "express";
import passport from "passport";
import {
  _checkOne,
  _findOne,
  _updateAddress,
  _deleteAddress,
} from "../controller/users.js";
import authValidator from "../validator/auth_sign.js";
import addressValidator from "../validator/address.js";
import cart from "./cart.js";
import checkout from "./checkout.js";
import wishlist from "./wishlist.js";

const user = Router();

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

    const { error, data, user, token, status } = await _findOne(auth);
    const statusCode = status ? status : error ? 500 : 200;

    if (error) return res.status(statusCode).json({ error, data });

    return res
      .status(statusCode)
      .cookie("token", token, {
        signed: true,
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        maxAge: Number.parseInt(process.env.JWT_EXPIRES_IN),
      })
      .json({ error, user, data });
  } catch (error) {
    return res.status(400).json({ error: true, data: error?.message });
  }
});

user.post("/register", async (req, res) => {
  try {
    const auth = await base64Decode(req.headers);
    if (auth.error) throw new Error(auth.data);

    const { errors, isValid } = authValidator(auth);
    if (!isValid) throw new Error(errors);

    const { error, data, user, token, status } = await _checkOne(auth);
    const statusCode = status ? status : error ? 500 : 200;

    if (error) return res.status(statusCode).json({ error, data });

    return res
      .status(statusCode)
      .cookie("token", token, {
        signed: true,
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: Number.parseInt(process.env.JWT_EXPIRES_IN),
      })
      .json({ error, user, data });
  } catch (error) {
    return res.status(400).json({ error: true, data: error?.message });
  }
});

user.use(
  ["/wishlist", "/cart", "/profile", "/orders", "/checkout", "/address"],
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const { token } = req.signedCookies;
      if (!token || !req.user.user) throw new Error("Unauthorized");
      next();
      return;
    } catch (error) {
      return res.status(401).json({
        error: true,
        data: error?.message || "Error checking user id",
      });
    }
  }
);

user.use("/cart", cart);
user.use("/wishlist", wishlist);
user.use("/checkout", checkout);

user.post("/address/add", async (req, res) => {
  try {
    const { errors, isValid } = addressValidator(req.body);
    if (!isValid) throw new Error(errors);
    const { error, data } = await _updateAddress(req.user.user, req.body);
    if (error) throw new Error(data);

    return res.status(error ? 500 : 200).json({ error, data });
  } catch (error) {
    return res.status(500).json({ error: true, data: error?.message });
  }
});

user.delete("/address/remove/", async (req, res) => {
  try {
    if (!req.query?.index) throw new Error("Index Not Found");

    const { error, data } = await _deleteAddress(
      req.user.user,
      req.query.index
    );
    if (error) throw new Error(data);

    return res.status(error ? 500 : 200).json({ error, data });
  } catch (error) {
    return res.status(500).json({ error: true, data: error?.message });
  }
});

user.delete("/", async (req, res) => {
  // await User._delete(req, res);
});

export default user;
