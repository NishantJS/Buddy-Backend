import { User } from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const _create = async (req, res) => {
  try {
    let { username, email, pass } = req.body;

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    let hashed = await bcrypt.hash(pass, salt);

    const newUser = await new User({
      username,
      email,
      pass: hashed,
    });

    const user = await newUser.save();
    const userData = user;
    userData.pass = undefined;
    return res.status(201).send(userData);
  } catch (err) {
    return res.status(500).send({
      err,
      msg: err.message || "⚠ Some error occurred while creating an Account.",
    });
  }
};

const _findAll = async (res) => {
  try {
    const users = await User.find();
    return res.status(302).send(users);
  } catch (err) {
    return res.status(500).send({
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
      return res.status(400).send({
        msg: `Account exists with ${email} 👯‍♂️`,
      });
    } else await _create(req, res);
  } catch (err) {
    return res.status(500).send({
      err,
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
      return res.status(404).send({
        msg: `User not found with ${email} ❌`,
      });
    } else if (user) {
      const { pass } = req.body;

      const match = await bcrypt.compare(pass, user.pass);

      if (match) {
        let userData = user;
        userData.pass = undefined;

        const payload = { user: userData._id, role: "buyer" };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN,
        });

        return res.status(202).send({
          token,
          user: userData,
          msg: `Welcome ${userData.username.fname} 👋`,
        });
      } else return res.status(401).send({ err: "Password is incorrect ❌" });
    }
  } catch (err) {
    return res.status(500).send({
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
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId,
        });
      }
      res.send(note);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId,
        });
      }
      return res.status(500).send({
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
      return res.status(404).send({ msg: "User Not Found ❌" });
    } else
      return res.status(200).send({
        msg: `Account deleted ❌. We are sorry to let you go ${fname} 😢`,
      });
  } catch (err) {
    return res.status(500).send({
      err,
      message: err.message || `⚠ Could not delete user with ${email}`,
    });
  }
};

export default { _create, _delete, _findAll, _findOne, _update, _checkOne };
