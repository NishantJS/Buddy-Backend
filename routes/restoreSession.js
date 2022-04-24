import { Router } from "express";
import { _getOneById as getUser } from "../controller/users.js";
import { _getOneById as getSeller } from "../controller/sellers.js";
import jwt from "jsonwebtoken";

const session = Router();

session.get("/", async (req, res) => {
  try {
    const { token } = req.signedCookies;
    if (!token) return res.status(200).json({ error: false });

    const jwtData = jwt.verify(token, process.env.JWT_SECRET);
    if (!jwtData) throw new Error();

    if (jwtData?.user) {
      const { error, user, data, status = 200 } = await getUser(jwtData.user);
      if (error) {
        return res
          .status(status)
          .clearCookie("token", {
            signed: true,
            httpOnly: true,
            secure: true,
            sameSite: "strict",
          })
          .json({ error, data });
      }
      return res.status(status).json({ error: false, user });
    }

    if (jwtData?.seller) {
      const {
        error,
        seller,
        data,
        status = 200,
      } = await getSeller(jwtData.seller);
      if (error) {
        return res
          .status(status)
          .clearCookie("token", {
            signed: true,
            secure: true,
            httpOnly: true,
            sameSite: "strict",
          })
          .json({ error, data });
      }
      return res.status(status).json({ error: false, seller });
    }

    return res.status(200).json({ error: false });
  } catch (error) {
    req;
    return res
      .status(500)
      .clearCookie("token", {
        signed: true,
        sameSite: "strict",
        secure: true,
        httpOnly: true,
      })
      .json({ error: true, data: "Session expired! Please log in again!" });
  }
});

session.delete("/", async (req, res) => {
  try {
    return res
      .status(200)
      .clearCookie("token", {
        httpOnly: true,
        signed: true,
        secure: true,
        sameSite: "strict",
      })
      .json({ error: false, data: "You are logged out" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, data: error?.message || "Cookie deletion failed!" });
  }
});

export default session;
