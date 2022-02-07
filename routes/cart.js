import express from "express";
import UserPatch from "../controller/users.patch.js";

const cart = express.Router();

cart.patch("/add", async (req, res) => {
  try {
    if (req.body.cart) {
      let cart = req.body.cart;
      let id = req.user.user;

      const update = await UserPatch._updateCartAdd(id, cart);

      if (!update.isValid) throw update.err;
      else
        res
          .status(200)
          .json({ user: update.updatedData, data: "Update Successful" });
    } else throw new Error("Cart Data Not Found");
  } catch (error) {
    res.status(500).json({ error: true, data: err.message});
  }
});

cart.patch("/remove", async (req, res) => {
  try {
    if (req.body.cart) {
      let cart = req.body.cart;
      let id = req.user.user;

      const update = await UserPatch._updateCartRemove(id, cart);

      if (!update.isValid) throw update.err;
      else
        res
          .status(200)
          .send({ user: update.updatedData, data: "Update Successful" });
    } else throw new Error("Cart Data Not Found")
  } catch (err) {
    res.status(500).json({ error: true, data: err.message });
  }
});

export default cart;
