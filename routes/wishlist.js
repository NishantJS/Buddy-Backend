import express from "express";
import UserPatch from "../controller/users.patch.js";

const wishlist = express.Router();

wishlist.patch("/add", async (req, res) => {
  try {
    if (req.body.wishlist) {
      let wishlist = req.body.wishlist;
      let id = req.user.user;

      const update = await UserPatch._updateWishListAdd(id, wishlist);

      if (!update.isValid) throw update.err;
      else
        res
          .status(200)
          .send({ user: update.updatedData, msg: "Update Successful" });
    } else throw { msg: "Wishlist Data Not found" };
  } catch (error) {
    res.status(500).send({ error });
  }
});

wishlist.patch("/remove", async (req, res) => {
  try {
    if (req.body.wishlist) {
      let wishlist = req.body.wishlist;
      let id = req.user.user;

      const update = await UserPatch._updateWishListRemove(id, wishlist);

      if (!update.isValid) throw update.err;
      else
        res
          .status(200)
          .send({ user: update.updatedData, msg: "Update Successful" });
    } else throw { msg: "Wishlist Data Not found" };
  } catch (error) {
    res.status(500).send({ error });
  }
});

export default wishlist;
