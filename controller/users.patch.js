import { User, isObjectId } from "../models/index.js";

const _updateCartAdd = async (_id, updateData) => {
  try {
    if (!isObjectId(_id)) throw new Error("Invalid ID");
    const updatedData = await User.findByIdAndUpdate(
      _id,
      {
        $addToSet: {
          cart: {
            id: updateData.id,
            title: updateData.title,
            thumbnail: updateData.thumbnail,
            sizes: updateData.sizes,
            variant: updateData.variant,
            uci: updateData.uci,
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

const _updateCartRemove = async (_id, updateData) => {
  try {
    if (!isObjectId(_id)) throw new Error("Invalid ID");
    const updatedData = await User.findByIdAndUpdate(
      _id,
      {
        $pull: {
          cart: { id: updateData.id, variant: updateData.variant },
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

const _updateWishListAdd = async (_id, updateData) => {
  try {
    if (!isObjectId(_id)) throw new Error("Invalid ID");
    const updatedData = await User.findByIdAndUpdate(
      _id,
      {
        $addToSet: {
          wishlist: {
            id: updateData.id,
            title: updateData.title,
            thumbnail: updateData.thumbnail,
            sizes: updateData.sizes,
            variant: updateData.variant,
            uci: updateData.uci,
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

const _updateWishListRemove = async (_id, updateData) => {
  try {
    if (!isObjectId(_id)) throw new Error("Invalid ID");
    const updatedData = await User.findByIdAndUpdate(
      _id,
      {
        $pull: {
          wishlist: { id: updateData.id, variant: updateData.variant },
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

const _updateCartQuantity = async (
  _id,
  item_id,
  isIncrement = true,
  variant = 0
) => {
  try {
    if (!isObjectId(_id)) throw new Error("Invalid ID");
    const updatedData = await User.findOneAndUpdate(
      {
        _id,
        "cart.id": item_id,
        variant: variant,
      },
      {
        $inc: { "cart.$.quantity": isIncrement ? 1 : -1 },
      }
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
  _updateCartQuantity,
};
