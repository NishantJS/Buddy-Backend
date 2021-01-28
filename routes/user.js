import express from "express";
import User from "../controller/users.js";

const user = express.Router();
user.post("/", User._create);
user.delete("/", User._delete);

user.get("/", (req, res) => {
  if (req.query.email) {
    User._findOne(req, res);
  } else {
    User._findAll(res);
  }
});

export default user;
