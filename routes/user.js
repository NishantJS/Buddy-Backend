import express from "express";
import User from "../controller/users.js";
import loginValidator from "../validator/login.js";
import jwt from "jsonwebtoken";
import registerValidator from "../validator/register.js";

const user = express.Router();
user.post("/", User._create);
user.delete("/", User._delete);

user.get("/", async (req, res) => {
  User._findAll(res);
});

user.get("/login", async (req, res) => {
  const { errors, isValid } = loginValidator(req.body);

  if (!isValid) return res.status(400).json(errors);
  else User._findOne(req, res);
});

user.post("/register/", async (req, res) => {
  const { errors, isValid } = registerValidator(req.body);

  if (!isValid) return res.status(400).json(errors);

  User._checkOne(req, res);
});

export default user;
