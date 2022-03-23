import express from 'express'
import Dogs from "../../controller/dogs.js";
const dog = express.Router();

dog.get("/", async (_req, res) => {
  try {
    const { error, data } = await Dogs._findAll();
    if (error) return res.status(500).json({ error: true, data });
    else return res.status(200).json({ error: false, data});
  } catch (err) {
    return res.status(500).json({ error: true, data : err.message || err});
  }
})

export default dog;