import { User } from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const _create = async (req, res) => {
  try {
    let { email, pass } = req.body;

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    let hashed = await bcrypt.hash(pass, salt);

    const newUser = await new User({
      email,
      pass: hashed,
    });

    const user = await newUser.save();
    const userData = user;
    const payload = { user: userData._id };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    userData.pass = undefined;
    return res
      .status(201)
      .json({error:false, token, user: userData, msg: "Login Successful" });
  } catch (err) {
    return res.status(500).json({
      error:true,
      message: err.message || "⚠ Some error occurred while creating an Account.",
    });
  }
};

const _findAll = async (res) => {
  try {
    const users = await User.find();
    return res.status(302).json(users);
  } catch (err) {
    return res.status(500).json({
      err,
      message: err.message || "⚠ Some error occurred while retrieving Users",
    });
  }
};

const _checkOne = async (req, res) => {
  try {
    const email = req.body.email;

    const user = await User.findOne({
      email: new RegExp(`^${email}`, "i"),
    });

    if (user) {
      return res.status(200).json({error:true,
        msg: `Account exists with ${email} 👯‍♂️`,
      });
    } else await _create(req, res);
  } catch (err) {
    return res.status(500).json({
      err,
      error:true,
      msg: err.message || "⚠ Some error occurred while checking Email",
    });
  }
};

const _findOne = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({
      email: new RegExp(`^${email}`, "i"),
    });

    if (!user) {
      return res.status(404).json({
        error: true,
        msg: `User not found with ${email} ❌`,
      });
    } else if (user) {
      const { pass } = req.body;

      const match = await bcrypt.compare(pass, user.pass);

      if (match) {
        let userData = user;
        userData.pass = undefined;

        const payload = { user: userData._id };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN,
        });

        return res.status(202).json({
          token,
          user: userData,
          msg: "Login Successful",
        });
      } else return res.status(401).json({ err: "Password is incorrect ❌" ,error: true});
    }
  } catch (err) {
    return res.status(500).json({
      err,
      message: err.message || `⚠ Error retrieving user with id ${email}`,
    });
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
          message: "Note not found with id " + req.params.noteId,
        });
      }
      res.json(note);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).json({
          message: "Note not found with id " + req.params.noteId,
        });
      }
      return res.status(500).json({
        message: "Error updating note with id " + req.params.noteId,
      });
    });
};

const _delete = async (req, res) => {
  try {
    const email = req.body.email;
    const fname = req.body.fname;
    const user = await User.deleteOne({
      email: new RegExp(`^${email}`, "i"),
    });
    if (!user.deletedCount) {
      return res.status(404).json({ msg: "User Not Found ❌" });
    } else
      return res
        .status(200)
        .json({
          error: false,
          msg: `Account deleted ❌. We are sorry to let you go ${fname} 😢`,
        });
  } catch (err) {
    return res.status(500).json({
      err,
      error: true,
      message: err.message || `⚠ Could not delete user with ${email}`,
    });
  }
};

export default { _create, _delete, _findAll, _findOne, _update, _checkOne };
