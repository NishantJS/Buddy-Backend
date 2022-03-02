import express from "express";
import dog from "./dog.js";
import cat from "./cat.js";
import bird from "./bird.js";
import { _findAll as findAllDogProduct, _findOne as findDogProduct } from "../../controller/dogs.js";
import { _findAll as findAllCatProduct, _findOne as findCatProduct } from "../../controller/cats.js";
import { _findAll as findAllBirdProduct } from "../../controller/birds.js";

const shop = express.Router();

shop.use("/dog", dog)
shop.use("/cat", cat)
shop.use("/bird", bird)

shop.get("/", async (req, res) => {
  try {
    const dog = await findAllDogProduct();
    const cat = await findAllCatProduct();
    const bird = await findAllBirdProduct();
    return res.status(200).send({ dog, cat, bird });
    } catch (err) {
    return res.status(500).send({ err })
  }
})

shop.get("/:id/", async (req, res) => {
  try {
    let { category } = req.query;
    if (!category) throw "Product does not available anymore or has been moved";

    if (category > 400 || category < 100) throw new Error("Invalid category id");
    
    if (category >= 100 && category < 200) await findDogProduct(req, res);
    
    if (category >= 200 && category < 300) await findCatProduct(req, res);

    if (category >= 300 && category < 400) await findDogProduct(req, res);

  } catch (err) {
    return res.status(500).json({ error: true, data: err.message ||err });
  }
});

export default shop;