import { Router } from "express";
import productValidator from "../../validator/productValidator.js";
import Product from "../../controller/product.js";

const product = Router();

product.post("/add", async (req, res) => {
  try {
    const { errors, isValid } = productValidator(req.body);
    if (!isValid)
      return res.status(400).json({ error: !isValid, data: errors });
    const { error, data, product } = await Product._create({
      ...req.body,
      seller: req.user.seller,
    });
    if (!error && product)
      return res.status(200).json({ error, data, product });
    throw new Error(data);
  } catch (error) {
    return res.status(500).json({ error: true, data: error?.message });
  }
});

export default product;
