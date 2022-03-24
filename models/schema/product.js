import mongoose from "mongoose";

const min = [100, "Invalid UCI"];
const max = [300, "Invalid UCI"];
const minDesc = [
  100,
  "Provided description is too small, you need a proper description to describe a product",
];
const maxDesc = [
  1100,
  "Provided description exceeded the word count! Please shorten it",
];

const required = [true, "Product {PATH} is required"];

const productSchema = {
  title: {
    type: String,
    required,
    trim: true,
    minLength: [3, "Product name too short"],
    maxLength: [90, "Product name too long"],
  },
  images: [{ type: String }],
  allowed: { type: Number, default: 5, max: 5 },
  uci: { type: Number, required, min, max },
  stock: { type: Number, required },
  sizes: [
    {
      size: String,
      price: Number,
      retail_price: Number,
      _id: false,
    },
  ],
  description: {
    main: { type: String, minLength: minDesc, maxLength: maxDesc, required },
  },
  seller: { type: mongoose.SchemaTypes.ObjectId, required },
};

export default productSchema;
