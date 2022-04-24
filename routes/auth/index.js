import { Router } from "express";
import { setupFBStrategy } from "../../auth/facebook.js";
import { setupGoogleStrategy } from "../../auth/google.js";
import passport from "passport";

const auth = Router();

auth.use(passport.initialize());

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
        .json({ error: false, data: "Authentication Successful!" });
    } else
      return res
        .status(401)
        .clearCookie("token", {
          signed: true,
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: Number.parseInt(process.env.JWT_EXPIRES_IN),
        })
        .json({
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

auth.get(
  "/facebook/seller",
  setupFBStrategy("seller"),
  passport.authenticate("facebook", {
    scope: ["email"],
    session: false,
  }),
  async (req, res) => await commonResponse(req, res)
);

auth.get(
  "/facebook/user",
  setupFBStrategy("user"),
  passport.authenticate("facebook", {
    scope: ["email"],
    session: false,
  }),
  async (req, res) => await commonResponse(req, res)
);

auth.get(
  "/google/seller",
  setupGoogleStrategy("seller"),
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),
  async (req, res) => await commonResponse(req, res)
);

auth.get(
  "/google/user",
  setupGoogleStrategy("user"),
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),
  async (req, res) => await commonResponse(req, res)
);

export default auth;
