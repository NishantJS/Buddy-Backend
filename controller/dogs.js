import { Dog, isObjectId } from "../models/index.js";

const _create = async (body, sub_category) => {
  try {
    const newProduct = await new Dog[sub_category](body);
    const product = await newProduct.save();
    return { error: false, data: "Product added successfully", product };
  } catch (error) {
    const errors =
      error?.errors[Object.keys(error?.errors)[0]].message || error?.message;
    return {
      error: true,
      data: errors || "⚠ Some error occurred while retrieving Product data",
    };
  }
};

const _findAll = async () => {
  try {
    const product = await Dog[0].find().limit(5).lean();
    return { error: false, data: product };
  } catch (error) {
    return {
      error: true,
      data:
        error?.message || "⚠ Some error occurred while retrieving Product data",
    };
  }
};

const _findAllWhere = async (uci, excludedID) => {
  try {
    const product = await Dog[0]
      .find({ uci, _id: { $ne: excludedID } })
      .limit(5)
      .lean();
    if (!product) throw new Error();
    return { error: false, data: product };
  } catch (error) {
    return {
      error: true,
      data:
        error?.message || "⚠ Some error occurred while retrieving Product data",
    };
  }
};

const _findOne = async (req, res) => {
  try {
    if (!isObjectId(req.params.id)) throw new Error("ObjectId is not Valid");

    const productData = await Dog[0].findById(req.params.id).lean();

    if (productData)
      return res.status(200).json({ error: false, data: productData });

    return res.status(400).json({
      error: true,
      data: "Product does not available anymore or has been moved",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      data:
        error?.message || "⚠ Some error occurred while retrieving Product data",
    });
  }
};

// implement delete
// const _delete = async (req) => {
//   try {
//     // let product = await Dog.findByIdAnd
//   } catch (error) {
//     return {
//       error: true,
//       data: error.message || "⚠ Some error occurred while deleting product. Please try again.",
//     };
//   }
// }

export default { _create, _findAll, _findOne, _findAllWhere };
