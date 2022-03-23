import express from "express";
import productValidator from "../validator/productValidator.js";
import Product from "./../controller/product.js"

const product = express.Router();

product.post("/add", async (req, res) => {
  try {
    const { errors, isValid } = productValidator(req.body);
    if (!isValid) return res.status(400).json({ errors, isValid, err: true });
    else await Product._create(req.body);
    /// ! errrrrrrrrrrrrrrrrrrrrrrrrror here
   throw new Error("Something went wromg!")
  } catch (error) {
    return res.status(500).json({ error: true, data: error?.message || "error"});
  }
});

export default product;
