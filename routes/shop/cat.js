import express from "express";
import { _findAll, _create } from "../../controller/cats.js";

const cat = express.Router();

cat.get("/", async (req, res) => {
  try {
    if (req.body.uci < 200 || req.body.uci > 300)
      throw "Invalid uci for this path";
    
    const { error, data } = await _findAll();
    if (error) {
      res.status(500).json({ error, data });
    } else {
      res.status(200).json({ error, data });
    }
  } catch (err) {
    res.status(500).json({ error: true, data: err.message || err });
  }
});

cat.post("/", async (req, res) => {
  try {
    let { error, data } = await _create(req);

    if (error) {
      res.status(500).json({error, data });
    } else {
      res.status(201).json({ error, data });
    }
  } catch (err) {
    res.status(500).json({ error: true, data: err.message || err });
  }
});

cat.delete("/", async () => {});

export default cat;
