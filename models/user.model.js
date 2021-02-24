import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    username: {
      fname: String,
      lname: String,
    },
    email: String,
    address: {
      phone: Number,
      building: String,
      area: String,
      city: String,
      state: String,
      pincode: Number,
    },
    pass: String,
  },
  {
    timestamps: true,
  }
);

const User = new mongoose.model("User", userSchema);

export default User;
