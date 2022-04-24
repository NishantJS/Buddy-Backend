import { Router } from "express";
import UserPatch from "../controller/users.patch.js";

const cart = Router();

cart.patch("/quantity", async (req, res) => {
  try {
    const id = req.user.user;
    const item_id = req.body?.id;
    const isIncrement = req.body?.isIncrement;
    const variant = req.body?.variant || 0;
    if (!id || !item_id) throw new Error("Cart Data Not Found");

    const { error, data } = await UserPatch._updateCartQuantity(
      id,
      item_id,
      isIncrement,
      variant
    );

    if (error) throw new Error(data);

    return res.status(200).json({ error: false, data: "Quantity updated" });
  } catch (error) {
    return res.status(500).json({ error: true, data: error?.message });
  }
});

cart.patch("/", async (req, res) => {
  try {
    if (!req?.body?.id) throw new Error("Cart Data Not Found");
    const cart = req.body;
    const id = req.user.user;

    const { error, data } = await UserPatch._updateCartAdd(id, cart);

    if (error) throw new Error(data);

    return res.status(200).json({ error: false, data: "Item added to cart" });
  } catch (error) {
    return res.status(500).json({ error: true, data: error?.message });
  }
});

cart.delete("/", async (req, res) => {
  try {
    if (!req.query?.id || !req.query?.variant)
      throw new Error("Cart Data Not Found");

    const cart = { id: req.query.id, variant: req.query.variant };
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
