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

export const _updateProductAdd = async (_id, product_id, product_title) => {
  try {
    await Seller.findByIdAndUpdate(_id, {
      $push: {
        products: { id: product_id, title: product_title },
      },
    });

    return { error: false };
  } catch (error) {
    console.log(error);
    return { error: true };
  }
};

export default { _updateManyOrders };
