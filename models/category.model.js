import mongoose from "mongoose";
const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    unique: true,
    required: true,
  },
  sub_categories: mongoose.Schema.Types.ObjectId,
});

const Category = new mongoose.model("Category", categorySchema);

export default Category;

// {
//     title: {
//       type: String,
//       unique: false,
//       required: true,
//     },
//     thumbnail: String,
//     path: {
//       type: String,
//       unique: true,
//       required: true,
//     },
//     type: Array,
//     required: false,
//   }
