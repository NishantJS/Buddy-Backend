import { Router } from "express";
import UserPatch from "../controller/users.patch.js";

const wishlist = Router();

wishlist.patch("/", async (req, res) => {
  try {
    if (!req?.body?.id) throw new Error("Wishlist Data Not found");
    const wishlist = req.body;
    const id = req.user.user;

    const { error, data } = await UserPatch._updateWishListAdd(id, wishlist);

    if (error) throw new Error(data);

    return res
      .status(200)
      .json({ error: false, data: "Item added to wishlist" });
  } catch (error) {
    return res.status(500).json({ error: true, data: error?.message });
  }
});

wishlist.delete("/", async (req, res) => {
  try {
    if (!req.query?.id || !req.query?.variant)
      throw new Error("Wishlist Data Not found");

    const wishlist = { id: req.query.id, variant: req.query.variant };
    const id = req.user.user;

    const { error, data } = await UserPatch._updateWishListRemove(id, wishlist);

    if (error) throw new Error(data);
    else
      return res
        .status(200)
        .json({ error: false, data: "Item removed from wishlist" });
  } catch (error) {
    return res.status(500).json({ error: true, data: error.message });
  }
});

export default wishlist;
