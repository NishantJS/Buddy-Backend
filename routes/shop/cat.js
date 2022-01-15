import express from "express";
import { _findAll, _create } from "../../controller/cats.js";

const cat = express.Router();

cat.get("/", async (req, res) => {
  try {
    const { error, data } = await _findAll();
    if (error) {
      res.status(500).json({ error: true, data });
    } else {
      res.status(200).json({ error: false, data });
    }
  } catch (err) {
    res.status(500).json({ error: true, data: err });
  }
});

cat.post("/", async (req, res) => {
  try {
    let { error, data } = await _create(req);

    if (error) {
      res.status(500).json({ error: true, data });
    } else {
      res.status(201).json({ error: false, data });
    }
  } catch (err) {
    res.status(500).json({ error: true, data: err });
  }
});

cat.delete("/", async () => {});

export default cat;
