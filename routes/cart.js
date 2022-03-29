import express from "express";
import UserPatch from "../controller/users.patch.js";

const cart = express.Router();

cart.patch("/", async (req, res) => {
  try {
    if (!req?.body?._id || !req?.user?.user)
      throw new Error("Cart Data Not Found");
    const cart = req.body;
    const id = req.user.user;

    const { error, data } = await UserPatch._updateCartAdd(id, cart);

    if (error) throw new Error(data);

    return res.status(200).json({ error: false, data: "Item added to cart" });
  } catch (error) {
    return res.status(500).json({ error: true, data: error?.message });
  }
});

cart.delete("/:id", async (req, res) => {
  try {
    if (!req.params?.id || !req?.user?.user)
      throw new Error("Cart Data Not Found");

    const cart = { _id: req.params.id };
    const id = req.user.user;

    const { error, data } = await UserPatch._updateCartRemove(id, cart);

    if (error) throw new Error(data);
    else
      return res
        .status(200)
        .json({ error: false, data: "Item removed from cart" });
  } catch (error) {
    return res.status(500).json({ error: true, data: error?.message });
  }
});

export default cart;
