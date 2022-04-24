import { Router } from "express";
import multer from "multer";
import { uploadFile } from "../aws/s3.js";

const upload = Router();

const saveImage = multer();

upload.post(
  "/:title",
  saveImage.array("product_image", 5),
  async (req, res) => {
    try {
      if (!req?.user?.seller) throw new Error("Unauthorized");
      const { title } = req?.params;
      if (!title) throw new Error("Invalid request");
      const formData = req?.files;

      let length = formData.length;
      if (length < 1) throw new Error("Please provide files to upload!");

      //? higher order functions returning Promises for success and false for rejection
      //? for loop to avoid using Promise.allSettled()

      for (let index = 0; index < formData.length; index++) {
        const folderAndFileName = req?.user?.seller + "/" + title + index;
        const fileUploaded = await uploadFile(
          formData[index],
          folderAndFileName
        );
        if (!fileUploaded) length--;
      }

      if (length < 1) throw new Error("All the provided images are corrupt!");

      return res.status(200).json({
        error: false,
        data: "Image upload successful",
        length,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, data: error?.message || "Image upload failed" });
    } finally {
    }
  }
);

export default upload;
