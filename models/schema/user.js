import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    fname: String,
    lname: String,
  },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  address: [
    {
      full_name: String,
      line1: String,
      line2: String,
      city: String,
      state: String,
      pin: Number,
      phone: [Number]
    },
  ],
  cart: [
    {
      id: mongoose.Schema.Types.ObjectId,
      title: String,
      uci: Number,
      price: {
        price: Number,
        retail_price: Number,
      },
      thumbnail: [String],
      size: String,
    },
  ],
  wishlist: [
    {
      id: mongoose.Schema.Types.ObjectId,
      title: String,
      uci: Number,
      price: {
        price: Number,
        retail_price: Number,
      },
      thumbnail: [String],
      size: String,
    },
  ],
  orders: [
    {
      id: mongoose.Schema.Types.ObjectId,
      title: String,
      price: {
        price: Number,
        retail: String,
      },
      status: Number
    },
  ],
  pass: { type: String, required: true },
});

export default userSchema;
