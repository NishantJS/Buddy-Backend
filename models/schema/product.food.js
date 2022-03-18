import mongoose from "mongoose";
import productSchema from "./product.js";

const minLenth = [0, "Invalid feeding guide value length too short"];
const maxLength = [50, "Invalid feeding guide value length exceeds limit"];

const productFoodSchema = new mongoose.Schema({
  ...productSchema,
  description: {
    ...productSchema.description,
    feeding_guide: {
      suitable_for: String,
      small: { type: String, minLenth, maxLength },
      medium: { type: String, minLenth, maxLength },
      large: { type: String, minLenth, maxLength },
      x_large: { type: String, minLenth, maxLength },
    },
    ingredients: { type: String, maxLength: [300, "Ingredients size exceeded"] },
    note: { type: String, maxLength: [300, "Note size exceeded"]},
    isVeg: Boolean,
  },
});

export default productFoodSchema;
