import express from "express";
import { downloadFile } from "../aws/s3.js";

const images = express.Router();

images.get("/:title", async (req, res) => {
  try {
    const title = req.params.title;
    if (!title) throw new Error("Please provide image URI");
    const { error, data } = await downloadFile(title);
    if (error) throw new Error(data);
    return res.status(200).send(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: true, data: "Image not found" });
  }
});

export default images;
