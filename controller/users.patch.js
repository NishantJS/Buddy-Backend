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

const _updateCart = async (id, content) => {
  try {
    if (!mongoose.isValidObjectId(id)) throw error;
    const updatedData = await User.findByIdAndUpdate(
      id,
      {
        $addToSet: { cart: content },
      },
      { new: true, upsert: true }
    );
    return { isValid: true, updatedData };
  } catch (e) {
    console.log(e.message || e);
    return { isValid: false, err: "Wrong Token. Please Login Again!" };
  }
};

export default { _updateCart, _checkId };
