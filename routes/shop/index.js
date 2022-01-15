import express from "express";
import dog from "./dog.js";
import cat from "./cat.js";
import bird from "./bird.js";
import { _findAll as findDog } from "../../controller/dogs.js";
import { _findAll as findCat } from "../../controller/cats.js";
import { _findAll as findBird } from "../../controller/birds.js";

const shop = express.Router();

shop.use("/dog", dog)
shop.use("/cat", cat)
shop.use("/bird", bird)



shop.get("/", async (req, res) => {
  try {
  const dog = await findDog();
  const cat = await findCat();
  const bird = await findBird();
    res.send({ dog, cat, bird });
    } catch (err) {
    res.send({ err })
  }
})

export default shop;