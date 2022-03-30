import mongoose from "mongoose";
import { User } from "../models/index.js";

const _updateCartAdd = async (id, updateData) => {
  try {
    if (!mongoose.isObjectIdOrHexString(id)) throw new Error("Invalid ID");
    const updatedData = await User.findByIdAndUpdate(
      id,
      {
        $addToSet: {
          cart: {
            _id: updateData._id,
            title: updateData.title,
            thumbnail: updateData.thumbnail,
            sizes: updateData.sizes,
            allowed: updateData.allowed,
            variant: updateData.variant,
          },
        },
      },
      { new: true }
    );
    if (!updatedData)
      return {
        error: true,
        data: "Make sure you are providing all parameters while making an API call",
      };

    return { data: updatedData, error: false };
  } catch (error) {
    return {
      error: true,
      data: error?.message || "Wrong Token. Please Login Again!",
    };
  }
};

const _updateCartRemove = async (id, updateData) => {
  try {
    if (!mongoose.isObjectIdOrHexString(id)) throw new Error("Invalid ID");
    const updatedData = await User.findByIdAndUpdate(
      id,
      {
        $pull: {
          cart: { _id: updateData._id, variant: updateData.variant },
        },
      },
      { new: true }
    );

    if (!updatedData) throw new Error();
    return { data: updatedData, error: false };
  } catch (error) {
    return {
      error: true,
      data: error?.message || "Wrong Token. Please Login Again!",
    };
  }
};

const _updateWishListAdd = async (id, updateData) => {
  try {
    if (!mongoose.isObjectIdOrHexString(id)) throw new Error("Invalid ID");
    const updatedData = await User.findByIdAndUpdate(
      id,
      {
        $addToSet: {
          wishlist: {
            _id: updateData._id,
            title: updateData.title,
            thumbnail: updateData.thumbnail,
            sizes: updateData.sizes,
            allowed: updateData.allowed,
            variant: updateData.variant,
          },
        },
      },
      { new: true }
    );
    if (!updatedData)
      return {
        error: true,
        data: "Make sure you are providing all parameters while making an API call",
      };

    return { error: false, data: updatedData };
  } catch (error) {
    return {
      error: true,
      data: error?.message || "Wrong Token. Please Login Again!",
    };
  }
};

const _updateWishListRemove = async (id, updateData) => {
  try {
    if (!mongoose.isObjectIdOrHexString(id)) throw new Error("Invalid ID");
    const updatedData = await User.findByIdAndUpdate(
      id,
      {
        $pull: {
          wishlist: { _id: updateData._id, variant: updateData.variant },
        },
      },
      { new: true }
    );

    if (!updatedData) throw new Error();
    return { error: false, data: updatedData };
  } catch (error) {
    return {
      error: true,
      data: error?.message || "Wrong Token. Please Login Again!",
    };
  }
};

export default {
  _updateCartAdd,
  _updateWishListAdd,
  _updateCartRemove,
  _updateWishListRemove,
};
