import express from "express";
import fileupload from "express-fileupload";

const upload = express.Router();
upload.use(fileupload());

upload.post("", async (_req, res) => {
  return res
    .status(400)
    .json({ error: true, message: "Bad request seller id or title missing" });
})

upload.post("/:seller/:title", async (req, res) => {

  if (!req.files || Object.keys(req.files).length === 0) {
    return res
      .status(400)
      .json({ error: true, message: "No files were uploaded." });
  }

  const fileName = Object.keys(req.files)[0];
  const path = `${__dirname}/product/${fileName}`;
  return res.status(200).json({message:req.params, path})
})

export default upload;