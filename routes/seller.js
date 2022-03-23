import express from "express";
import passport from "passport";
import Seller from "../controller/sellers.js";
import authValidator from "../validator/auth_sign.js";
import sellerPatch from "../controller/seller.patch.js"
import product from "./product.js";

const seller = express.Router();

seller.post("/login", async (req, res) => {
  const { errors, isValid } = authValidator(req.body);

  if (!isValid) return res.status(400).json({ error: !isValid, data: errors });
  else await Seller._findOne(req, res);
});

seller.post("/register", async (req, res) => {
  const { errors, isValid } = authValidator(req.body);

  if (!isValid) return res.status(400).json({ error: !isValid, data: errors });
  else await Seller._checkOne(req, res);
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
      return res
        .status(500)
        .json({ error: true, data: err?.message || "Error checking seller id" });
    }
  }
);

seller.use("/product", product);
// seller.use("/wishlist", wishlist);

seller.get("/", async (req, res) => {
  await Seller._getOneById(req, res);
});

seller.delete("/", async (req, res) => {
  await Seller._delete(req, res);
});

export default seller;
