import express from "express";
import UserPatch from "../controller/users.patch.js";

const cart = express.Router();

cart.patch("/add", async (req, res) => {
  try {
    if (req.body?._id) {
      let cart = req.body;
      let id = req.user.user;

      const update = await UserPatch._updateCartAdd(id, cart);

      if (!update.isValid) throw update.data;
      else
        return res
          .status(200)
          .json({ error:false, data: "Item added to cart" });
    } else throw new Error("Cart Data Not Found");
  } catch (error) {
    return res.status(500).json({ error: true, data: error.message});
  }
});

cart.patch("/remove", async (req, res) => {
  try {
    if (req.body?._id) {
      let cart = req.body;
      let id = req.user.user;

      const update = await UserPatch._updateCartRemove(id, cart);

      if (!update.isValid) throw update.data;
      else
        return res
          .status(200)
          .json({ error: false, data: "Item removed from cart" });
    } else throw new Error("Cart Data Not Found")
  } catch (err) {
    return res.status(500).json({ error: true, data: err.message });
  }
});

export default cart;
