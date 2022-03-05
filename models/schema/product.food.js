import mongoose from "mongoose";
import productSchema from "./product.js";

const minLenth = [0, "Invalide feeding guide value {VALUE}"];
const maxLength = [30, "Invalide feeding guide value {VALUE}"];

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
    ingredients: String,
    note: { type: String, maxLength: [300, "Note size exceeded"] },
    isVeg: Boolean,
  },
});

export default productFoodSchema;
