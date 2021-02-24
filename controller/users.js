import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

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
    return res.status(201).send(user);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const _findAll = async (res) => {
  try {
    const users = await User.find();
    return res.status(302).send(users);
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Some error occurred while retrieving Users.",
    });
  }
};

const _checkOne = async (req, res) => {
  const email = req.body.email;

  const user = await User.findOne({
    email: new RegExp(`^${email}`, "i"),
  });

  if (user) {
    return res.status(400).send({
      message: `Account exists with ${req.body.email}`,
    });
  } else {
    _create(req, res);
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
        message: `User not found with id ${req.query.email}`,
      });
    } else if (user) {
      const { pass } = req.body;

      const match = await bcrypt.compare(pass, user.pass);

      if (match)
        return res.status(302).send({ msg: `Welcome ${user.username.fname}` });
      else return res.status(401).send({ err: "Password is incorrect" });
    }
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).send({
        message: `user not found with id ${req.query.email}`,
      });
    }
    return res.status(500).send({
      message: `Error retrieving user with id ${err}`,
    });
  }
};

const _update = async (req, res) => {
  // if (!req.body.content) {
  //   return res.status(400).send({
  //     message: "Note content can not be empty",
  //   });
  // }
  // Note.findByIdAndUpdate(
  //   req.params.noteId,
  //   {
  //     title: req.body.title || "Untitled Note",
  //     content: req.body.content,
  //   },
  //   { new: true }
  // )
  //   .then((note) => {
  //     if (!note) {
  //       return res.status(404).send({
  //         message: "Note not found with id " + req.params.noteId,
  //       });
  //     }
  //     res.send(note);
  //   })
  //   .catch((err) => {
  //     if (err.kind === "ObjectId") {
  //       return res.status(404).send({
  //         message: "Note not found with id " + req.params.noteId,
  //       });
  //     }
  //     return res.status(500).send({
  //       message: "Error updating note with id " + req.params.noteId,
  //     });
  //   });
};

const _delete = async (req, res) => {
  try {
    const email = req.query.email;
    const user = await User.deleteOne({
      email: new RegExp(`^${email}`, "i"),
    });
    if (!user) {
      return res.status(404).send("user Not Found");
    }
    return res.status(200).send("user deleted we are sorry to let you go");
  } catch (err) {
    if (err.kind === "ObjectId" || err.name === "NotFound") {
      return res.status(404).send({
        message: `User not found with id ${req.params.username}`,
      });
    }
    return res.status(500).send({
      message: `Could not delete user with id ${req.params.userid}`,
    });
  }
};

export default { _create, _delete, _findAll, _findOne, _update, _checkOne };
