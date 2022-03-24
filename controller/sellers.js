import { Seller } from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const _create = async (req, res) => {
  try {
    let { email, pass } = req.body;

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    let hashed = await bcrypt.hash(pass, salt);

    const newSeller = await new Seller({
      email,
      pass: hashed,
    });

    const seller = await newSeller.save();
    const sellerData = seller;
    const payload = { seller: sellerData._id };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    sellerData.pass = undefined;
    return res
      .status(201)
      .json({
        error: false,
        token,
        seller: sellerData,
        data: "Login Successful",
      });
  } catch (err) {
    return res.status(500).json({
      error: true,
      data: err.message || "⚠ Some error occurred while creating an Account.",
    });
  }
};

const _findAll = async (res) => {
  try {
    const sellers = await Seller.find();
    return res.status(302).json(sellers);
  } catch (err) {
    return res.status(500).json({
      error: true,
      data: err.message || "⚠ Some error occurred while retrieving Users",
    });
  }
};

const _checkOne = async (req, res) => {
  try {
    const email = req.body.email;

    const seller = await Seller.findOne({ email });

    if (seller) {
      return res
        .status(409)
        .json({ error: true, data: `Account exists with ${email} 👯‍♂️` });
    } else await _create(req, res);
  } catch (err) {
    return res.status(500).json({
      error: true,
      data: err.message || "⚠ Some error occurred while checking Email",
    });
  }
};

const _findOne = async (req, res) => {
  try {
    const { email } = req.body;

    const seller = await Seller.findOne({ email });

    if (!seller) {
      return res.status(404).json({
        error: true,
        data: `Seller account not found with ${email} ❌`,
      });
    } else if (seller) {
      const { pass } = req.body;

      const match = await bcrypt.compare(pass, seller.pass);

      if (match) {
        let sellerData = seller;
        sellerData.pass = undefined;

        const payload = { seller: sellerData._id };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN,
        });

        return res.status(202).json({
          token,
          seller: sellerData,
          data: "Login Successful",
          error: false,
        });
      } else
        return res
          .status(401)
          .json({ data: "Password is incorrect ❌", error: true });
    }
  } catch (err) {
    return res.status(500).json({
      error: true,
      data: err.message || `⚠ Error retrieving seller account with id ${email}`,
    });
  }
};

// const _update = async (req, res) => {
//   User.findByIdAndUpdate(
//     req.seller.user,
//     {
//       req: req.body.title || "Untitled Note",
//       content: req.body.content,
//     },
//     { upsert: true }
//   )
//     .then((note) => {
//       if (!note) {
//         return res.status(404).json({
//           msg: "Note not found with id " + req.params.noteId,
//         });
//       }
//       res.json(note);
//     })
//     .catch((err) => {
//       if (err.kind === "ObjectId") {
//         return res.status(404).json({
//           msg: "Note not found with id " + req.params.noteId,
//         });
//       }
//       return res.status(500).json({
//         msg: "Error updating note with id " + req.params.noteId,
//       });
//     });
// };

const _delete = async (req, res) => {
  try {
    const email = req.body.email;
    if (!email) throw new Error("Please pass email address");

    const seller = await Seller.deleteOne({
      email: new RegExp(`^${email}`, "i"),
    });
    if (!seller.deletedCount) {
      return res.status(404).json({ error: true, data: "Seller Not Found ❌" });
    } else
      return res.status(200).json({
        error: false,
        data: `Account deleted ❌. We are sorry to let you go 😢`,
      });
  } catch (err) {
    return res.status(500).json({
      error: true,
      data:
        err.message ||
        `⚠ Could not delete user with ${email}! Please try again later`,
    });
  }
};

const _getOneById = async (req, res) => {
  try {
    let authHeader = req.headers["authorization"];
    let token = authHeader && authHeader.split(" ");

    if (!authHeader) throw "Session Expired";
    let data = jwt.verify(token[1], process.env.JWT_SECRET);

    const sellerData = await Seller.findById(data.user);
    sellerData.pass = undefined;

    if (sellerData)
      return res.status(200).json({ error: false, data: sellerData });
    return res
      .status(401)
      .json({ error: true, data: "Account not fount! Login Again" });
  } catch (err) {
    return res.status(401).json({
      error: true,
      data: "Session expired! Please Login Again",
    });
  }
};

export default {
  _create,
  _delete,
  _findAll,
  _findOne,
  _checkOne,
  _getOneById,
};
