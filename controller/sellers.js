import { Seller } from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const _create = async ({ email, pass }) => {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    let hashed = await bcrypt.hash(pass, salt);

    const newSeller = await new Seller({
      email,
      pass: hashed,
    });

    let seller = await newSeller.save();
    if (!seller) throw new Error();
    const payload = { seller: seller._id };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    seller.pass = undefined;
    return {
      error: false,
      token,
      seller,
      data: "Login Successful",
      status: 201,
    };
  } catch (error) {
    return {
      error: true,
      data:
        error?.message || "⚠ Some error occurred while creating an Account.",
    };
  }
};

const _findAll = async (res) => {
  try {
    const sellers = await Seller.find();
    return res.status(302).json(sellers);
  } catch (error) {
    return res.status(500).json({
      error: true,
      data: error?.message || "⚠ Some error occurred while retrieving Users",
    });
  }
};

const _checkOne = async ({ email, pass }) => {
  try {
    const seller = await Seller.findOne({ email });

    if (seller)
      return {
        error: true,
        data: `Account exists with ${email}👯‍♂️`,
        status: 409,
      };
    return await _create({ email, pass });
  } catch (error) {
    return {
      error: true,
      data: error?.message || "⚠ Some error occurred while checking Email",
    };
  }
};

const _findOne = async ({ email, pass }) => {
  try {
    const seller = await Seller.findOne({ email }).lean();

    if (!seller) {
      return {
        error: true,
        data: `Seller account not found with ${email} ❌`,
        status: 404,
      };
    } else if (seller) {
      const match = await bcrypt.compare(pass, seller.pass);

      if (match) {
        seller.pass = undefined;

        const payload = { seller: seller._id };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN,
        });

        return {
          token,
          seller,
          data: "Login Successful",
          error: false,
        };
      } else
        return { data: "Password is incorrect ❌", error: true, status: 401 };
    }
  } catch (error) {
    return {
      error: true,
      data:
        error?.message || `⚠ Error retrieving seller account with id ${email}`,
    };
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
//     .catch((error) => {
//       if (error.kind === "ObjectId") {
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
  } catch (error) {
    return res.status(500).json({
      error: true,
      data:
        error.message ||
        `⚠ Could not delete user with ${email}! Please try again later`,
    });
  }
};

const _getOneById = async (token) => {
  try {
    if (!token) throw new Error();

    const data = jwt.verify(token, process.env.JWT_SECRET);
    if (!data) throw new Error();

    let seller = await Seller.findById(data.seller).lean();
    if (!seller)
      return {
        error: true,
        data: "Account not fount! Login Again",
        status: 401,
      };

    seller.pass = undefined;
    return { error: false, seller };
  } catch (error) {
    return {
      error: true,
      data: "Session expired! Please Login Again",
      status: 401,
    };
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

export { _getOneById };
