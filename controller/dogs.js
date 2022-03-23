import { Dog , ObjectId} from "../models/index.js"

const _create = async (body) => {
  try {
    let newProduct = await new Dog[body.uci[2]](body);
    const product = await newProduct.save();
    return {error: false, data: product}
    
  } catch (err) {
    let errors = err?.errors[Object.keys(err?.errors)[0]].message || err?.message;
    return {error: true, data: errors || "⚠ Some error occurred while retrieving Product data"}
  }
};

const _findAll = async () => {
  try {
    const product = await Dog[0].find().limit(10);
    return {error: false,data:product}
  } catch (err) {
    return {error: true,data: err.message || "⚠ Some error occurred while retrieving Product data"}
  }
};

const _findOne = async (req,res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) throw "ObjectId is not Valid";
    
    const productData = await Dog[0].findById(req.params.id);

    if (productData) return res.status(200).json({ error: false, data: productData });
    
    return res
      .status(400)
      .json({
        error: true,
        data: "Product does not available anymore or has been moved",
      });
    
  } catch (err) {
    return res.status(500).json({
      error: true,
      data :err.message|| err|| "⚠ Some error occurred while retrieving Product data"
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

export default { _create, _findAll, _findOne };