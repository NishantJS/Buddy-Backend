import { Router } from "express";
import dog from "./dog.js";
import cat from "./cat.js";
import Dogs from "../../controller/dogs.js";
import Cats from "../../controller/cats.js";

const shop = Router();

shop.use("/dog", dog);
shop.use("/cat", cat);

shop.get("/", async (_req, res) => {
  try {
    const dog = await Dogs._findAll();
    const cat = await Cats._findAll();
    return res.status(200).send({ dog, cat });
  } catch (err) {
    return res.status(500).send({ err });
  }
});

shop.get("/uci/:uci/", async (req, res) => {
  try {
    const { excluded } = req.query;
    const { uci } = req.params;
    if (!uci || !excluded)
      throw new Error("Product does not available anymore or has been moved");

    if (uci > 300 || uci < 100) throw new Error("Invalid category id");
    if (uci >= 100 && uci < 200) {
      const { error, data } = await Dogs._findAllWhere(uci, excluded);
      return res.status(error ? 400 : 200).json({ error, data });
    }
    if (uci >= 200 && uci < 300) {
      const { error, data } = await Cats._findAllWhere(uci, excluded);
      return res.status(error ? 400 : 200).json({ error, data });
    }
    return res.status(400).json({ error: true, message: "Invalide uci" });
  } catch (err) {
    return res.status(500).json({ error: true, data: err?.message });
  }
});

shop.get("/:id/", async (req, res) => {
  try {
    let { category } = req.query;
    if (!category)
      throw new Error("Product does not available anymore or has been moved");

    if (category > 300 || category < 100)
      throw new Error("Invalid category id");
    if (category >= 100 && category < 200) await Dogs._findOne(req, res);
    if (category >= 200 && category < 300) await Cats._findOne(req, res);
  } catch (err) {
    return res.status(500).json({ error: true, data: err.message || err });
  }
});

export default shop;
