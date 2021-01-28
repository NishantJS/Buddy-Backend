import mongoose from "mongoose";
const dogFoodSchema = new mongoose.Schema({
  title: String,
  thumbnail: String,
  type: String,
  images: [String],
  price: {
    price: Number,
    retail_price: Number,
  },
  brand: {
    seller_name: String,
    seller_id: String,
  },
});

const DogFood = new mongoose.model("DogFood", dogFoodSchema);

export default DogFood;
