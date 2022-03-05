import mongoose from "mongoose";
// import productSchema from "./schema/product.js "; 
import productFoodSchema from "./schema/product.food.js "; 
import userSchema from "./schema/user.js";
import sellerSchema from "./schema/seller.js";
const ObjectId = mongoose.Types.ObjectId;

const DogFood = new mongoose.model("Dog", productFoodSchema);
const DogTreats = new mongoose.model("Dog", productFoodSchema);
const DogHealth = new mongoose.model("Dog", productFoodSchema);
const DogToys = new mongoose.model("Dog", productFoodSchema);
const DogGrooming = new mongoose.model("Dog", productFoodSchema);
const Cat = new mongoose.model("Cat", productFoodSchema);
const User = new mongoose.model("User", userSchema);
const Seller = new mongoose.model("Seller", sellerSchema);

const Dog = [DogFood, DogTreats, DogHealth, DogToys, DogGrooming];

export { User, Dog, Cat, Seller, ObjectId };
