import mongoose from "mongoose";
import { User } from "../models/index.js";

const _checkId = async (id) => {
  try {
    const isValid = await User.findById(id);
    if (!isValid) throw "Account does not exists";
    return { isValid: true };
  } catch (error) {
    return { isValid: false, error };
  }
};

const _updateCartAdd = async (id, updateData) => {
  try {
    if (!mongoose.isValidObjectId(id)) throw error;
    const updatedData = await User.findByIdAndUpdate(
      id,
      {
        $addToSet: {
          cart: {
            _id: updateData.id,
            price: updateData.price,
            title: updateData.title,
          },
        },
      },
      { new: true }
    );
    return { isValid: true, updatedData,error: false };
  } catch (err) {
    return {
      error: true,
      isValid: false,
      err: err.message||"Wrong Token. Please Login Again!",
    };
  }
};

const _updateCartRemove = async (id, updateData) => {
  try {
    if (!mongoose.isValidObjectId(id)) throw error;
    const updatedData = await User.findByIdAndUpdate(
      id,
      {
        $pull: {
          cart: { _id: updateData.id },
        },
      },
      { new: true }
    );
    return { isValid: true, updatedData,error: false };
  } catch (err) {
    return {
      error: true,
      isValid: false,
      err: err.message || "Wrong Token. Please Login Again!",
    };
  }
};

const _updateWishListAdd = async (id, updateData) => {
  try {
    if (!mongoose.isValidObjectId(id)) throw error;
    const updatedData = await User.findByIdAndUpdate(
      id,
      {
        $addToSet: {
          wishlist: {
            _id: updateData.id,
            price: updateData.price,
            title: updateData.title,
          },
        },
      },
      { new: true }
    );
    return { error: false, isValid: true, updatedData };
  } catch (err) {
    return {
      error: true,
      isValid: false,
      err: err.message || "Wrong Token. Please Login Again!",
    };
  }
};

const _updateWishListRemove = async (id, updateData) => {
  try {
    if (!mongoose.isValidObjectId(id)) throw error;
    const updatedData = await User.findByIdAndUpdate(
      id,
      {
        $pull: {
          wishlist: { _id: updateData.id },
        },
      },
      { new: true }
    );
    return { error: false, isValid: true, updatedData };
  } catch (err) {
    return {
      error: true,
      isValid: false,
      err: err.message|| "Wrong Token. Please Login Again!",
    };
  }
};

export default {
  _updateCartAdd,
  _updateWishListAdd,
  _updateCartRemove,
  _updateWishListRemove,
  _checkId,
};
