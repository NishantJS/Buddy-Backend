import { Dog } from "../models/index.js"

const _create = async (req) => {
  try {    
    let newProduct = await new Dog(req.body);
    const product = await newProduct.save();
    return {error: false, data: product}
  } catch (err) {
    return {error: true, data: err || "⚠ Some error occurred while retrieving Users"}
  }
};

const _findAll = async () => {
  try {
    const product = await Dog.find();
    return {error: false,data:product}
  } catch (err) {
    return {error: true,data: err.message || "⚠ Some error occurred while retrieving Users"}
  }
};

const _findOne = async (res) => {
  try {
    const users = await Dog.find();
    return res.status(302).json(users);
  } catch (err) {
    return res.status(500).json({
      err,
      message: err.message || "⚠ Some error occurred while retrieving Users",
    });
  }
};

// implement delete
// const _delete = async (req) => {
//   try {
//     // let product = await Dog.findByIdAnd
//   } catch (err) {
//     return {
//       error: true,
//       data: err.message || "⚠ Some error occurred while deleting product. Please try again.",
//     };
//   }
// }

export { _create, _findAll, _findOne };