import mongoose from "mongoose";

const categoryError = "Invalid Category";
const userSchema = new mongoose.Schema({
  username: String,
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  googleId: String,
  facebookId: String,
  address: [
    {
      full_name: String,
      line1: String,
      line2: String,
      city: String,
      state: String,
      pin: Number,
      phone: [Number],
      isPrimary: { type: Boolean, default: false },
    },
  ],
  cart: [
    {
      _id: false,
      id: String,
      title: String,
      sizes: {
        size: String,
        price: Number,
        retail_price: Number,
        allowed: Number,
        stock: Number,
      },
      variant: { type: Number, default: 0 },
      uci: {
        type: Number,
        min: [100, categoryError],
        max: [300, categoryError],
      },
      seller: String,
    },
  ],
  wishlist: [
    {
      _id: false,
      id: String,
      title: String,
      sizes: {
        size: String,
        price: Number,
        retail_price: Number,
        allowed: Number,
        stock: Number,
      },
      variant: { type: Number, default: 0 },
      uci: {
        type: Number,
        min: [100, categoryError],
        max: [300, categoryError],
      },
      seller: String,
    },
  ],
  orders: [String],
  temp: {
    otp: Number,
  },
  pass: String,
});

export default userSchema;
