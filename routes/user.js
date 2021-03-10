import express from "express";
import User from "../controller/users.js";
import loginValidator from "../validator/login.js";
import jwt from "jsonwebtoken";
import registerValidator from "../validator/register.js";

const user = express.Router();
user.post("/login", async (req, res) => {
  const { errors, isValid } = loginValidator(req.body);

  if (!isValid) return res.status(400).json(errors);
  else await User._findOne(req, res);
});

user.post("/register/", async (req, res) => {
  const { errors, isValid } = registerValidator(req.body);

  if (!isValid) return res.status(400).json(errors);
  else await User._checkOne(req, res);
});

user.get("/", async (_req, res) => {
  await User._findAll(res);
});

user.delete("/", async (req, res) => {
  await User._delete(req, res);
});

export default user;
