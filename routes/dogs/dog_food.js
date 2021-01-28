import express from "express";
import DogFood from "../../controller/dog.food.js";

const dog_food = express.Router();

dog_food.post("/", (req, res) => {
  if (req._body) {
    DogFood._create(req, res);
  } else {
    return res.status(400).send({ message: "Required fields are skipped" });
  }
});

dog_food.get("/", (req, res) => {
  if (req.query.type) {
    DogFood._findAll(req, res);
  } else if (req.query.title) {
    DogFood._findOne(req, res);
  } else {
    DogFood._findAll(req, res);
  }
});

export default dog_food;
