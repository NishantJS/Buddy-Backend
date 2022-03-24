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

const _updateNoteAdd = async (id, updateData) => {
  try {
    if (!mongoose.isValidObjectId(id)) throw error;
    const updatedData = await User.findByIdAndUpdate(
      id,
      {
        $addToSet: {
          note: {
            _id: updateData.id,
            content: updateData.content,
            images: updateData.images,
          },
        },
      },
      { new: true }
    );
    return { isValid: true, updatedData, error: false };
  } catch (err) {
    return {
      error: true,
      isValid: false,
      err: err.message || "Wrong Token. Please Login Again!",
    };
  }
};

const _updateNoteRemove = async (id, updateData) => {
  try {
    if (!mongoose.isValidObjectId(id)) throw error;
    const updatedData = await User.findByIdAndUpdate(
      id,
      {
        $pull: {
          note: { _id: updateData.id },
        },
      },
      { new: true }
    );
    return { isValid: true, updatedData, error: false };
  } catch (err) {
    return {
      error: true,
      isValid: false,
      err: err.message || "Wrong Token. Please Login Again!",
    };
  }
};

export default {
  _updateNoteAdd,
  _updateNoteRemove,
  _checkId,
};
