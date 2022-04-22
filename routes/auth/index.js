import express from "express";
import google from "./google.js";
const auth = express.Router();

auth.use("/google", google);

export default auth;
