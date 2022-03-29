import { User } from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const _create = async ({ email, pass }) => {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    let hashed = await bcrypt.hash(pass, salt);

    const newUser = await new User({
      email,
      pass: hashed,
    });

    const userData = await newUser.save();
    if (!userData) throw new Error();
    let user = userData;
    const payload = { user: user._id };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    user.pass = undefined;
    return {
      error: false,
      token,
      user,
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
    const users = await User.find();
    return res.status(302).json(users);
  } catch (error) {
    return res.status(500).json({
      error,
      data: error?.message || "⚠ Some error occurred while retrieving Users",
    });
  }
};

const _checkOne = async ({ email, pass }) => {
  try {
    const user = await User.findOne({ email }).lean();

    if (user)
      return {
        error: true,
        data: `Account exists with ${email}👯‍♀️`,
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
    const user = await User.findOne({ email }).select("-__v").lean();

    if (!user) {
      return {
        error: true,
        data: `User not found with ${email} ❌`,
        status: 404,
      };
    } else if (user) {
      const match = await bcrypt.compare(pass, user.pass);

      if (match) {
        user.pass = undefined;

        const payload = { user: user._id };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN,
        });

        return {
          token,
          user,
          data: "Login Successful",
          error: false,
        };
      } else
        return { data: "Password is incorrect ❌", error: true, status: 401 };
    }
  } catch (error) {
    return {
      error: true,
      data: error?.message || `⚠ Error retrieving user with id ${email}`,
    };
  }
};

const _update = async (req, res) => {
  User.findByIdAndUpdate(
    req.user.user,
    {
      req: req.body.title || "Untitled Note",
      content: req.body.content,
    },
    { upsert: true }
  )
    .then((note) => {
      if (!note) {
        return res.status(404).json({
          data: "Note not found with id " + req.params.noteId,
        });
      }
      res.json(note);
    })
    .catch((error) => {
      if (error.kind === "ObjectId") {
        return res.status(404).json({
          data: "Note not found with id " + req.params.noteId,
        });
      }
      return res.status(500).json({
        data: "Error updating note with id " + req.params.noteId,
      });
    });
};

const _delete = async (req, res) => {
  try {
    const { email, fname } = req.body;
    const user = await User.deleteOne({ email });
    if (!user.deletedCount) {
      return res.status(404).json({ error: true, data: "User Not Found ❌" });
    } else
      return res.status(200).json({
        error: false,
        data: `Account deleted ❌. We are sorry to let you go ${fname} 😢`,
      });
  } catch (error) {
    return res.status(500).json({
      error: true,
      data: error?.message || `⚠ Could not delete user with ${email}`,
    });
  }
};

const _getOneById = async (id) => {
  try {
    if (!id) throw new Error();

    let user = await User.findById(id).lean();
    if (!user)
      return {
        error: true,
        data: "Account not fount! Login Again",
        status: 401,
      };

    user.pass = undefined;
    return { error: false, user };
  } catch (error) {
    return {
      data: "Session expired! Please Login Again💥",
      error: true,
      status: 401,
    };
  }
};

const _checkId = async (token) => {
  try {
    const { user } = jwt.verify(token, process.env.JWT_SECRET);
    if (!user) throw new Error("Token Invalid! Please login again💥");

    const isValid = await User.findById(user).lean();
    if (!isValid) throw new Error("Account does not exists");
    return { isValid: user };
  } catch (error) {
    return { isValid: false, data: error?.message };
  }
};

export default {
  _create,
  _delete,
  _findAll,
  _findOne,
  _update,
  _checkOne,
  _getOneById,
  _checkId,
};

export { _getOneById, _checkId, _checkOne, _findOne };
