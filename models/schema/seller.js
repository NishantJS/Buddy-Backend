import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
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
  products: [String],
  pendingOrders: [String],
  cancelledOrders: [String],
  acceptedOrders: [String],
  pass: String,
});

export default sellerSchema;
