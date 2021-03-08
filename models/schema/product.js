import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  thumbnail: String,
  category: String,
  sub_category: String,
  images: [String],
  price: {
    price: Number,
    retail_price: Number,
  },
  seller_name: String,
  feedback: {
    total_rating: Number,
    total_review: Number,
    ratings: mongoose.Schema.Types.ObjectId,
    reviews: mongoose.Schema.Types.ObjectId,
  },
});

export default productSchema;
