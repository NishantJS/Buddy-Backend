import mongoose from "mongoose";
import productSchema from "./schema/product.js";
import userSchema from "./schema/user.js";
import sellerSchema from "./schema/seller.js";
import categorySchema from "./schema/category.js";

const DogFood = new mongoose.model("DogFood", productSchema);
const DogTreats = new mongoose.model("DogTreat", productSchema);
const User = new mongoose.model("User", userSchema);
const Category = new mongoose.model("Category", categorySchema);
const Seller = new mongoose.model("Seller", sellerSchema);

export { User, Seller, DogFood, DogTreats, Category };
