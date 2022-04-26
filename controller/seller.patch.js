import { Seller } from "../models/index.js";

const _updateManyOrders = async (transaction) => {
  try {
    const bulkUpdates = transaction.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.seller },
          update: { $push: { pendingOrders: item._id } },
        },
      };
    });

    await Seller.bulkWrite(bulkUpdates, { w: 1 });
  } catch (error) {
    console.error(error?.message);
  }
};

export default { _updateManyOrders };
