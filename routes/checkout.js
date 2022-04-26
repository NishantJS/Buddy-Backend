import instance from "../payments/razorpay.js";
import { Router } from "express";
import crypto from "crypto";
import {
  _transactionAdd,
  _transactionUpdate,
} from "../controller/transaction.js";
import User from "../controller/users.patch.js";
import Seller from "../controller/seller.patch.js";

const checkout = Router();

checkout.post("/order", async (req, res) => {
  try {
    const { amount } = req.body;
    if (!req.body?.amount) throw new Error("Please provide all the fields");
    const options = {
      amount: amount,
      currency: "INR",
      payment_capture: 1,
    };
    const order = await instance.orders.create(options);
    // console.log(order?.status);

    return res.status(200).json({ error: false, data: order });
  } catch (error) {
    return res.status(500).json({ error: true, data: error?.message });
  }
});

checkout.post("/payment", async (req, res) => {
  try {
    const { data, counts, address, values } = req.body;
    if (!values || !data || !counts || !address)
      throw new Error("Please provide all the fields");
    const user = req.user.user;

    const generated_signature = crypto.createHmac(
      "sha256",
      process.env.RAZORPAY_KEY_SECRET
    );
    generated_signature.update(
      `${values.razorpay_order_id}|${values.transactionid}`
    );
    if (!generated_signature.digest("hex") === values.razorpay_signature)
      return res.status(500).json({ error: true, data: "Checkout failed!" });

    const transaction = await _transactionAdd(
      data,
      counts,
      address,
      values.razorpay_order_id,
      user
    );

    if (transaction.error) throw new Error(transaction.data);
    await User._updateManyOrders(transaction.data);
    await Seller._updateManyOrders(transaction.data);

    return res
      .status(202)
      .json({ error: false, data: "Order placed successfully" });
  } catch (error) {
    console.log(error?.message, error);
    return res.status(500).json({ error: true, data: "Checkout failed!" });
  }
});

export default checkout;
