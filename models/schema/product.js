import mongoose from "mongoose";

const min = [
  100,"Invalid UCI",
];
const max = [
  300,"Invalid UCI",
];
const minDesc = [
  100,"Provided description is too small, you need a proper description to describe a product",
];
const maxDesc = [
  1100,"Provided description exceeded the word count! Please shorten it",
];

const productSchema = {
  title: { type: String, required: true, trim: true, minLength: 3, maxLength: 90 },
  thumbnail: [{ String }],
  allowed: { type: Number, required: true},
  uci: { type: Number, required: true, min, max },
  stock: { type: Number, required: true },
  price: [{
    size: String,
    price: Number,
    retail_price: Number,
    _id: false,
  }],
  description: { main: { type: String, minLength: minDesc, maxLength: maxDesc }
},
  info_image: [{String}],
  seller: { type: mongoose.SchemaTypes.ObjectId, required: true },
};

export default productSchema;
