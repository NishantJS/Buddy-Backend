import express from "express";
import passport from "passport";
import { setupStrategy } from "../../auth/google.js";

const google = express.Router();

const commonResponse = async (req, res) => {
  try {
    if (req?.isAuthenticated() && req?.user) {
      const token = req?.user;
      return res
        .status(200)
        .cookie("token", token, {
          signed: true,
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: Number.parseInt(process.env.JWT_EXPIRES_IN),
        })
        .json({ error: false, data: "Google Auth Successful!" });
    } else
      return res.status(401).json({
        error: true,
        data: "Authentication Failed! Please try again",
      });
  } catch (error) {
    return res
      .status(500)
      .clearCookie("token", {
        signed: true,
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: Number.parseInt(process.env.JWT_EXPIRES_IN),
      })
      .json({ error: false, data: error?.message });
  }
};

google.get(
  "/seller",
  setupStrategy("seller"),
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),
  async (req, res) => await commonResponse(req, res)
);

google.get(
  "/user",
  setupStrategy("user"),
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),
  async (req, res) => await commonResponse(req, res)
);
export default google;
