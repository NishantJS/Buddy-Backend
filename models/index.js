import mongoose from "mongoose";
// import productSchema from "./schema/product.js ";
import productFoodSchema from "./schema/product.food.js ";
import userSchema from "./schema/user.js";
import sellerSchema from "./schema/seller.js";
import transactionSchema from "./schema/transaction.js";
const isObjectId = mongoose.isObjectIdOrHexString;

const DogFood = new mongoose.model("Dog", productFoodSchema);
const DogTreats = new mongoose.model("Dog", productFoodSchema);
const DogHealth = new mongoose.model("Dog", productFoodSchema);
const DogToys = new mongoose.model("Dog", productFoodSchema);
const DogGrooming = new mongoose.model("Dog", productFoodSchema);

const CatFood = new mongoose.model("Cat", productFoodSchema);
const CatTreats = new mongoose.model("Cat", productFoodSchema);
const CatHealth = new mongoose.model("Cat", productFoodSchema);
const CatToys = new mongoose.model("Cat", productFoodSchema);
const CatGrooming = new mongoose.model("Cat", productFoodSchema);

const User = new mongoose.model("User", userSchema);
const Transaction = new mongoose.model("Transaction", transactionSchema);
const Seller = new mongoose.model("Seller", sellerSchema);

const Dog = [DogFood, DogTreats, DogHealth, DogToys, DogGrooming];
const Cat = [CatFood, CatTreats, CatHealth, CatToys, CatGrooming];

export { User, Dog, Cat, Seller, isObjectId, Transaction };
