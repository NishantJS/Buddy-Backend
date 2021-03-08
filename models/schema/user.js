import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    fname: String,
    lname: String,
  },
  email: String,
  address: {
    phone: Number,
    line1: String,
    line2: String,
    city: String,
    state: String,
    pincode: Number,
  },
  cart: [mongoose.Schema.Types.ObjectId],
  pass: String,
});

export default userSchema;
