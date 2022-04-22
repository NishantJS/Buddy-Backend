import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
  username: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  googleId: {
    type: String,
    unique: [true, "Account already exists with other provider"],
    required: false,
  },
  facebookId: {
    type: String,
    unique: [true, "Account already exists with other provider"],
    required: false,
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
    },
  ],
  products: [
    {
      id: mongoose.Schema.Types.ObjectId,
    },
  ],
  pass: { type: String, required: true },
});

export default sellerSchema;
