import mongoose from "mongoose";
import productSchema from "./product.js";

const minLenth = [0, "Invalid feeding guide value {VALUE}"];
const maxLength = [30, "Invalid feeding guide value {VALUE}"];

const productFoodSchema = new mongoose.Schema({
  ...productSchema,
  description: {
    ...productSchema.description,
    feeding_guide: {
      suitable_for: String,
      small: { type: Number, minLenth, maxLength },
      medium: { type: Number, minLenth, maxLength },
      large: { type: Number, minLenth, maxLength },
      x_large: { type: Number, minLenth, maxLength },
    },
    ingredients: { type: String, maxLength: [300, "Ingredients size exceeded"] },
    note: { type: String, maxLength: [300, "Note size exceeded"]},
    isVeg: Boolean,
  },
});

export default productFoodSchema;
