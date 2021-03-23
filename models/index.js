import mongoose from "mongoose";
import productSchema from "./schema/product.js";
import userSchema from "./schema/user.js";

const Dog = new mongoose.model("Dog", productSchema);
const Cat = new mongoose.model("Cat", productSchema);
const Bird = new mongoose.model("Bird", productSchema);
const User = new mongoose.model("User", userSchema);

export { User, Dog, Cat, Bird };
