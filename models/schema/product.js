import mongoose from "mongoose";

const min = [
  100,"The value of path `{PATH}` ({VALUE}) is beneath the limit ({MIN}).",
];
const max = [
  400,"The value of path `{PATH}` ({VALUE}) exceeds the limit ({MAX}).",
];

const productSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, minLength: 3, maxLength: 90 },
  description: { type: String, required: true, trim: true, minLength: 200, maxLength: 1000 },
  thumbnail: { type: String, required: true },
  allowed: Number,
  uci: { type: Number, required: true, min, max },
  stock: { type: Number, required: true },
  size: { type: String, required: true },
  price: {
    price: Number,
    retail_price: Number,
    _id: false,
  },
  seller: { type: mongoose.SchemaTypes.ObjectId, required: true },
});

export default productSchema;
