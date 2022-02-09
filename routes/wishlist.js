import express from "express";
import UserPatch from "../controller/users.patch.js";

const wishlist = express.Router();

wishlist.patch("/add", async (req, res) => {
  try {
    if (req.body?._id) {
      let wishlist = req.body;
      let id = req.user.user;

      const update = await UserPatch._updateWishListAdd(id, wishlist);

      if (!update.isValid) throw new Error(update.data);
      else
        return res
          .status(200)
          .json({ error: false, data: "Item added to wishlist" });
    } else throw new Error("Wishlist Data Not found");
  } catch (error) {
    return res.status(500).json({ error: true, data: error.message });
  }
});

wishlist.patch("/remove", async (req, res) => {
  try {
    if (req.body?._id) {
      let wishlist = req.body;
      let id = req.user.user;

      const update = await UserPatch._updateWishListRemove(id, wishlist);

      if (!update.isValid) throw update.data;
      else
        return res
          .status(200)
          .json({ error: false, data: "Item removed from wishlist" });
    } else throw new Error("Wishlist Data Not found");
  } catch (error) {
    return res.status(500).json({ error:true, data: error.message });
  }
});

export default wishlist;
