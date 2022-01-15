import express from "express";
import {createRequire} from "module"
const require = createRequire(import.meta.url);
const quotes = require("./quotes.json")

const quote = express.Router();


quote.get("/random", async (req, res) => {
  try {
    let random = Math.floor(Math.random() * quotes.length);

    if (random >= 0 && random <= quotes.length - 1) {
      res.status(200).json(quotes[random]);
    } else {
      res.status(200).json(quotes[0]);
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

quote.get("/", async (req, res) => {
  try {
    res.json(quotes)
  } catch (error) {
    res.send(error);
  }
});

quote.get("/:id", async (req, res) => {
  try {
    if (req.params.id >= 0 && req.params.id <= quotes.length - 1) {
      res.status(200).json(quotes[req.params.id]);
    }
    else throw "Out of Range";
  } catch (error) {
    res.status(500).json({error })
  }
});

export default quote;