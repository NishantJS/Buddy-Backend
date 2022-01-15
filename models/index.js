import mongoose from "mongoose";
import productSchema from "./schema/product.js";
import userSchema from "./schema/user.js";
import sellerSchema from "./schema/seller.js";

const Dog = new mongoose.model("Dog", productSchema);
const Cat = new mongoose.model("Cat", productSchema);
const Bird = new mongoose.model("Bird", productSchema);
const User = new mongoose.model("User", userSchema);
const Seller = new mongoose.model("Seller", sellerSchema);

export { User, Dog, Cat, Bird, Seller };
