import { Router } from "express";
import { downloadFile } from "../aws/s3.js";

const images = Router();

images.get("/:seller/:title", async (req, res) => {
  try {
    const title = req.params.title;
    const seller = req.params.seller;

    if (!title || !seller) throw new Error("Please provide image URI");

    const { error, data } = await downloadFile(title, seller);
    if (error) throw new Error(data);
    return res.status(200).send(data);
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, data: error?.message || "Image not found" });
  }
});

export default images;
