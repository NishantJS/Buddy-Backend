import express from "express";
import { readFile } from "fs/promises";
const quotes = JSON.parse(
  await readFile(new URL("./quotes.json", import.meta.url))
);

const quote = express.Router();

quote.get("/random", async (_req, res) => {
  try {
    let random = Math.floor(Math.random() * quotes.length);

    if (random >= 0 && random <= quotes.length - 1) {
      return res.status(200).json({ error: false, data: quotes[random] });
    } else {
      return res.status(200).json({ error: false, data: quotes[0] });
    }
  } catch (error) {
    return res.status(500).json({ error: true, data: error?.message });
  }
});

quote.get("/", async (req, res) => {
  try {
    return res.status(200).json({ error: false, data: quotes });
  } catch (error) {
    return res.status(200).send({ error: true, data: error?.message });
  }
});

quote.get("/:id", async (req, res) => {
  try {
    if (req.params.id >= 0 && req.params.id <= quotes.length - 1) {
      return res
        .status(200)
        .json({ error: false, data: quotes[req.params.id] });
    } else throw new RangeError("Out of Range");
  } catch (error) {
    return res.status(500).json({ error: true, data: error?.message });
  }
});

export default quote;
