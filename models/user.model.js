import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      fname: String,
      lname: String,
    },
    contact: {
      email: {
        type: String,
        unique: true,
      },
      phone: {
        type: Number,
        unique: [
          true,
          "phone number is already associated with different account",
        ],
      },
    },
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
