import mongoose from "mongoose";

const categoryError = "Invalid Category";
const transactionSchema = new mongoose.Schema({
  address: {
    full_name: String,
    line1: String,
    line2: String,
    city: String,
    state: String,
    pin: Number,
    phone: [Number],
    isPrimary: { type: Boolean, default: false },
  },
  id: String,
  title: String,
  price: {
    price: Number,
    retail: String,
  },
  status: {
    type: Number,
    min: [0, "Invalid status"],
    max: [5, "Invalid status"],
  },
  variant: { type: Number, default: 0 },
  uci: {
    type: Number,
    min: [100, categoryError],
    max: [300, categoryError],
  },
  quantity: Number,
  seller: String,
  user: String,
  orderId: String,
});

export default transactionSchema;

/**
// @param status accepts
//  0: Pending              1: Accepted
//  2: Cancelled by seller  3: Cancelled by user
//  4: Shipped              5: Deleivered
*/
