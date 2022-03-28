import express from "express";
import passport from "passport";
import Seller from "../controller/sellers.js";
import authValidator from "../validator/auth_sign.js";
import sellerPatch from "../controller/seller.patch.js";
import product from "./product.js";

const seller = express.Router();

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

    return { email, pass };
  } catch (error) {
    return { error: true, data: error?.message };
  }
};

seller.post("/login", async (req, res) => {
  try {
    const auth = await base64Decode(req.headers);
    if (auth?.error) throw new Error(auth?.data);

    const { errors, isValid } = authValidator(auth);
    if (!isValid) throw new Error(errors);

    const { error, data, seller, token, status } = await Seller._findOne(auth);
    const statusCode = status ? status : error ? 500 : 200;

    if (error) return res.status(statusCode).json({ error, data });
    return res.status(statusCode).json({ error, seller, data, token });
  } catch (error) {
    return res.status(400).json({ error: true, data: error?.message });
  }
});

seller.post("/register", async (req, res) => {
  try {
    const auth = await base64Decode(req.headers);
    if (auth?.error) throw new Error(auth?.data);
    console.log(auth);

    const { errors, isValid } = authValidator(auth);
    if (!isValid) throw new Error(errors);

    const { error, data, seller, token, status } = await Seller._checkOne(auth);
    const statusCode = status ? status : error ? 500 : 200;

    if (error) return res.status(statusCode).json({ error, data });
    return res.status(statusCode).json({ error, seller, data, token });
  } catch (error) {
    return res.status(400).json({ error: true, data: error?.message });
  }
});

seller.use(
  ["/product/add"],
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const id = req.user.seller;
      const check = await sellerPatch._checkId(id);
      if (!check.isValid) throw check.error;
      next();
      return;
    } catch (err) {
      return res.status(500).json({
        error: true,
        data: err?.message || "Error checking seller id",
      });
    }
  }
);

seller.use("/product", product);
// seller.use("/wishlist", wishlist);

seller.get("/", async (req, res) => {
  try {
    const { error, data, status = 200 } = await Seller._getOneById(req, res);
    return res.status(status).json({ error, data });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, data: error?.message || "Error checking token" });
  }
});

seller.delete("/", async (req, res) => {
  await Seller._delete(req, res);
});

export default seller;
