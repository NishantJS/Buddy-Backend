import express from "express";
// import passport from "passport";
import Seller from "../controller/sellers.js";
import authValidator from "../validator/auth_sign.js";

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

// seller.use(
//   ["/wishlist", "/cart", "/profile", "/dashboard", "/orders"],
//   passport.authenticate("jwt", { session: false }),
//   async (req, res, next) => {
//     try {
//       const id = req.user.user;
//       const check = await usersPatch._checkId(id);
//       if (!check.isValid) throw check.error;
//       next();
//     } catch (e) {
//       res.status(500).json({ msg: e });
//     }
//   }
// );

// seller.use("/product", cart);
// seller.use("/wishlist", wishlist);

seller.get("/", async (req, res) => {
  await Seller._getOneById(req, res);
});

seller.delete("/", async (req, res) => {
  await Seller._delete(req, res);
});

export default seller;
