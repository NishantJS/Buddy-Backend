import express from "express";
import passport from "passport";
import User from "../controller/users.js";
import usersPatch from "../controller/users.patch.js";
import loginValidator from "../validator/login.js";
import registerValidator from "../validator/register.js";
import cart from "./cart.js";
import wishlist from "./wishlist.js";

const user = express.Router();

user.post("/login", async (req, res) => {
  const { errors, isValid } = loginValidator(req.body);

  if (!isValid) return res.status(400).json(errors);
  else await User._findOne(req, res);
});

user.post("/register", async (req, res) => {
  const { errors, isValid } = registerValidator(req.body);

  if (!isValid) return res.status(400).json(errors);
  else await User._checkOne(req, res);
});

user.use(
  ["/wishlist", "/cart", "/profile", "/dashboard", "/orders"],
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const id = req.user.user;
      const check = await usersPatch._checkId(id);
      if (!check.isValid) throw check.error;
      next();
    } catch (e) {
      res.status(500).json({ msg: e });
    }
  }
);

user.use("/cart", cart);
user.use("/wishlist", wishlist);

user.get("/", async (req, res) => {
  await User._getOneById(req,res)  
});

user.delete("/", async (req, res) => {
  await User._delete(req, res);
});

export default user;
