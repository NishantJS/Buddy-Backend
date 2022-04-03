import mongoose from "mongoose";

const categoryError = "Invalid Category";
const userSchema = new mongoose.Schema({
  username: {
    fname: String,
    lname: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
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
      id: mongoose.Schema.Types.ObjectId,
      title: String,
      sizes: {
        size: String,
        price: Number,
        retail_price: Number,
      },
      thumbnail: String,
      allowed: Number,
      variant: { type: Number, default: 0 },
      uci: {
        type: Number,
        min: [100, categoryError],
        max: [300, categoryError],
      },
    },
  ],
  wishlist: [
    {
      id: mongoose.Schema.Types.ObjectId,
      title: String,
      sizes: {
        size: String,
        price: Number,
        retail_price: Number,
      },
      thumbnail: String,
      allowed: Number,
      variant: { type: Number, default: 0 },
      uci: {
        type: Number,
        min: [100, categoryError],
        max: [300, categoryError],
      },
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
      status: Number,
      variant: { type: Number, default: 0 },
      uci: {
        type: Number,
        min: [100, categoryError],
        max: [300, categoryError],
      },
    },
  ],
  temp: {
    otp: Number,
  },
  pass: { type: String, required: true },
});

export default userSchema;
