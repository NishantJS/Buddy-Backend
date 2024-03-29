import mongoose from "mongoose";

const min = [100, "Invalid UCI"];
const max = [300, "Invalid UCI"];
const minDesc = [
  50,
  "Provided description is too small, you need a proper description to describe a product",
];
const maxDesc = [
  300,
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
  images: Number,
  uci: { type: Number, required, min, max },
  sizes: [
    {
      size: String,
      price: Number,
      retail_price: Number,
      stock: { type: Number, required },
      allowed: {
        type: Number,
        default: 10,
        max: [
          99,
          "Max 99 products are allowed to be purchased for a single transaction",
        ],
      },
      _id: false,
    },
  ],
  description: {
    main: { type: String, minLength: minDesc, maxLength: maxDesc, required },
  },
  seller: { type: String, required },
};

export default productSchema;
