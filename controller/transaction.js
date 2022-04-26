import { Transaction, isObjectId } from "../models/index.js";

const _transactionAdd = async (data, counts, address, order_id, user) => {
  try {
    for (let i = 0; i < counts.length; i++) {
      data[i]["quantity"] = counts[i];
      data[i]["address"] = address;
      data[i]["orderId"] = order_id;
      data[i]["user"] = user;
    }

    const transaction = await Transaction.insertMany(data);
    if (!transaction)
      return {
        error: true,
        data: "Make sure you are providing all parameters while making an API call",
      };

    return { data: transaction, error: false };
  } catch (error) {
    return {
      error: true,
      data: error?.message || "Wrong Token. Please Login Again!",
    };
  }
};

const _transactionUpdate = async (_id, updateData) => {
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

export default {
  _transactionAdd,
  _transactionUpdate,
};

export { _transactionAdd, _transactionUpdate };
