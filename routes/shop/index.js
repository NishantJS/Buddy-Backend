import express from "express";
import dog from "./dog.js";
import cat from "./cat.js";
import Dogs from "../../controller/dogs.js";
import Cats from "../../controller/cats.js";

const shop = express.Router();

shop.use("/dog", dog);
shop.use("/cat", cat);

shop.get("/", async (req, res) => {
  try {
    const dog = await Dogs._findAll();
    const cat = await Cats._findAll();
    return res.status(200).send({ dog, cat });
  } catch (err) {
    return res.status(500).send({ err });
  }
});

shop.get("/:id/", async (req, res) => {
  try {
    let { category } = req.query;
    if (!category) throw "Product does not available anymore or has been moved";

    if (category > 300 || category < 100)
      throw new Error("Invalid category id");
    if (category >= 100 && category < 200) await Dogs._findOne(req, res);
    if (category >= 200 && category < 300) await Cats._findOne(req, res);
  } catch (err) {
    return res.status(500).json({ error: true, data: err.message || err });
  }
});

export default shop;
