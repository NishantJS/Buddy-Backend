import express from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import User from "../controller/users.js";
import UserPatch from "../controller/users.patch.js";
import loginValidator from "../validator/login.js";
import registerValidator from "../validator/register.js";

const user = express.Router();
user.post("/login", async (req, res) => {
  const { errors, isValid } = loginValidator(req.body);

  if (!isValid) return res.status(400).json(errors);
  else await User._findOne(req, res);
});

user.post("/register/", async (req, res) => {
  const { errors, isValid } = registerValidator(req.body);

  if (!isValid) return res.status(400).json(errors);
  else await User._checkOne(req, res);
});

user.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ msg: "Success" });
  }
);

user.patch(
  "/cart",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      if (req.body.cart) {
        let cart = req.body.cart;
        let id = req.user.user;

        const check = await UserPatch._checkId(id);

        if (!check.isValid) throw check.error;
        const update = await UserPatch._updateCart(id, cart);

        // todo error handling for patch requests

        if (!update.isValid) throw update.err;
        else
          res
            .status(200)
            .send({ user: update.updatedData, msg: "Update Successful" });
      }
    } catch (error) {
      res.status(500).send({ error });
    }
  }
);

user.patch(
  "/wishlist",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await UserPatch._update(req, res);
    res.json({ msg: "Success" });
  }
);

user.patch(
  "/orders",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await UserPatch._update(req, res);
    res.json({ msg: "Success" });
  }
);

user.patch(
  "/pass",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await UserPatch._update(req, res);
    res.json({ msg: "Success" });
  }
);

user.get("/", async (_req, res) => {
  await User._findAll(res);
});

user.delete("/", async (req, res) => {
  await User._delete(req, res);
});

export default user;
