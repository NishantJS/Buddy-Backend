import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    fname: String,
    lname: String,
  },
  email: { type: String, required: true, unique: true },
  address: [
    {
      full_name: String,
      line1: String,
      line2: String,
      city: String,
      state: String,
      pin: Number,
      phone: [Number],
    },
  ],
  cart: [
    {
      id: mongoose.Schema.Types.ObjectId,
      title: String,
      uci: Number,
      price: {
        price: Number,
        retail: String,
      },
    },
  ],
  wishlist: [
    {
      id: mongoose.Schema.Types.ObjectId,
      title: String,
      uci: Number,
      price: {
        price: Number,
        retail: String,
      },
    },
  ],
  orders: [
    {
      id: mongoose.Schema.Types.ObjectId,
      title: String,
      uci: Number,
      price: {
        price: Number,
        retail: String,
      },
    },
  ],
  pass: String,
});

export default userSchema;
