import express from "express";
import dog_food from "./dogs/dog_food.js";

const dogs = express();

dogs.use("/food", dog_food);
dogs.use("/treats", dog_food);
dogs.use("/toys", dog_food);
dogs.use("/health", dog_food);
dogs.use("/grooming", dog_food);
dogs.use("/accessories", dog_food);

export default dogs;
