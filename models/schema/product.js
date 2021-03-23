import mongoose from "mongoose";

const min = [
  100,"The value of path `{PATH}` ({VALUE}) is beneath the limit ({MIN}).",
];
const max = [
  400,"The value of path `{PATH}` ({VALUE}) exceeds the limit ({MAX}).",
];

const productSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true},
  description: { type: String, required: true , trim: true},
  thumbnail: String,
  allowed: Number,
  uci: { type: Number, required: true,min,max },
  images: [String],
  stock: { type: Number, required: true },
  price: [{
    size: String,
    price: Number,
    retail_price: Number,
    _id: false
  }],
  seller: { type: String, required: true },
});

export default productSchema;
