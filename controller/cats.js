import { Cat } from "../models/index.js";

const _create = async (req) => {
  try {
    let newProduct = await new Cat(req.body);
    const product = await newProduct.save();
    if (product) return { error: false, data: product }
    
    return { error: true, data: "Something went wrong while creating entry for product! Please try again after some time" }
    
  } catch (err) {
    return {
      error: true,
      data: err.message || "⚠ Some error occurred while retrieving Product data",
    };
  }
};

const _findAll = async () => {
  try {
    const product = await Cat.find().limit(10);
    return { error: false, data: product };
  } catch (err) {
    return {
      error: true,
      data: err.message || "⚠ Some error occurred while retrieving Product data",
    };
  }
};

const _findOne = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) throw "ObjectId is not Valid";
    
    const productData = await Cat.findById(req.params.id);

    if (productData)
      return res.status(200).json({ error: false, data: productData });

    return res.status(400).json({
      error: true,
      data: "Product does not available anymore or has been moved",
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      data:
        err.message ||
        err ||
        "⚠ Some error occurred while retrieving Product data",
    });
  }
};

export { _create, _findAll, _findOne };
