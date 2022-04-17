import express from "express";
import multer from "multer";
import { uploadFile } from "../aws/s3.js";

const upload = express.Router();

const saveImage = multer({
  dest: "tmp/",
});

upload.post(
  "/:title",
  saveImage.array("product_image", 5),
  async (req, res) => {
    try {
      const { title } = req?.params;
      if (!title) throw new Error("Invalid request");
      const formData = req.files;

      const data = await formData.map(
        async (file, index) =>
          await uploadFile(
            file,
            title + index + Math.floor(Math.random() * 10000)
          )
      );

      return res.send(data);
    } catch (error) {
      console.log(error?.message);
    }
  }
);

export default upload;
