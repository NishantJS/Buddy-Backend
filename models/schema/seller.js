import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
  username: String,
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
  products: {
    dog: {
      food: [{
      id: mongoose.Schema.Types.ObjectId,
      title: String,
      uci: Number,
      price: {
        price: Number,
        retail: String,
      },
    },
  ]}
  },
  pass: String,
});

export default sellerSchema;
