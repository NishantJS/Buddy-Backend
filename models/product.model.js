import mongoose, { Schema } from "mongoose";
const productSchema = new mongoose.Schema(
  {
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
    brand: {
      seller_name: String,
      seller_id: String,
    },
    feedback: {
      total_rating: Number,
      total_review: Number,
      ratings: Schema.Types.ObjectId,
      reviews: Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

const Product = new mongoose.model("Product", productSchema);

export default Product;

// review: {
//         user_name: Schema.Types.ObjectId,
//         likes: Number,
//         dislikes: Number,
//         type: String,
//       },

//       rating: {
//         user_name: Schema.Types.ObjectId,
//         rated: Number,
//       },
