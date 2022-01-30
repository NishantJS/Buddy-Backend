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
      msg: err || "⚠ Some error occurred while creating an Account.",
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
      msg: err.msg || "⚠ Some error occurred while retrieving Users",
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
      msg: err.msg || "⚠ Some error occurred while checking Email",
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
      } else return res.status(401).json({ msg: "Password is incorrect ❌" ,error: true});
    }
  } catch (err) {
    return res.status(500).json({
      err,
      msg: err.msg || `⚠ Error retrieving user with id ${email}`,
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
          msg: "Note not found with id " + req.params.noteId,
        });
      }
      res.json(note);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).json({
          msg: "Note not found with id " + req.params.noteId,
        });
      }
      return res.status(500).json({
        msg: "Error updating note with id " + req.params.noteId,
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
      msg: err.message || `⚠ Could not delete user with ${email}`,
    });
  }
};

const _getOneById = async (req, res) => {
  try {
    let authHeader = req.headers["authorization"];
    let token = authHeader && authHeader.split(" ");

    if (!authHeader) throw "Session Expired";
    let data = jwt.verify(token[1], process.env.JWT_SECRET);

    const userData = await User.findById(data.user);
    userData.pass = undefined;

    if (userData) return res.status(200).json({ error: false, msg: userData });
    
    return res.status(401).json({ error: true, msg: "Account not fount! Login Again" });
    
  } catch (err) {
    return res.status(401).json({ msg: err.message || "Session expired! Please Login Again", error: true });
  }
}
export default { _create, _delete, _findAll, _findOne, _update, _checkOne ,_getOneById};
