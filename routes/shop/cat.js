import { Router } from "express";
import Cats from "../../controller/cats.js";
const cat = Router();

cat.get("/", async (_req, res) => {
  try {
    const { error, data } = await Cats._findAll();
    if (error) res.status(500).json({ error, data });
    else res.status(200).json({ error, data });
  } catch (err) {
    res.status(500).json({ error: true, data: err?.message });
  }
});

export default cat;
